# Get infomation of a staff

**URL** : `/staff-management/staff/{staff_id}`

**Method** : `GET`

## Request parameters
| Key            | Required | Type     | Default value | Sample value | Description |
| -------------- |:--------:| -------- | --------------|--------------|-------------|
| staff_id       |     ○    | integer  |               |              | Staff ID    |

## Success Response

**Code** : `200 OK`

**Content-Type** : `application/json`

**Content examples**

Response of data.

```json
{
    "yid": "dnga",
    "full_name": "Nguyễn Văn A",
    "birthday": "2000-04-14",
    "gender": 1,
    "status": 1,
    "job_category_id": 1,
    "join_date": "2017-05-21",
    "quit_date": null,
    "tag_id_json": [1, 2, 3],
    "create_time": "2021-06-22 15:37:20",
    "creater": "xxxx",
    "update_time": "2021-06-22 15:37:20",
    "updater": "xxxx"
}
```

## Error Response

**Code** : `400, 404, 500, ...`

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
