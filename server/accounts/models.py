from mongoengine import Document, StringField, EmailField, BooleanField
from django.contrib.auth.hashers import make_password, check_password



class User(Document):
    meta = {"collection": "employees"}  # Force collection name
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    phone_number = StringField(required=True, unique=True)
    password = StringField(required=True)
    is_superuser = BooleanField(default=False)
    role = StringField(
        required=True, choices=["superuser", "sales", "staff"], default="staff"
    )

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
