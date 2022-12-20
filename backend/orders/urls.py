from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

app_name = 'orders'

router = DefaultRouter()
router2 = DefaultRouter()

router.register('', views.OrderViewSet, basename='orders')
router2.register('', views.FileViewSet, basename='files')

urlpatterns = [
    path('orders/', include(router.urls)),
    path('orders/<int:orders_pk>/files/', include(router2.urls)),
]
