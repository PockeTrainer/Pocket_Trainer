# Generated by Django 3.2.8 on 2022-01-28 13:27

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
            name='WorkoutInfo',
            fields=[
                ('workout_name', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('workout_kcal', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='DayHistoryWorkout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateField()),
                ('target_kg', models.IntegerField(blank=True, null=True)),
                ('target_cnt', models.IntegerField(blank=True, null=True)),
                ('target_time', models.TimeField(blank=True, null=True)),
                ('workout_set', models.IntegerField(blank=True, null=True)),
                ('workout_time', models.TimeField(blank=True, null=True)),
                ('is_clear', models.BooleanField(default=False)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='day_history_workout_user', to=settings.AUTH_USER_MODEL)),
                ('workout_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='day_history_workout_workout', to='workout.workoutinfo')),
            ],
        ),
        migrations.CreateModel(
            name='DayHistoryExtraWorkout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateField()),
                ('workout_kg', models.IntegerField(blank=True, null=True)),
                ('workout_cnt', models.IntegerField(blank=True, null=True)),
                ('workout_time', models.TimeField(blank=True, null=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='day_history_workout', to=settings.AUTH_USER_MODEL)),
                ('workout_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='day_history_workout', to='workout.workoutinfo')),
            ],
        ),
    ]
