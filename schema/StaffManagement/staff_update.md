
# Update team/group member status
## Description
Update team/group member status

## Method
PATCH

## URL:
/staff-management/staff/{staff_id}

## Request parameters

None

## Request body

at least one field is specified

| Key            | Required | Type      | Default value | Sample value | Description |
| -------------- |:--------:| ----------| ------------- | ------------ |-------------|
| yid            |     ▲    | string    |               |              |             |
| full_name      |     ▲    | string    |               |              |             |
| birthday       |     ▲    | string    |               |              |             |
| gender         |     ▲    | integer   |               |              |             |
| status         |     ▲    | integer   |               |              |             |
| join_date      |     ▲    | string    |               |              |             |
| quit_date      |     ▲    | string    |               |              |             |
| tag_json       |     ▲    | array     |               | ["tag"]      |             |
| updater        |     ○    | string    |               |              |             |	

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