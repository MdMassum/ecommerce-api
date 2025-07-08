# Ecommerce - Api Assignment

## Project Overview

This project is a robust Backend for Ecommerce app made using Nodejs/Express with typescript. It contains User Authentication(Customer, Admin) and CRUD operation for Products, Cart and Orders management.

## Key Technologies Used

- **Node.js**: The runtime environment on which the backend is built.
- **Expressjs**: Used to handle HTTP requests and routing.
- **Mongodb**: The database used for storing user and notes data.
- **JWT**: Used for user authentication via access tokens.

## Project Setup On Local

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MdMassum/ecommerce-api.git 
cd  ecommerce-api
```

### 2. Create .env File
Create a .env file in the root directory of backend folder and paste the following content:

```plaintext

MONGODB_URI = <Your_Mongodb_Uri>
PORT = 3000
FRONTEND_URL = <Your_Frontend_Url> // for handling cors

JWT_SECRET = <Your_Secret_Key>
JWT_EXPIRE = 1d
COOKIE_EXPIRE = 1


```

### 3. Go to Backend Folder and Run

    cd backend && npm install
    cd npm run dev

    This will start the backend service on http://localhost:3000

## APIs Overview

The API supports CRUD operations for **Products**,**Cart management**, **Order Product** and **user authentication**, with capabilities like creating, updating, deleting Product by Admin,addin items to cart, updating cart and making product order by customer and authenticating users. The API ensures seamless user experience with features such as:

- **User Authentication**: Register, login, logout. (Admin & Customer)
- **Product Management**: Create, update, delete product (Admin Only) and retrieve product with pagination and search feature.
- **Cart Management**: Add Product to cart, update cart and delete product from cart by customer.
- **Order Management**: create order from cart and get my orders (customer), update status of order and get all orders (Admin).
- **Error Handling**: Structured error responses with appropriate HTTP status codes for common errors like authentication failure and resource not found.

## Backend Structure

Below is the folder structure of the project:

```plaintext

├── backend
    ├── src
    │   ├── config
    │   │   ├── mongoConfig.ts
    │   ├── controllers
    │   │   ├── auth.controller.ts
    │   │   └── cart.controller.ts
    │   │   └── order.controller.ts
    │   │   └── product.controller.ts
    │   ├── middleware
    │   │   ├── auth.ts
    │   │   └── error.ts
    │   ├── models
    │   │   ├── cart.model.ts
    │   │   ├── order.model.ts
    │   │   ├── product.model.ts
    │   │   └── user.model.ts
    │   ├── routes
    │   │   ├── auth.route.ts
    │   │   └── cart.route.ts
    │   │   └── order.route.ts
    │   │   └── product.route.ts
    │   ├── types
    │   │   └── express.d.ts
    │   ├── utils
    │   │   ├── apiFeatures.ts
    │   │   ├── auth.ts
    │   │   ├── errorHandler.ts
    │   ├── server.ts
    ├── .env
    ├── tsconfig.json
    ├── package-lock.json
    ├── package.json

```
## API Endpoints Documentation

`http://localhost:3000/api/v1` - for local development

### Auth Routes

Base URL: `/auth`

| Method | Endpoint                | Description                    |
|--------|-------------------------|--------------------------------|
| POST   | `/signup`               | customer signup                |
| POST   | `/login`                | customer and admin login       |
| POST   | `/logout`               | logout the user                |

---

### Cart Routes

Base URL: `/carts`  (All this routes are authenticated)

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/`                | add item to cart               |
| GET    | `/`                | get cart items                 |
| PUT    | `/:itemId`         | Update cart item               |
| DELETE | `/:itemId`         | Delete item from cart          |


### Product Routes

Base URL: `/products`  (All this routes are authenticated)

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/new`             | add new Product(Admin)         |
| GET    | `/`                | get all products               |
| GET    | `/:id`             | get product by id              |
| PUT    | `/:id`             | update product by id(Admin)    |
| DELETE | `/:itemId`         | Delete product by id(Admin)    |


### Order Routes

Base URL: `/orders`  (All this routes are authenticated)

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | `/new`             | create new Order               |
| GET    | `/me`              | get my orders                  |
| GET    | `/`                | get all orders(Admin)          |
| PUT    | `/:id`             | update Order status(Admin)     |

---