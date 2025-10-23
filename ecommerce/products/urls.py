from django.urls import path ,include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryListView, CategoryDetailView,
    ProductListView, ProductDetailView, ProductDetailByIdView, ProductsByCategoryView ,ProductViewSet
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='categories'),
    path('categories/<slug:slug>/', CategoryDetailView.as_view(), name='category-detail'),

    path('products/', ProductListView.as_view(), name='products'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/id/<int:pk>/', ProductDetailByIdView.as_view(), name='product-detail-by-id'),

    path('categories/<slug:slug>/products/', ProductsByCategoryView.as_view(), name='products-by-category'),
]