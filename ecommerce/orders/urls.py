from django.urls import path
from .views import CreateOrderView, UserOrdersView , CreateStripeCheckoutSession, stripe_webhook

urlpatterns = [
    path('api/orders/create/', CreateOrderView.as_view(), name='create-order'),
    path('api/orders/', UserOrdersView.as_view(), name='user-orders'),
    path('api/orders/<int:order_id>/pay/', CreateStripeCheckoutSession.as_view(), name='create-payment'),
    path('api/orders/stripe-webhook/', stripe_webhook, name='stripe-webhook'),
]