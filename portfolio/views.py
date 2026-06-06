from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def home(request):

    if request.method == "POST":

            return JsonResponse({"status": "success"})

    return render(request, "home.html")