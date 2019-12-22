from django.db import models
import uuid
import base64
from PIL import Image
import os
from django.db.models import Q
from passlib.hash import pbkdf2_sha256
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from PIL import Image


def generate_uuid():
    _uuid = base64.urlsafe_b64encode(uuid.uuid4().bytes)
    _uuid = _uuid.decode('utf-8').replace('=', '')
    return _uuid


class ProgramManager(models.Manager):

    def create(self, **kwargs):
        obj = super().create(**kwargs)
        obj.save()
        return obj

    def get_model_fields(self):
        return self.model._meta.fields


class Program(models.Model):
    name = models.CharField(max_length=80, blank=True, default="")
    law = models.CharField(max_length=100, blank=True, default="")
    branch = models.CharField(max_length=100, blank=True, default="")
    identify = models.BooleanField(null=True, blank=True, default="")
    phone = models.CharField(max_length=20, blank=True, default="")
    intro = models.TextField(blank=True, default="")

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='program',
        on_delete=models.CASCADE, null=True, blank=True
    )

    objects = ProgramManager()

    def __str__(self):
        return self.name
