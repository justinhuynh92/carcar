from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Salesperson, Customer, AutomobileVO, Sale
from common.json import ModelEncoder
from django.http import JsonResponse
import json

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "id"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = ["first_name", "last_name", "employee_id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["first_name", "last_name", "address", "phone_number", "id"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "salesperson", "customer", "price", "id"]
    encoders = {"automobile": AutomobileVOEncoder(),
                "salesperson": SalespersonEncoder(),
                "customer": CustomerEncoder()
                }


@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
               {"message": "Could not create a salesperson"}
            )
            response.status_code = 400
            return response


# @require_http_methods(["GET", "DELETE"])
