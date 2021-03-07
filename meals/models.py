from django.db import models

class Meal(models.Model):
    date = models.DateField(db_index=True)
    type = models.CharField(
        choices = [
            ('lunch', 'Lunch'),
            ('dinner', 'Dinner'),
        ],
        max_length = 10
    )

    class Meta:
        unique_together = ['date', 'type']
        ordering = ['date', '-type']

class MealItem(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(
        choices = [
            ('entre', 'Entre'),
            ('side', 'Side'),
            ('other', 'Other'),
        ],
        max_length = 10
    )
    is_dairy_free = models.BooleanField(default=False)
    is_gluten_free = models.BooleanField(default=False)
    is_vegetarian = models.BooleanField(default=False)