from django.urls import path
from .views import list_technicians, list_appointments, show_appointment, show_technician

urlpatterns = [
    path("technicians/", list_technicians, name="list_technician"),
    path("technicians/", list_technicians, name="create_technician"),
    path("technicians/<int:id>/", show_technician, name="show_technician"),
    path("appointments/", list_appointments, name="list_appointments"),
    path("appointments/", list_appointments, name="create_appointment"),
    path("appointments/<int:id>/", show_appointment, name="show_appointment"),
]
