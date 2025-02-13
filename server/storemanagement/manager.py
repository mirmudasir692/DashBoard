import secrets
from storeUser.manager import UserManager
from .models import Store, Address


class StoreManager:
    user_manager = UserManager()

    def register_store(
        self,
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
    ):
        if not all(
            [
                name,
                licenseNumber,
                addressLine1,
                locality,
                pincode,
                state,
                phone,
                email,
                adminName,
                password,
            ]
        ):
            raise ValueError(
                "Please provide all required fields (name, license number, address line 1, locality, pincode, state, phone, email, admin name, admin email, admin password)"
            )
        if email:
            existingStore = Store.objects(email=email.lower()).first()
            if existingStore:
                raise ValueError("Store with this email already exists")
        if phone:
            existingStore = Store.objects(phone=phone.lower()).first()
            if existingStore:
                raise ValueError("Store with this phone number already exists")
        address = Address(
            addressLine1=addressLine1,
            addressLine2=addressLine2,
            locality=locality,
            pincode=pincode,
            state=state,
        )
        api_key = secrets.token_hex(16)
        newStore = Store(
            apiKey=api_key,
            name=name,
            gstin=gstin,
            licenseNumber=licenseNumber,
            contactName=contactName,
            address=address,
            phone=phone,
            email=email,
            scansRemaining=20,
        )
        newStore.save()
        adminUser = self.user_manager.create_user(
            email, password, name, role="admin", store_id=newStore.id
        )
        if not adminUser:
            Store.objects(id=newStore.id).delete()
        return Store
