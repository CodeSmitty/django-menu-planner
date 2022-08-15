import datetime


def today():
    return datetime.date.today()


def next_day(date):
    return date + datetime.timedelta(days=1)


def day_of_week(date=today()):
    num = date.weekday()
    if num == 6:
        return 0
    else:
        return num + 1


def start_of_week(date=today()):
   
    return date - datetime.timedelta(days=day_of_week(date))


def end_of_week(date=today()):
    return start_of_week(date) + datetime.timedelta(days=6)


def previous_week(date=today()):
    return date - datetime.timedelta(days=day_of_week(date))- datetime.timedelta(weeks=1)


def next_week(date=today()):
    return date - datetime.timedelta(days=day_of_week(date)) + datetime.timedelta(weeks=1)


def week_range(date=today()):
   
    return [start_of_week(date), end_of_week(date)]