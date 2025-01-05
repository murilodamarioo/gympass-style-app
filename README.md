
# 📚✨ **API Documentation**

## 🚀🌟 **Project** **Gympass Style App**

## RFs (Functional Requirements)
- [X] It must be possible to register;
- [X] It must be possible to authenticate;
- [X] It must be possible to retrieve the profile of a logged-in user;
- [X] It must be possible to get the number of check-ins performed by the logged-in user;
- [X] It must be possible for the user to access their check-in history;
- [X] It must be possible for the user to search for nearby gyms (10km);
- [X] It must be possible for the user to search for gyms by name;
- [X] It must be possible for the user to check in at a gym;
- [X] It must be possible to validate a user's check-in;
- [X] It must be possible to register a gym;

## RNs (Business Rules)
- [X] User must not be able to register with a duplicate email;
- [X] User cannot perform more than one check-in on the same day;
- [X] User cannot check in unless they are within 100 meters of the gym;
- [X] Check-in can only be validated up to 20 minutes after it is created;
- [X] Check-in can only be validated by administrators;
- [X] A gym can only be registered by administrators;

## RNFs (Non-Functional Requirements)
- [X] User passwords must be encrypted;
- [X] Application data must be persisted in a PostgreSQL database;
- [X] All data lists must be paginated with 20 items per page;
- [X] Users must be identified by a JWT (JSON Web Token);

---

## 🛠️💻 **Technologies Used**

- 🟢 **Language:** [Node.js, Typescript]
- 🏗️ **Framework:** [Fastify]
- 🗄️ **Database:** [PostgreSQL, MongoDB]
- 🔒 **Authentication:** [JWT]
- 🚢 **Other Technologies:** [Docker, CI]

---

## 📦⚙️ **Installation & Configuration**

1️⃣ **📥 Clone the repository:**
```bash
git clone https://github.com/murilodamarioo/gympass-style-app.git
```

2️⃣ **📂 Navigate to the project directory:**
```bash
cd gympass-style-app
```

3️⃣ **📦 Install dependencies:**
```bash
npm install
```

4️⃣ **📝 Set up environment variables:**
Create a `.env` file based on `.env.example` and adjust as needed.

5️⃣ **🚀 Start the server:**
```bash
npm start
```
---
## 🚢 Docker Container

To up a PostgreSQL Container
```bash
docker compose up -d
```

To stop PostgreSQL image
```bash
docker compose stop
```

---

## 🔑🛡️ **Authentication**

This API uses **🔐 JWT (JSON Web Token)** for authentication. Make sure to include the token in the 📨 header of protected requests.

**📝 Header Example:**
```http
Authorization: Bearer <token>
```

---

## 📚📊 **Main Endpoints**

### 📝👤 **1. Register User**
- 🛠️ **Method:** `POST`
- 🌐 **URL:** `/users`
- 📝 **Description:** Registers a new user.
- 📨 **Request:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- 📤 **Response:**
  ```json
  {
    "status": 201,
  }
  ```

### 🔑 **2. Authenticate User**
- 🛠️ **Method:** `POST`
- 🌐 **URL:** `/sessions`
- 📝 **Description:** Authenticates a user.
- 📨 **Request:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- 📤 **Response:**
  ```json
  {
    "status": 200,
    "token": "string"
  }
  ```

### 👤 **4. Get Profile**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/me`
- 📝 **Description:** Returns authenticated user profile.
- 📤 **Response:**
  ```json
  {
    "status": 200,
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### 🏋️‍♂️ **5. Search Gyms**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/gyms/search`
- 📝 **Description:** Searches gyms by query.
- - 📨 **Query Params:**
  ```json
  {
    "query": "string",
    "page": "number"
  }
  ```
- 📤 **Response:**
  ```json
  {
    "status": 200,
    "gyms": []
  }
  ```

### 📍 **6. Nearby Gyms**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/gyms/nearby`
- 📝 **Description:** Finds nearby gyms.
- 📤 **Response:**
  ```json
  {
    "status": 200,
    "gyms": []
  }
  ```

### 🏗️ **7. Create Gym (ADMIN)**
- 🛠️ **Method:** `POST`
- 🌐 **URL:** `/gyms`
- 📝 **Description:** Creates a new gym.
- - 📨 **Request:**
  ```json
  {
    "title": "string",
    "description": "string",
    "phone": "string",
    "latitude": "number",
    "longitude": "number"
  }
  ```
- 📤 **Response:**
  ```json
  {
    "status": 201,
  }
  ```

### 📋 **8. Check-in History**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/check-ins/history`
- 📝 **Description:** Retrieves check-in history.
- 📤 **Response:**
  ```json
  {
    "status": 200,
    "checkIns": [
      "id": "string",
      "created_at": "Date",
      "validated_at": "Date",
      "gym_id": "string",
      'user_id": "string",
    ] 
  }
  ```

### 📊 **9. Check-in Metrics**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/check-ins/metrics`
- 📝 **Description:** Displays check-in metrics.
- 📤 **Response:**
  ```json
  {
    "status": 200,
    "checkInsCount": 10
  }
  ```

### ✅ **10. Validate Check-in (Admin)**
- 🛠️ **Method:** `PATCH`
- 🌐 **URL:** `/check-ins/:checkInId/validate`
- 📝 **Description:** Validates a check-in.
- 📤 **Response:**
  ```json
  {
    "status": 204,
  }
  ```
---

## 🧪 **Tests**

### 1. **Unit Tests**
Runs all unit tests located in the `test/` directory.
```bash
npm run test
````

Runs the tests and watches for changes in the test/ directory. Tests will automatically rerun on any changes.
```bash
npm run test:watch
````

### 2. **E2E Tests**
Runs the tests for integration/HTTP files located in the `src/http` directory, typically used for testing client-server communication.
```bash
npm run test:e2e
````
### 3. Test Coverage
Runs all tests and generates a coverage report, showing the percentage of code covered by tests.
```bash
npm run test:coverage
````
