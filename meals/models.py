from django.db import models


class Meal(models.Model):
    date = models.DateField(db_index=True)
    type = models.CharField(
        choices=[
            ('lunch', 'Lunch'),
            ('dinner', 'Dinner'),
        ],
        max_length=10,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
    )

    class Meta:
        unique_together = ['date', 'type']
        ordering = ['date', '-type']


class MealItem(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(
        choices=[
            ('entre', 'Entre'),
            ('side', 'Side'),
            ('other', 'Other'),
        ],
        max_length=10,
    )
    is_dairy_free = models.BooleanField(
        default=False, verbose_name='D', help_text='Dairy Free')
    is_gluten_free = models.BooleanField(
        default=False, verbose_name='G', help_text='Gluten Free')
    is_vegetarian = models.BooleanField(
        default=False, verbose_name='V', help_text='Vegetarian')
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
    )
