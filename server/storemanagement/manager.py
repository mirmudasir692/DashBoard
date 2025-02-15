import secrets
from storeUser.manager import UserManager
from .models import Store, Address
from django.core.paginator import Paginator
from mongoengine import get_db
from .serializers import PaginationSerializer, StoreSerializer


class StoreManager:
    user_manager = UserManager()

    def get_store(self, storeId):
        store = Store.objects(id=storeId).first()
        if not store:
            raise ValueError("Store not registered")
        serializer = StoreSerializer(store)
        return serializer.data

    def get_stores(self, page=1):
        paginator = Paginator(Store.objects(), 12)
        stores = paginator.get_page(page)
        response = {
            "stores": stores,
            "has_next": stores.has_next(),
            "has_previous": stores.has_previous(),
        }
        serializer = PaginationSerializer(response)
        return serializer.data

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
        ownerName,
        password,
        hasUserPaid=False,
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
                ownerName,
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

        address = Address(
            addressLine1=addressLine1,
            addressLine2=addressLine2,
            locality=locality,
            pincode=pincode,
            state=state,
        )

        api_key = secrets.token_hex(16)
        if hasUserPaid:
            isSubscriptionActive = True
            isOnTrial = False
        else:
            isSubscriptionActive = True
            isOnTrial = True

        newStore = Store(
            apiKey=api_key,
            name=name,
            gstin=gstin,
            licenseNumber=licenseNumber,
            contactName=ownerName,
            address=address,
            phone=phone,
            email=email,
            scansRemaining=20,
            isSubscriptionActive=isSubscriptionActive,
            isOnTrial=isOnTrial,
        )

        db = get_db()

        with db.client.start_session() as session:
            with session.start_transaction():
                try:
                    newStore.save(session=session)

                    adminUser = self.user_manager.create_user(
                        email, password, ownerName, role="admin", store_id=newStore.id
                    )

                    if not adminUser:
                        raise ValueError("Failed to create admin user")

                    serializer = StoreSerializer(newStore)
                    return serializer.data

                except Exception as e:
                    session.abort_transaction()
                    raise ValueError(f"Transaction failed: {str(e)}")

    def update_store(
        self,
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
    ):
        store = Store.objects(id=storeId).first()
        if not store:
            raise ValueError("Store not registered")

        unique_fields = {
            "email": email,
            "gstin": gstin,
            "licenseNumber": licenseNumber,
            "phone": phone,
        }

        for field, value in unique_fields.items():
            if value and value != getattr(store, field):
                existing_store = Store.objects(**{field: value}).first()
                if existing_store:
                    raise ValueError(f"Another store with this {field} already exists")

        # Ensure address object exists
        if addressLine1 and not addressLine1 == store.address.addressLine1:
            store.address.addressLine1 = addressLine1
        if addressLine2 and not addressLine2 == store.address.addressLine2:
            store.address.addressLine2 = addressLine2
        if locality and not locality == store.address.locality:
            store.address.locality = locality
        if pincode and not pincode == store.address.pincode:
            store.address.pincode = pincode
        if state and not state == store.address.state:
            store.address.state = state

        # Update store fields
        if remmaingScans is not None:  # Fix handling of 0
            store.scansRemaining = remmaingScans

        if name and name != store.name:
            store.name = name
        if gstin and gstin != store.gstin:
            store.gstin = gstin
        if licenseNumber and licenseNumber != store.licenseNumber:
            store.licenseNumber = licenseNumber
        if ownerName and ownerName != store.contactName:
            store.contactName = ownerName
        if phone and phone != store.phone:
            store.phone = phone
        if email and email != store.email:
            store.email = email

        # Save changes (without transaction)
        store.save()
        return StoreSerializer(store).data
