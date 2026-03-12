# Albania Waterfalls REST API

## Project Description

This project provides a **REST API for waterfalls in Albania**.
The API allows users to retrieve information about different waterfalls and manage the data through secure endpoints.

The main goal of this project is to demonstrate the **development process of a REST API**, including:

* proper API design
* authentication
* clean Git workflow
* documentation and testing

The API is built with **SvelteKit** and communicates using **JSON format**.

---

# Data Model

Each waterfall entity contains the following attributes:

| Field              | Description                                              |
| ------------------ | -------------------------------------------------------- |
| id                 | unique identifier                                        |
| name               | name of the waterfall                                    |
| location           | region or place in Albania                               |
| type               | type of waterfall (e.g. natural, seasonal)               |
| height             | height in meters                                         |
| accessibility      | difficulty to reach the waterfall (easy / medium / hard) |
| tourist_popularity | popularity for tourists (low / medium / high)            |

Example JSON response:

```json
{
  "id": 1,
  "name": "Grunas Waterfall",
  "location": "Theth",
  "type": "natural",
  "height": 25,
  "accessibility": "medium",
  "tourist_popularity": "high"
}
```

---

# REST API Endpoints

## Public Endpoints

### Get all waterfalls

```
GET /api/waterfalls
```

Returns a list of all waterfalls.

Response:

* **200 OK**

---

### Get waterfall by ID

```
GET /api/waterfalls/:id
```

Returns a single waterfall.

Response:

* **200 OK**
* **404 Not Found**

---

# Protected Endpoints (Basic Auth)

The following endpoints require **Basic Authentication**.

### Create a new waterfall

```
POST /api/waterfalls
```

Response:

* **201 Created**
* **400 Bad Request**
* **401 Unauthorized**

---

### Update a waterfall

```
PUT /api/waterfalls/:id
```

Response:

* **200 OK**
* **404 Not Found**
* **401 Unauthorized**

---

### Delete a waterfall

```
DELETE /api/waterfalls/:id
```

Response:

* **204 No Content**
* **404 Not Found**
* **401 Unauthorized**

---

# Authentication

Write operations (**POST, PUT, DELETE**) are protected using **Basic Authentication**.

If the authentication is missing or incorrect, the API returns:

```
401 Unauthorized
```

---

# Technologies

* SvelteKit
* Node.js
* MySQL
* DataGrip
* Postman
* Git & GitHub

---

# Testing

The API was tested using **Postman**.
All endpoints are documented inside the **Postman Collection**.

---


