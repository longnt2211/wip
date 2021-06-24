# Change job a staff

**URL** : `/staff-management/staff/job-history/{staff_id}`

**Method** : `POST`

## Request parameters

None

## Request body

| Key             | Required | Type      | Default value | Sample value | Description |
| --------------- |:--------:| ----------| ------------- | ------------ |-------------|
| joc_category_id | ○        | integer   |               |              |             |
| from_date       | ○        | string    |               |              |             |

## Success Response

**Code** : `200 OK`

**Content-Type** : `application/json`

**Content examples**

Register success.

```json
{
  "status": "ok"
}
```

## Error Response

**Code** : `400, 500, ...`

**Content examples**

```json
{
  "error": {
    "code": 500,
    "message": "Internal error",
    "detail": "Anything"
  }
}
```

## Notes