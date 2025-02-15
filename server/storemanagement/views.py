from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .manager import StoreManager
from accounts.JSONAuthentication import CookieJWTAuthentication


class StoreApiView(APIView):
    authentication_classes = (CookieJWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    manager = StoreManager()

    def get(self, request, format=None):
        user = request.user
        print("user", user)
        try:
            page = request.query_params.get("page", 1)
            response = self.manager.get_stores(page=page)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
            name = data.get("name")
            ownerName = data.get("ownerName")
            password = data.get("password")
            hasUserPaid = data.get("hasUserPaid")
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
                ownerName,
                password,
                hasUserPaid,
            )

            if store:
                return Response(
                    {"message": "Store registered successfully", "store": store},
                    status=status.HTTP_200_OK,
                )
            return Response({"error": "Store not registered"})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StoreDetailsApiView(APIView):
    authentication_classes = (CookieJWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    manager = StoreManager()

    def get(self, request, storeId, format=None):
        try:
            if not storeId:
                return Response(
                    {"error": "storeId is required"}, status=status.HTTP_400_BAD_REQUEST
                )
            store = self.manager.get_store(storeId)
            return Response(store, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, storeId, format=None):
        try:
            data = request.data
            print("data", data)
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
            ownerName = data.get("ownerName")
            remmaingScans = data.get("remmaingScans")
            store = self.manager.update_store(
                storeId,
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
                ownerName,
                remmaingScans,
            )
            return Response(store, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
