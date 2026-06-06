from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from .models import CV

def home(request):
    cv = CV.objects.last()

    if request.method == "POST":

            return JsonResponse({"status": "success"})

    return render(request, "home.html", {"cv": cv})