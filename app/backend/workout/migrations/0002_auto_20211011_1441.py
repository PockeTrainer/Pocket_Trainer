# Generated by Django 3.2.8 on 2021-10-11 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dayhistory',
            name='bmi',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='dayhistory',
            name='create_date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='dayhistory',
            name='weight',
            field=models.FloatField(null=True),
        ),
    ]