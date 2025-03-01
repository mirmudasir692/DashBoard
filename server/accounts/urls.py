from django.urls import path
from . import views


urlpatterns = [
    path("register/", views.CreateUserApiView.as_view(), name="register"),
    path("login/", views.LoginUser.as_view(), name="login"),
    path("auth/status/", views.AuthApiView.as_view(), name="auth"),
    path("logout/", views.LoginUser.as_view(), name="logout"),
    path("auth/refresh/", views.RefreshTokenApiView.as_view(), name="refresh"),
]
