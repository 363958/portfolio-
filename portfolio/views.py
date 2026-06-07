from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail


def home(request):

    if request.method == "POST":

        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        try:
            send_mail(
                subject=f"Portfolio Contact from {name}",
                message=f"""
Name: {name}

Email: {email}

Message:
{message}
""",
                from_email=None,
                recipient_list=["kripapdl12@gmail.com"],
                fail_silently=False,
            )

            return JsonResponse({"status": "success"})

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=500)

    return render(request, "home.html")


def cv_view(request):
    return render(request, "cv.html")