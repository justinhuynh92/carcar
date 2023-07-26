from django.db import models
from django.urls import reverse
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=1, null=True, unique=True)
    import_href = models.CharField(max_length=200, unique=True, blank=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("show_technician", kwargs={'id': self.id})

class Appointment(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    customer_name = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    reason = models.CharField(max_length=100)
    vip = models.BooleanField(default=False)
    status = models.CharField(max_length=50, default="Created")
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.vin

    def finished(self):
        self.status = "Finished"
        self.save()

    def canceled(self):
        self.status = "Canceled"
        self.save()

    def get_api_url(self):
        return reverse("show_appointment", kwargs={'id': self.id})
