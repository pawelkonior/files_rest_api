from rest_framework import viewsets
from rest_framework.decorators import action

from . import models
from . import serializers


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


class FileViewSet(viewsets.ModelViewSet):
    queryset = models.Files.objects.all()
    serializer_class = serializers.FileSerializer
