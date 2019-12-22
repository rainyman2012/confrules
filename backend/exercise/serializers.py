from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from .models import Program
from django.db.models import Count
from django.contrib.auth.models import User
from accounts.serializers import UserDetailsSerializer
from django.contrib.auth import get_user_model, authenticate

from rest_framework.utils import html, model_meta, representation
from pudb import set_trace

try:
    import json
except ImportError:
    from django.utils import simplejson as json

try:
    from django.forms.utils import ValidationError
except ImportError:
    from django.forms.util import ValidationError

from django.db.models import Q

UserModel = get_user_model()


class ProgramSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(required=False)

    class Meta:
        model = Program
        fields = ('id', 'name', 'identify', 'law', 'branch', 'phone', 'user')
        depth = 2  # we can set this to get all realation
        extra_kwargs = {
            'user': {'read_only': True},
        }

    # Default `create` and `update` behavior...

    def create(self, validated_data):
        if "user" in validated_data:
            user = validated_data.pop('user')
        ModelClass = self.Meta.model
        instance = ModelClass._default_manager.create(
            user=self.context['request'].user, **validated_data)

        return instance

    def update(self, instance, validated_data):

        # set_trace()  # This is put to debug.

        info = model_meta.get_field_info(instance)
        # set_trace()  # This is put to debug.
        # Simply set each attribute on the instance, and then save it.
        # Note that unlike `.create()` we don't need to treat many-to-many
        # relationships as being a special case. During updates we already
        # have an instance pk for the relationships to be associated with.
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                field.set(value)
            else:
                setattr(instance, attr, value)

        instance.save()

        return instance
