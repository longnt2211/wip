# Get Staff List
## Description
Get staffs list

## Method
GET

## URL
/staff-management/staff

## Request parameters
| Key            | Required | Type     | Default value | Sample value       | Description |
| -------------- |:--------:| -------- | --------------|--------------------|-------------|
| id             |          | String   |               | "bnguyen,vkiet"    | Filter by yid (multipile input) |
| name           |          | String   |               | "B Nguyên, V Kiệt" | Filter by full name contains. |
| join_date      |          | String   |               | "20190101,20210101"| Filter by join date (from - to). |
| dept           |          | String   |               | "D1, D2"           | Filter by Department (single input). |
| group_team     |          | String   |               | "AUC, TRV"         | Filter by Group/Team (multipile input). |
| tags           |          | String   |               | "Cần Thơ"          | Filter by Tags (multipiles input). |
| status         |          | integer  |               | "1,2,3"            | Filter by status (still working or quit or both): default on still working. |
| limit          |          | integer  |100            | 100                | Limit number of record to get. |
| offset         |          | integer  |0              | 15                 | Position of start of record. Ex: return only 100 records, start on record 16 (offset=15)|
| order_by       |          | String   |"id"           | "name"             | Order by specific field. |
| asc            |          | integer  |0              | 0                  | 1: order by specific field asc, 0: order by specific field desc|


## Response
### Success Response
Code : 200 OK
Content-Type : application/json
Content examples
Example:
```
{
  "code": 200,
  "data": {
	"total": 1,
	"content": [
		{
			"id": 1,
			"yid": "bnguyen",
			"full_name": "B Nguyen",
			"job_name": "MN",
			"join_date": "2019-01-01",
			"quit_date": null,
			"status": {
			  "code": 1,
			  "name": "Still working"
			},
			"departments": [],
			"teams": []
		}
		]
	}
}
```

## Error response
Content-Type : application/json
Content examples

| Code           | Description  | Message |
| -------------- |:------------:| ------- |
| 400            | Bad Request  |         |
| 401            | No permission|        |
| 500            | System Error |        |

Example:
```
{
  "error": "Not Found",
  "message": "message",
  "detail":"detail"
}
```
## Note
