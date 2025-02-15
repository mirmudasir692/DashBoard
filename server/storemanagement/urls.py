from django.urls import path
from . import views

urlpatterns = [
    path("", views.StoreApiView.as_view(), name="stores"),
    path("<str:storeId>/", views.StoreDetailsApiView.as_view(), name="store"),
]
