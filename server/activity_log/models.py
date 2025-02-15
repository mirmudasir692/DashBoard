# from mongoengine import Document, StringField, DateTimeField, ReferenceField
# from datetime import datetime, timezone


# class AuditLog(Document):
#     meta = {"collection": "audit_log"}
#     model_name = StringField(required=True)
#     document_id = ReferenceField(required=True)
#     action = StringField(required=True, choices=["created", "updated", "deleted"])
#     timestamp = DateTimeField(default=datetime.now(timezone.utc))
#     changes = StringField()

#     def __str__(self):
#         return f"{self.action} {self.model_name} {self.document_id}"
