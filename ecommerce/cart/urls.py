from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView

urlpatterns = [
    path('api/cart/', CartView.as_view(), name='cart'),
    path('api/cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('api/cart/remove/', RemoveFromCartView.as_view(), name='remove-from-cart'),
]