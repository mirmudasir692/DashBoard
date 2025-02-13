from mongoengine import (
    Document,
    StringField,
    BooleanField,
    IntField,
    DateTimeField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    ObjectIdField,
)
from datetime import datetime, timezone


# Embedded Address Document
class Address(EmbeddedDocument):
    addressLine1 = StringField()
    addressLine2 = StringField()
    locality = StringField()
    pincode = StringField()
    state = StringField()


# Store Document
class Store(Document):
    meta = {"collection": "stores"}  # Explicit collection name

    apiKey = StringField(required=True)
    name = StringField(required=True)
    gstin = StringField()
    licenseNumber = StringField(required=True)
    contactName = StringField(required=True)

    # Embedded Address
    address = EmbeddedDocumentField(Address)

    phone = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)

    isSupplier = BooleanField(default=False)
    psid = ObjectIdField()  # Reference to Supplier

    scansRemaining = IntField(required=True)

    isSubscriptionActive = BooleanField(required=True, default=True)
    isOnTrial = BooleanField(default=False)

    subscriptionEndDate = DateTimeField()

    inActiveReason = StringField(choices=["payment_due", "restricted", "other"])

    created_at = DateTimeField(default=datetime.now(timezone.utc))
    updated_at = DateTimeField(default=datetime.now(timezone.utc))

    # Override save to update timestamps
    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super(Store, self).save(*args, **kwargs)
