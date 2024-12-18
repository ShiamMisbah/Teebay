# Teebay: Product Renting and Selling Application

## Overview
Teebay is a product renting and buying/selling application built with a React frontend, Node.js backend (GraphQL), and PostgreSQL database. This application enables users to register, log in, add, edit, delete, and manage products. Additionally, users can rent or buy products, and view all their transactions. 

This project follows best practices in software engineering, including structured component architecture, in-memory caching, and database migrations using Prisma.

---

## Features
### Part 1: User Authentication
- User registration
- User login (simple string matching for demo purposes)

### Part 2: Product Management
- Add products via a multi-page form with back-and-forth navigation.
- Edit product details.
- Delete products.

### Part 3: Transactions
- List all products.
- Buy or rent products.
- View all bought, sold, rented, or lent products.

---

## Technologies Used
- **Frontend**: React, Apollo Client (GraphQL)
- **Backend**: Node.js, Express.js, Apollo Server (GraphQL)
- **Database**: PostgreSQL, Prisma ORM
- **Styling**: Material-UI (MUI)
- **Forms**: React Hook Form
- **Authentication**: Simple string matching

---

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- PostgreSQL (v14+ recommended)

### Steps to Run the Project
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/teebay.git
   cd teebay
   ```

2. **Backend Setup**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/teebay
     ```
   - Apply database migrations:
     ```bash
     npx prisma migrate dev
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend/teebay
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. **Access the Application**
   - Open your browser and go to `http://localhost:3000`.

---

## Documentation
Detailed documentation of implementation decisions, including data modeling, caching strategies, and error handling, can be found in `Part_4_documentation.md`.

---

## Notes
- Ensure PostgreSQL is running before starting the backend server.
- Prisma migrations automatically set up the required database schema.
---
