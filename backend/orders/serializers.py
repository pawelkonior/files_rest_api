from rest_framework import serializers

from . import models


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Files
        fields = ('id', 'name', 'file', 'order')


class OrderSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True, read_only=True)

    class Meta:
        model = models.Order
        fields = ('id', 'name', 'files')