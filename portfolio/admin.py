
# Register your models here.
# portfolio/admin.py

from .models import Project
from django.contrib import admin
from .models import CV

admin.site.register(CV)
# If you are not using models yet, you can even leave this empty
# admin.site.register(ContactMessage)

admin.site.register(Project)