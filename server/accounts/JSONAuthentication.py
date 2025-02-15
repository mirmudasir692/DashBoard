from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from bson import ObjectId


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")
        if not access_token:
            return None

        try:
            validated_token = AccessToken(access_token)
        except Exception as e:
            raise AuthenticationFailed("Invalid token")

        return self.get_user(validated_token), validated_token

    def get_user(self, validated_token):
        from accounts.models import User

        user_id = validated_token.get("user_id")

        try:
            user = User.objects.get(id=user_id)

        except Exception as e:
            raise AuthenticationFailed("User not found")
        user.is_authenticated = True
        return user
