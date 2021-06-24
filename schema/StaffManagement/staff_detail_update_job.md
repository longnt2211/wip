
# Update job history of staff
## Description
Update job history

## Method
PATCH

## URL
/staff-management/staff/job-history/{staff_id}

## Request parameters

None

## Request body
at least one field is specified

| Key             | Required | Type      | Default value | Sample value | Description |
| --------------- |:--------:| ----------| ------------- | ------------ |-------------|
| job_category_id |     ▲    | integer   |               |              |             |
| from_date       |     ▲    | string    |               |              |             |

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