# django-menu-planner

## Getting Started
```
# Install Dependencies
pipenv install

# Activate virtualenv
pipenv shell

# Initialize database
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start test server
python manage.py runserver

# Seed test data
python manage.py seed_meals
```

## API
`GET /api/menus/`

List all menus
```
[
    {
        "id": 1,
        "name": "Test Menu"
    },
    {
        "id": 2,
        "name": "ASDF"
    },
    ...
]
```

`GET /api/menus/{id}/`

Show a specific menu

`GET /api/menus/{id}/meals/`

List all meals for a menu. Results are paginated.

**Parameters**

`scope` specifies the range of results returned, similar to a typical limit or page_size. Currently, only `week` is supported and is the default.

`for_date` is used to determine which results are returned, similar to page number or offset.  Defaults to the current date.
```
{
    "next": "http://localhost:8000/api/menus/1/meals/?for_date=2021-03-22&scope=week",
    "previous": "http://localhost:8000/api/menus/1/meals/?for_date=2021-03-08&scope=week",
    "results": [
        {
            "id": 15,
            "date": "2021-03-14",
            "type": "lunch",
            "items": [
                {
                    "name": "French Fries with Sausages",
                    "type": "entre",
                    "is_dairy_free": false,
                    "is_gluten_free": false,
                    "is_vegetarian": false
                },
                {
                    "name": "Cantaloupe",
                    "type": "side",
                    ...
                },
                {
                    "name": "Red cabbage",
                    ...
                }
            ]
        },
        {
            "id": 16,
            "date": "2021-03-14",
            "type": "dinner",
            "items": [...]
        },
        {
            "id": 17,
            "date": "2021-03-15",
            "type": "lunch",
            "items": [...]
        },
        ...
    ]
}
```

`GET /api/menus/{id}/meals/{id}/`

Show a specific meal for a menu
