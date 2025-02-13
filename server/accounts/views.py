from rest_framework.views import APIView
from .manager import UserManager
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.conf import settings


class CreateUserApiView(APIView):
    manager = UserManager()

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        phone_number = request.data.get("phone_number")
        password = request.data.get("password")
        role = request.data.get("role")
        try:
            user = self.manager.create_user(
                username=username,
                email=email,
                phone_number=phone_number,
                password=password,
                role=role,
            )
            tokenData = self.manager.generate_tokens(user)
            return Response(tokenData, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    manager = UserManager()

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = self.manager.authenticate(email, password)
            if user:
                tokenData = self.manager.generate_tokens(user)
                response = Response(tokenData, status=status.HTTP_200_OK)
                response.set_cookie(
                    "access_token",
                    tokenData["access_token"],
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite="Lax",
                    path="/",
                )
                response.set_cookie(
                    "refresh_token",
                    tokenData["refresh_token"],
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite="Lax",
                    path="/",
                )
                return response

            else:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserApiView(APIView):
    manager = UserManager()

    def get(self, request):
        page = request.params.get("page", 1)
        response = self.manager.get_users(page=page)
        return Response(response, status=status.HTTP_200_OK)


class AuthApiView(APIView):
    manager = UserManager()
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        try:
            access_token = request.COOKIES.get("access_token")
            if not access_token:
                return Response({"isAuthenticated": False}, status=status.HTTP_401_OK)
            valid = self.manager.check_user_auth(access_token)
            return Response({"isAuthenticated": valid}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LogoutUser(APIView):
    authentication_classes = (JWTAuthentication,)

    def post(self, request):
        try:
            response = Response(status=status.HTTP_200_OK)
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            return response
        except KeyError:
            return Response(
                {"error": "Tokens are not present"}, status=status.HTTP_400_BAD_REQUEST
            )


class RefreshTokenApiView(TokenRefreshView):
    manager = UserManager()
    authentication_classes = (JWTAuthentication,)

    def post(self, request, *args, **kwargs):
        # Extract refresh token from HTTP-only cookies
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response(
                {"error": "Refresh token missing"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Use the refresh token to generate new tokens
            refreshtoken = RefreshToken(refresh_token)
            token_data = {
                "access_token": str(refreshtoken.access_token),
                "refresh_token": str(refreshtoken),
            }
            response = Response(status=status.HTTP_200_OK)
            print("token_data", token_data)

            # Set both tokens as HTTP-only cookies (reuse LoginUser's cookie settings)
            response.set_cookie(
                key="accesss_token",
                value=token_data["access_token"],
                httponly=True,
                secure=True,
                samesite="Lax",
            )
            response.set_cookie(
                key="refresh_token",
                value=token_data["refresh_token"],
                httponly=True,
                secure=True,
                samesite="Lax",
            )

            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
