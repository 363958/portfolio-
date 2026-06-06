from django.test import TestCase

# Create your tests here.
# portfolio/models.py

from django.db import models

title = models.CharField(max_length=100)
description = models.TextField()

def __str__(self):
        return self.title
    