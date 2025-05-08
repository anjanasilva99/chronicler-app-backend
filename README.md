# Chronicler Distance Calculator - Backend

A Node.js/Express backend service for calculating the minimum possible distance between two lists of numbers.

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Clone the repository:
```
git clone https://github.com/anjanasilva99/chronicler-app-backend.git
cd chronicler-app-backend
```

### Install dependencies:
```
npm install
```

### Start the development server:
```
npm run dev
```

## Algorithm
The backend implements an algorithm that:

- Parses input files with two numbers per line
- Sorts both lists independently
- Calculates the absolute difference between corresponding elements
- Computes the total, average, and maximum distance

## Technologies Used

- Express: Web server framework
- Multer: Middleware for handling multipart/form-data
- CORS: Cross-Origin Resource Sharing middleware