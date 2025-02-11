from rest_framework.views import APIView
from accounts.models import UserManager
from rest_framework.response import Response
from rest_framework import status


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
        username = request.data.get("username")
        password = request.data.get("password")
        try:
            user = self.manager.authenticate(username, password)
            tokenData = self.manager.generate_tokens(user)
            return Response(tokenData, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserApiView(APIView):
    manager = UserManager()

    def get(self, request):
        page = request.params.get("page", 1)
        response = self.manager.get_users(page=page)
        return Response(response, status=status.HTTP_200_OK)
