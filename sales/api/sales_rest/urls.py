from django.urls import path
from .views import api_salespersons, api_salesperson, api_customers
from .views import api_customer, api_sales


urlpatterns = [
    path("salespeople/", api_salespersons, name="api_salespersons"),
    path("salespeople/<int:pk>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales")
]
