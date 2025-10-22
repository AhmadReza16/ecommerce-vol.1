from rest_framework import generics, filters
from .models import Product, Category
from .serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer
from django.shortcuts import get_object_or_404

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['price', 'created_at']

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx.update({"request": self.request})
        return ctx

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx.update({"request": self.request})
        return ctx

# optional: products by category
class ProductsByCategoryView(generics.ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        category = get_object_or_404(Category, slug=slug)
        return category.products.all()

    def get_serializer_context(self):
        return {"request": self.request}
