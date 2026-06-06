from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to="projects/", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CV(models.Model):
    file = models.FileField(upload_to="cv/")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "CV File"