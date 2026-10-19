# BrightUp API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.brightup.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "isPremium": false
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Google OAuth
```http
POST /auth/google
```

**Request Body:**
```json
{
  "credential": "google_oauth_credential_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@gmail.com",
    "name": "John Doe",
    "googleId": "1234567890"
  }
}
```

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "isPremium": false,
    "createdAt": "2026-01-15T10:30:00Z"
  }
}
```

---

## Game Content Endpoints

### Get All Units
```http
GET /units
```

**Response (200):**
```json
{
  "success": true,
  "units": [
    {
      "id": 1,
      "name": "Python Fundamentals",
      "category": "Year 1",
      "description": "Basic Python programming concepts",
      "termCount": 50,
      "difficulty": "Beginner"
    }
  ]
}
```

### Get Unit Details
```http
GET /units/:id
```

**Response (200):**
```json
{
  "success": true,
  "unit": {
    "id": 1,
    "name": "Python Fundamentals",
    "category": "Year 1",
    "description": "Basic Python programming concepts",
    "terms": [
      {
        "term": "variable",
        "definition": "A named storage location in memory"
      }
    ]
  }
}
```

### Get Random Question
```http
GET /questions/random?unitId=1
```

**Query Parameters:**
- `unitId` (optional): Filter by specific unit
- `difficulty` (optional): easy, medium, hard

**Response (200):**
```json
{
  "success": true,
  "question": {
    "id": "q123",
    "term": "algorithm",
    "definition": "A step-by-step procedure for solving a problem",
    "options": [
      "A step-by-step procedure for solving a problem",
      "A type of data structure",
      "A programming language",
      "A computer virus"
    ],
    "correctIndex": 0,
    "unitId": 1
  }
}
```

---

## Progress Endpoints

### Get User Progress
```http
GET /progress
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "progress": {
    "totalUnitsCompleted": 5,
    "totalQuestionsAnswered": 234,
    "correctAnswers": 198,
    "accuracy": 84.6,
    "currentStreak": 7,
    "longestStreak": 15,
    "unitProgress": [
      {
        "unitId": 1,
        "completed": true,
        "accuracy": 92.5,
        "lastPlayed": "2026-01-19T08:30:00Z"
      }
    ]
  }
}
```

### Save Progress
```http
POST /progress
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "unitId": 1,
  "questionId": "q123",
  "correct": true,
  "timeSpent": 5.2
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Progress saved successfully",
  "newStats": {
    "totalCorrect": 199,
    "accuracy": 84.7
  }
}
```

---

## Leaderboard Endpoints

### Get Global Leaderboard
```http
GET /leaderboard
```

**Query Parameters:**
- `timeframe` (optional): daily, weekly, monthly, alltime
- `limit` (optional): Number of results (default: 50)

**Response (200):**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": "507f1f77bcf86cd799439011",
      "name": "Alice",
      "score": 9850,
      "accuracy": 96.5
    }
  ]
}
```

---

## Premium Endpoints

### Upgrade to Premium
```http
POST /premium/upgrade
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "paymentMethodId": "pm_1234567890",
  "plan": "monthly"
}
```

**Response (200):**
```json
{
  "success": true,
  "subscription": {
    "id": "sub_1234567890",
    "status": "active",
    "plan": "monthly",
    "currentPeriodEnd": "2026-02-19T00:00:00Z"
  }
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Server error"
}
```

---

## Rate Limiting

API endpoints are rate-limited to:
- **100 requests per 15 minutes** for authenticated users
- **20 requests per 15 minutes** for unauthenticated users

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642598400
```

---

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20, max: 100)

**Response includes:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 875,
    "pages": 44
  }
}
```

---

## Webhooks

For premium integrations, BrightUp supports webhooks for the following events:
- `user.premium.activated`
- `user.progress.milestone`
- `user.achievement.unlocked`

Contact support for webhook setup.

---

**Last Updated:** January 19, 2026
