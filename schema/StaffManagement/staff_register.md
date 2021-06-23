# Register a staff

**URL** : `/staff-management/staff`

**Method** : `POST`

## Request parameters

None

## Request body

| Key            | Required | Type      | Default value | Sample value | Description |
| -------------- |:--------:| ----------| ------------- | ------------ |-------------|
| yid            | ○        | string    |               |              |             |
| full_name      | ○        | string    |               |              |             |
| birthday       | ○        | string    |               |              |             |
| gender         | ○        | integer   |               |              | 0: male, 1: female      |
| status         | ○        | integer   |               |              |             |
| join_date      | ○        | string    |               | 2020-10-15   |             |
| tag_json       | ○        | array     |               | ["tag"]      |             |
| creater        | ○        | string    |               |              |             |

## Success Response

**Code** : `200 OK`

**Content-Type** : `application/json`

**Content examples**

Register success.

```json
{
    "id": 5,
    "yid": "xxx",
    "full_name": "Nguyen Van X",
    "birthday": "1986-04-14T00:00:00.000Z",
    "gender": 1,
    "status": 1,
    "join_date": "2017-05-01T00:00:00.000Z",
    "quit_date": null,
    "tag_id_json": [13, 14],
    "creater": "yyy",
    "updater": "yyy",
    "create_time": "2021-06-22T19:30:03.173Z",
    "update_time": "2021-06-22T19:30:03.173Z",
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
