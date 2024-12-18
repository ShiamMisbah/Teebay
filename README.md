# Teebay
Product renting and buying/selling application.
# Teebay Application Documentation

## Overview
Teebay is a product renting and buying/selling application built with the following stack:
- **Frontend**: React (Apollo Client for GraphQL)
- **Backend**: Node.js (Express, GraphQL)
- **Database**: PostgreSQL (Prisma ORM)
- **UI Framework**: Material-UI

The application is divided into multiple parts as per the challenge requirements.

---

## PART 1: Preliminary Features

### 1. **User Registration**
- **Feature**: Users can register by providing their First Name, Last Name, Address, Email, Phone Number and password (a confirm password is also added to provide better security).
- **Implementation**:
  - **Frontend**:
    - Built using React with a Material-UI `TextField` for inputs and a `Button` for submission.
    - Form validation is handled using `React Hook Form`.
  - **Backend**:
    - A GraphQL mutation `registerUser` is implemented.
    - Prisma is used to store user data in the `User` table.
    - A timestamp is created when the user is registered.
  - **Database Model**:
    ```prisma
    model User {
        id                      Int @id @default(autoincrement())       // Unique identifier for the user
        firstName               String                                  // User's first name
        lastName                String                                  // User's last name
        address                 String                                  // User's address
        email                   String @unique                          // User's email, must be unique
        phoneNumber             BigInt                                  // User's phone number
        password                String                                  // User's password
        products                Product[]                               // List of products posted by the user
        rentedProductsToOther   RentedProduct[] @relation("original")   // Products rented out by this user to others
        productsRented          RentedProduct[] @relation("customer")   // Products rented by this user from others
        soldProductsToOther     SoldProduct[] @relation("original")     // Products sold by this user to others
        productsSold            SoldProduct[] @relation("customer")     // Products bought by this user from others
        createdAt               DateTime @default(now())                // Timestamp when the user was created
    }
    ```

### 2. **Login**
- **Feature**: Users can log in with their email and password.
- **Implementation**:
  - **Frontend**:
    - Similar structure as the registration form.
  - **Backend**:
    - A simple string matching mechanism is implemented using a GraphQL query `login`.
    - Password comparison is handled directly.

---

## PART 2: Product Management

### 1. **Add Product**
- **Feature**: Users can add their products through a multi-page form.
- **Implementation**:
  - **Frontend**:
    - A multi-step form is created using React with Material-UI components.
    - `React Hook Form` is used for state management.
    - Navigation between steps is achieved using local state and `useState`.
  - **Backend**:
    - A GraphQL mutation `addProduct` is implemented to insert product details into the database.
    - The input values for `addProducts` is taken from a custom input type `AddProductInput`.
    - Prisma is used to handle the product schema.
  - **Database Model**:
    ```prisma
    model Product {
        id              Int @id @default(autoincrement())                   // Unique identifier for the product
        title           String                                              // Product title/name
        category        String[]                                            // Product category
        description     String                                              // Product description
        price           Int                                                 // Selling price of the product
        rent            Int                                                 // Rent price of the product
        rentOption      String                                              // Rent option (e.g., daily, weekly)
        productStatus   String @default("POSTED")                           // Status of the product (e.g., POSTED, SOLD, RENTED)
        userId          Int                                                 // Foreign key for the user who posted the product
        user            User @relation(fields: [userId], references: [id])  // Relation to the user who posted the product
        productRented   RentedProduct[]                                     // List of rentals associated with the product
        productSold     SoldProduct[]                                       // List of sales associated with the product
        createdAt       DateTime @default(now())                            // Timestamp when the product was created
        updatedAt       DateTime @updatedAt                                 // Timestamp when the product was updated
    }
    ```

### 2. **Edit Product**
- **Feature**: Users can edit their products.
- **Implementation**:
  - **Frontend**:
    - The product data is fetched using Apollo Client.
    - Pre-filled forms are provided for editing.
  - **Backend**:
    - A GraphQL mutation `updateProduct` is implemented.
    - Prisma handles updates to the product entry.

### 3. **Delete Product**
- **Feature**: Users can delete their products.
- **Implementation**:
  - **Frontend**:
    - A delete button is provided, triggering the GraphQL mutation.
  - **Backend**:
    - A GraphQL mutation `deleteProduct` is implemented.
    - Prisma deletes the entry from the database.
    - Prisma deletes all the productIDs use in the other databases as the foreign key.

---

## PART 3: Rent and Buy/Sell

### 1. **List All Products**
- **Feature**: Users can view all available products.
- **Implementation**:
  - **Frontend**:
    - Products are fetched using Apollo Client and displayed using map().
    - Products are filtered based on the page. (For eg. My Product page display the user's products only while All Product page displays all the other products.)
  - **Backend**:
    - A GraphQL query `getProducts` is implemented to fetch all products.
    - A GraphQL query `getUserProducts` is implemented to fetch user created products.

### 2. **Buy a Product**
- **Feature**: Users can buy products, marking them as sold.
- **Implementation**:
  - **Frontend**:
    - A "Buy" button triggers a GraphQL mutation.
  - **Backend**:
    - A GraphQL mutation `createSoldProduct` creates an entry in the `SoldProduct` table and updates the `productStatus` in `product` table to `SOLD`.
  - **Database Model**:
    ```prisma
    model SoldProduct {
        id                  Int @id @default(autoincrement())                                                   // Unique identifier for the sold product
        dateSold            DateTime                                                                            // Date when the product was sold
        productId           Int                                                                                 // Foreign key for the product being sold
        product             Product @relation(fields: [productId], references: [id], onDelete: Cascade)         // Relation to the product being sold
        originalUserId      Int                                                                                 // Foreign key for the user who sold the product
        originalUser        User @relation("original", fields: [originalUserId], references: [id])              // Relation to the original seller of the product
        boughtUserId        Int?                                                                                // Foreign key for the user buying the product
        boughtUser          User? @relation("customer", fields: [boughtUserId], references: [id])               // Relation to the user buying the product
        createdAt           DateTime @default(now())                                                            // Timestamp when the sale was created
    }
    ```

### 3. **Rent a Product**
- **Feature**: Users can rent products for a specified duration.
- **Implementation**:
  - **Frontend**:
    - A date picker is provided for selecting the rental period.
  - **Backend**:
    - A GraphQL mutation `rentProduct` creates an entry in the `RentedProduct` table and updates the `productStatus` in `product` table to `RENT`.
  - **Database Model**:
    ```prisma
    model RentedProduct {
        id                  Int @id @default(autoincrement())                                               // Unique identifier for the rented product
        dateStart           String                                                                          // Start date of the rental period
        dateEnd             String                                                                          // End date of the rental period
        productId           Int                                                                             // Foreign key for the product being rented
        product             Product @relation(fields: [productId], references: [id], onDelete: Cascade)     // Relation to the product being rented
        originalUserId      Int                                                                             // Foreign key for the user who owns the product
        originalUser        User @relation("original", fields: [originalUserId], references: [id])          // Relation to the original owner of the product
        rentedUserId        Int?                                                                            // Foreign key for the user renting the product
        rentedUser          User? @relation("customer", fields: [rentedUserId], references: [id])           // Relation to the user renting the product
        createdAt           DateTime @default(now())                                                        // Timestamp when the rental was created
    }
    ```

### 4. **Display User Transactions**
- **Feature**: Users can view all their bought, sold, rented, and lent products.
- **Implementation**:
  - **Frontend**:
    - Data is fetched using Apollo Client and displayed in a Material-UI `Table`.
  - **Backend**:
    - A GraphQL query `getUserSoldProducts`, `getUserBoughtProducts`, `getUserRentedProducts`, `getUserBorrowedProducts` fetches relevant data.

---

## PART 4: Implementation Documentation

### 1. **Login and Registration**
- **Challenges**:
  - Input validation for email and password.
  - Implementing Context to use User data all over the website. 
  - Maintaining simple string matching for simplicity.
- **Solutions**:
  - Utilized `React Hook Form` for validation.
  - LocalStorage is used to store user information and authContext is used to pass them to the website.
  - Minimal backend logic for authentication.

### 2. **Multi-Page Form for Adding Products**
- **Challenges**:
  - Managing form state across multiple pages.
- **Solutions**:
  - Used `React Hook Form` to manage state.
  - Steps navigation with local state and conditional rendering.

### 3. **Handling Categories**
- **Challenges**:
  - Storing multiple categories for a product.
- **Solutions**:
  - Used Prisma’s `String[]` data type for categories.
  - Validation to ensure only predefined categories are allowed.

### 5. **Error Handling**
- **Challenges**:
  - Ensuring proper feedback for errors like invalid input or server failures.
- **Solutions**:
  - Implemented error handling in both frontend and backend.
  - Alert function is used for user feedback.

---

