from django.urls import path ,include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryListView, CategoryDetailView,
    ProductListView, ProductDetailView, ProductsByCategoryView ,ProductViewSet
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/categories/', CategoryListView.as_view(), name='categories'),
    path('api/categories/<slug:slug>/', CategoryDetailView.as_view(), name='category-detail'),

    path('api/products/', ProductListView.as_view(), name='products'),
    path('api/products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),

    path('api/categories/<slug:slug>/products/', ProductsByCategoryView.as_view(), name='products-by-category'),
]