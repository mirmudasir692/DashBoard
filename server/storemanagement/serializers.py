from rest_framework_mongoengine.serializers import DocumentSerializer
from rest_framework import serializers
from .models import Store


class StoreSerializer(DocumentSerializer):
    class Meta:
        model = Store
        fields = "__all__"


class PaginationSerializer(serializers.Serializer):
    stores = StoreSerializer(many=True)
    has_next = serializers.BooleanField()
    has_previous = serializers.BooleanField()
