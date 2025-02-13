from django.core.paginator import Paginator
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .models import User

class UserManager:
    def get_users(self, page=1):
        paginator = Paginator(User.objects(), 10)
        users = paginator.get_page(page)
        response = {
            "users": users,
            "has_next": users.has_next(),
            "has_previous": users.has_previous(),
            "next_page": users.next_page_number(),
            "previous_page": users.previous_page_number(),
            "total_pages": paginator.num_pages,
        }
        return response

    def create_user(self, username, email, phone_number, password, role="staff"):
        if User.objects(username=username).first():
            raise ValueError("Username already taken")

        if User.objects(email=email).first():
            raise ValueError("Email already in use")

        if User.objects(phone_number=phone_number).first():
            raise ValueError("Phone number already in use")
        user = User(
            username=username, email=email, phone_number=phone_number, role=role
        )
        user.set_password(password)
        user.save()
        return user

    def generate_tokens(self, user):
        print("user in model", user)

        refreshtoken = RefreshToken.for_user(user)
        return {
            "access_token": str(refreshtoken.access_token),
            "refresh_token": str(refreshtoken),
        }

    def check_user_auth(self, access_token):
        try:
            AccessToken(access_token)
            return True
        except Exception as e:
            return False

    def get_user(self, token):
        return RefreshToken(token).user

    def authenticate(self, email, password):
        user = User.objects(email=email).first()
        if user and user.check_password(password):
            return user
        else:
            return None
