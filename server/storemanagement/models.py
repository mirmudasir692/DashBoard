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
from datetime import datetime, timezone, timedelta


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

    phone = StringField(required=True)
    email = StringField(required=True, unique=True)

    isSupplier = BooleanField(default=False)
    psid = ObjectIdField()  # Reference to Supplier

    scansRemaining = IntField(required=True)

    isSubscriptionActive = BooleanField(required=True, default=True)
    isOnTrial = BooleanField(default=False)

    inActiveReason = StringField(choices=["payment_due", "restricted", "other"])

    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    subscriptionEndDate = DateTimeField(
        default=lambda: datetime.utcnow() + timedelta(days=365)
    )

    updatedAt = DateTimeField(default=datetime.now(timezone.utc))
    __v = IntField(default=0, db_field="__v")

    # Override save to update timestamps
    def save(self, *args, **kwargs):

        self.updatedAt = datetime.now(timezone.utc)  # Corrected field name
        return super(Store, self).save(*args, **kwargs)
