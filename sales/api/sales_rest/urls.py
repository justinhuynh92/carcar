from django.urls import path
from .views import api_salespersons, api_salesperson, api_customers


urlpatterns = [
    path("salespeople/", api_salespersons, name="api_salespersons"),
    path("salespeople/<int:pk>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers")
]
