from django.urls import path
from .views import list_technicians, list_appointments, show_appointment, show_technician, finish_appointment, cancel_appointment

urlpatterns = [
    path("technicians/", list_technicians, name="create_technician"),
    path("technicians/<int:id>/", show_technician, name="show_technician"),
    path("appointments/", list_appointments, name="create_appointment"),
    path("appointments/<int:id>/", show_appointment, name="show_appointment"),
    path("appointments/<int:id>/finish/", finish_appointment, name="finish_appointment"),
    path("appointments/<int:id>/cancel/", cancel_appointment, name="cancel_appointment"),
]
