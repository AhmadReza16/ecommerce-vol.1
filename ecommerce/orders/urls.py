from django.urls import path
from .views import CreateOrderView, UserOrdersView , CreateStripeCheckoutSession, stripe_webhook

urlpatterns = [
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
    path('orders/', UserOrdersView.as_view(), name='user-orders'),
    path('orders/<int:order_id>/pay/', CreateStripeCheckoutSession.as_view(), name='create-payment'),
    path('orders/stripe-webhook/', stripe_webhook, name='stripe-webhook'),
]