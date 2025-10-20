from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView

urlpatterns = [
    path('api/categories/', CategoryListView.as_view(), name='categories'),
    path('api/products/', ProductListView.as_view(), name='products'),
    path('api/products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
]