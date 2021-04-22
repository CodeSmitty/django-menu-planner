from django.contrib import admin

from .models import Menu, Meal, MealItem, UserMenu


class MealItemInline(admin.TabularInline):
    model = MealItem
    radio_fields = {'type': admin.HORIZONTAL}


class MealAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    inlines = [
        MealItemInline,
    ]
    list_display = ('date', 'type')
    # list_filter = ('menu',)
    radio_fields = {'type': admin.HORIZONTAL}


admin.site.register(Menu)
admin.site.register(Meal, MealAdmin)
admin.site.register(UserMenu)
