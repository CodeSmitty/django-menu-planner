from django.contrib import admin

from .models import Meal, MealItem


class MealItemInline(admin.TabularInline):
    model = MealItem
    radio_fields = {'type': admin.HORIZONTAL}


class MealAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    inlines = [
        MealItemInline,
    ]
    list_display = ('date', 'type')
    radio_fields = {'type': admin.HORIZONTAL}


admin.site.register(Meal, MealAdmin)
