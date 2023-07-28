from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer_name",
        "date",
        "reason",
        "vip",
        "technician",
        "status",
        "id",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
    def get_extra_data(self, o):
        return {"is_vip": o.is_vip()}

@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        technicians = Technician.objects.create(**content)
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE", "PUT"])
def show_technician(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=id).update(**content)
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400
            )
        try:
            if AutomobileVO.objects.get(vin=content["vin"]):
                content["vip"] = True
        except AutomobileVO.DoesNotExist:
            content["vip"] = False

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE", "PUT"])
def show_appointment(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["PUT"])
def finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = Appointment.Status.Finished
            appointment.save()
            return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=400,
            )


@require_http_methods(["PUT"])
def cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = Appointment.Status.Cancelled
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Appointment does not exist"},
                status=400,
            )


def list_appointment_statuses(request):
    statuses = Appointment.Status.choices
    status_list = [{'value': value, 'label': label} for value, label in statuses]
    return JsonResponse(
        status_list,
        safe=False,
    )
