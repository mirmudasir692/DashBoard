from mongoengine import (
    Document,
    StringField,
    BooleanField,
    DateTimeField,
    ListField,
    DictField,
    ReferenceField,
    IntField,
)
from bcrypt import hashpw, gensalt, checkpw
from datetime import datetime, timezone


Permission = {"read": True, "write": True, "delete": True}


class User(Document):
    storeId = ReferenceField("Store", required=True, dbref=False)
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
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=datetime.now(timezone.utc))
    __v = IntField(default=0, db_field="__v")

    def valid_password(self, password):
        try:
            return checkpw(password.encode(), self.password.encode())
        except Exception as e:
            raise ValueError("Error validating password: " + str(e))

    meta = {
        "collection": "users",
        "indexes": [
            {"fields": ["storeId", "email"], "unique": True},
            {
                "fields": ["storeId", "phone"],
                "unique": True,
                "partialFilterExpression": {"phone": {"$exists": True}},
            },
        ],
    }

    def set_password(self, raw_password):
        salt = gensalt().decode()
        hashed_password = hashpw(raw_password.encode(), salt.encode()).decode()
        self.password = hashed_password
        self.salt = salt

    def check_password(self, raw_password):
        return checkpw(raw_password.encode(), self.password.encode())

    def change_password(self, new_password):
        if not new_password:
            raise ValueError("New password is required")
        self.set_password(new_password)

    def __str__(self):
        return self.email
