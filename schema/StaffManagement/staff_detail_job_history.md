# Get job histories of staff

**URL** : `/staff-management/staff/job-history/{staff_id}`

**Method** : `GET`

## Request parameters

| Key            | Required | Type     | Default value | Sample value | Description |
| -------------- |:--------:| -------- | --------------|--------------|-------------|
| staff_id       |    ○     | integer  |               |              |             |

## Success Response

**Code** : `200 OK`

**Content-Type** : `application/json`

**Content examples**

Response of data.

Order by from_date desc, to_date desc

```json
{
   "data": [
      {
         "job_category_id": 1,
         "job_name": "PO",
         "from_date": "2021-01-01",
         "to_date": null
      },
      {
         "job_category_id": 2,
         "job_name": "PM",
         "from_date": "2020-12-31",
         "to_date": "2021-01-01"
      }
   ]
}
```

Response of empty.

```json
{
   "data": []
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