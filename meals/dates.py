import datetime


def today():
    return datetime.date.today()


def next_day(date):
    return date + datetime.timedelta(days=1)


def start_of_week(date=today()):
    return date - datetime.timedelta(days=date.weekday() + 1)


def previous_week(date=start_of_week()):
    return date - datetime.timedelta(weeks=1)


def end_of_week(date=today()):
    return start_of_week(date) + datetime.timedelta(days=6)


def week_range(date=today()):
    return [start_of_week(date), end_of_week(date)]
