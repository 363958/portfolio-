from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def home(request):

    if request.method == "POST":

        name = request.POST.get("name", "")
        email = request.POST.get("email", "")
        message = request.POST.get("message", "")

        try:
            send_mail(
                subject=f"Portfolio Message from {name}",
                message=f"From: {name}\nEmail: {email}\n\nMessage:\n{message}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            return JsonResponse({"status": "success"})

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })

    return render(request, "home.html")