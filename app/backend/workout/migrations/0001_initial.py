# Generated by Django 3.2.8 on 2021-10-11 13:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='workoutInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('workout_name', models.CharField(max_length=200)),
                ('workout_kcal', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='dayHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.IntegerField(null=True)),
                ('bmi', models.IntegerField(null=True)),
                ('total_time', models.IntegerField()),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workoutHistory_userid', to=settings.AUTH_USER_MODEL)),
                ('workout_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workoutHistory_workoutid', to='workout.workoutinfo')),
            ],
        ),
    ]