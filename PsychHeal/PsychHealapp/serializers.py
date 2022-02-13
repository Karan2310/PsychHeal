from rest_framework import serializers
from .models import *

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'user_login'
        model = Signup
        abstract =True
        fields = '__all__'

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'passwords'
        model = Passwords
        abstract = True
        fields = '__all__'

class HobbiesSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'hobbies'
        model = Hobbies
        abstract = True
        fields = '__all__'