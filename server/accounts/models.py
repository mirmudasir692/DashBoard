from mongoengine import (
    Document,
    StringField,
    EmailField,
    BooleanField,
    IntField,
    DateTimeField,
)
from datetime import datetime, timezone
from django.contrib.auth.hashers import make_password, check_password
import uuid


class User(Document):
    meta = {"collection": "employees"}  # Force collection name
    id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    phone_number = StringField(required=True, unique=True)
    password = StringField(required=True)
    is_superuser = BooleanField(default=False)
    role = StringField(
        required=True, choices=["superuser", "sales", "staff"], default="staff"
    )
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=datetime.now(timezone.utc))
    __v = IntField(default=0, db_field="__v")

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
