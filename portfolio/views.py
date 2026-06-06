from django.shortcuts import render
from django.http import JsonResponse

def home(request):

    if request.method == "POST":
        return JsonResponse({"status": "success"})

    return render(request, "home.html")

def cv_view(request):
    return render(request, "cv.html")