#1
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from cart.models import Cart, CartItem
from .serializers import OrderSerializer
#2
import stripe
from django.conf import settings
from rest_framework.views import APIView
#3
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

#1
class CreateOrderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart = Cart.objects.get(user=request.user)

        if not cart.items.exists():
            return Response({"error": "Cart is empty!"}, status=400)

        order = Order.objects.create(
            user=request.user,
            total_price=cart.total_price
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart.items.all().delete()

        return Response({"message": "Order created!", "order_id": order.id}, status=201)

class UserOrdersView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


#2
    #Creat API For Session

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateStripeCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, user=request.user)

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': f"Order {order.id}",
                            },
                            'unit_amount': int(order.total_price * 100),
                        },
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url='http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:3000/payment-cancel',
            )

            return Response({'checkout_url': checkout_session.url})
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)



#3

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = "Webhook_Secret_Key_From_Stripe"

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError:
        return HttpResponse(status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        order_id = session['client_reference_id']
        order = Order.objects.get(id=order_id)
        order.status = 'PAID'
        order.save()

    return HttpResponse(status=200)