from mongoengine import (
    Document,
    StringField,
    BooleanField,
    DateTimeField,
    ListField,
    DictField,
    ReferenceField,
)
from bcrypt import hashpw, gensalt, checkpw
from datetime import datetime, timezone





Permission = {"read": True, "write": True, "delete": True}


class User(Document):
    store_id = ReferenceField("Store", required=True, dbref=False)
    name = StringField(required=True)
    phone = StringField()
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    salt = StringField(required=True)
    has_access_to = DictField(
        default={
            "sale": Permission,
            "purchase": Permission,
            "supplier": Permission,
            "customer": Permission,
            "customerLedger": Permission,
            "supplierLedger": Permission,
            "reports": {"read": True},
            "drugManagement": Permission,
        }
    )
    role = StringField(
        choices=["admin", "staff", "sales_person", "accountant"], default="staff"
    )
    deactivated = BooleanField(default=False)
    refresh_tokens = ListField(DictField(), default=[])
    created_at = DateTimeField(default=datetime.now(timezone.utc))
    updated_at = DateTimeField(default=datetime.now(timezone.utc))

    def valid_password(self, password):
        try:
            return checkpw(password.encode(), self.password.encode())
        except Exception as e:
            raise ValueError("Error validating password: " + str(e))

    meta = {
        "collection":"users",
        "indexes": [
            {"fields": ["store_id", "email"], "unique": True},
            {
                "fields": ["store_id", "phone"],
                "unique": True,
                "partialFilterExpression": {"phone": {"$exists": True}},
            },
        ]
    }
