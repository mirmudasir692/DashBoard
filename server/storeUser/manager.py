from bcrypt import hashpw, gensalt
from .models import User


class UserManager:
    def create_user(
        self, email, password, name, phone=None, role="staff", store_id=None
    ):
        print("store id", store_id)
        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("Password is required")

        if role not in ["admin", "staff", "sales_person", "accountant"]:
            raise ValueError(
                'Role must be one of "admin", "staff", "sales_person", "accountant"'
            )

        salt = gensalt().decode()
        hashed_password = hashpw(password.encode(), salt.encode()).decode()

        user = User(
            email=email,
            name=name,
            phone=phone,
            role=role,
            storeId=store_id,
            password=hashed_password,
            salt=salt,
        )
        user.save()
        return user
