from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .manager import StoreManager


class StoreApiView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    manager = StoreManager()

    def post(self, request, format=None):
        try:
            data = request.data
            name = data.get("name")
            gstin = data.get("gstin")
            licenseNumber = data.get("licenseNumber")
            addressLine1 = data.get("addressLine1")
            addressLine2 = data.get("addressLine2")
            locality = data.get("locality")
            pincode = data.get("pincode")
            state = data.get("state")
            phone = data.get("phone")
            email = data.get("email")
            adminName = data.get("adminName")
            contactName = data.get("contactName")
            password = data.get("password")
            store = self.manager.register_store(
                name,
                gstin,
                licenseNumber,
                addressLine1,
                addressLine2,
                locality,
                pincode,
                state,
                phone,
                email,
                adminName,
                contactName,
                password,
            )
            if store:
                return Response(
                    {"success": "Store registered successfully"},
                    status=status.HTTP_201_CREATED,
                )
            return Response({"error": "Store not registered"})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
