from django.db import models
from django.urls import reverse
from django.template.defaultfilters import default
# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100, null=True, unique=True)
    sold = models.BooleanField(default=False)
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
    class Status(models.TextChoices):
        Pending = "Pending", ("Pending")
        Cancelled = "Cancelled", ("Cancelled")
        Finished = "Finished", ("Finished")

    vin = models.CharField(max_length=17, unique=True)
    customer_name = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=100, choices=Status.choices, default=Status.Pending)
    vip = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def is_vip(self):
        sold_autos = AutomobileVO.objects.filter(vin=self.vin, sold=True)
        if len(sold_autos) > 0:
            return True
        return False

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("show_appointment", kwargs={'id': self.id})
