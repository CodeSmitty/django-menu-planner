from collections import OrderedDict

from django.utils import dateparse

from rest_framework.exceptions import NotFound
from rest_framework.pagination import BasePagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param

from .dates import today, next_week, previous_week


class MealPagination(BasePagination):
    def paginate_queryset(self, queryset, request, view=None):
        scope = self.get_scope(request)
        date = self.get_date(request)

        if scope != 'week':
            raise NotFound

        self.request = request
        self.scope = scope
        self.date = date

        return queryset.week_of(date)

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data),
        ]))

    def get_scope(self, request):
        return request.query_params.get('scope', 'week')

    def get_date(self, request):
        date_param = request.query_params.get('for_date', None)

        if date_param:
            return dateparse.parse_date(date_param)
        else:
            return today()

    def get_next_link(self):
        url = self.request.build_absolute_uri()
        url = replace_query_param(url, 'scope', self.scope)
        return replace_query_param(url, 'for_date', self.get_next_date())

    def get_previous_link(self):
        url = self.request.build_absolute_uri()
        url = replace_query_param(url, 'scope', self.scope)
        return replace_query_param(url, 'for_date', self.get_previous_date())

    def get_next_date(self):
        if self.scope == 'week':
            return next_week(self.date)

    def get_previous_date(self):
        if self.scope == 'week':
            return previous_week(self.date)
