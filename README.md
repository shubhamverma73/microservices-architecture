# Node.js Microservices Learning Project

This project is a beginner-friendly E-Commerce microservices example built with Node.js, Express.js, MongoDB, Mongoose, Axios, dotenv, Morgan, Nodemon, express-validator, and CORS.

It is intentionally simple. There is no authentication, no message queue, no shared database, and no advanced framework. The goal is to help you understand how independent services communicate through HTTP.

## Phase 1: Architecture Explanation

The project has four independent Node.js applications:

- `gateway`: the only app the client calls directly.
- `user-service`: owns user data and the `user_service_db` database.
- `product-service`: owns product data and the `product_service_db` database.
- `order-service`: owns order data and the `order_service_db` database.

Architecture diagram:

```text
Client
  |
  v
API Gateway
  |
  +--------------------+
  |                    |
  v                    v
User Service      Product Service
  |                    |
  v                    v
User MongoDB      Product MongoDB

API Gateway
  |
  v
Order Service
  |
  +--> User Service: verify user exists
  |
  +--> Product Service: verify product exists and read price
  |
  v
Order MongoDB
```

What you learned in Phase 1: a microservice owns one business capability and one database. Other services must communicate through APIs instead of reading another service's database.

## Phase 2: Folder Structure

```text
microservices-learning/
  gateway/
  user-service/
  product-service/
  order-service/
  postman_collection.json
  README.md
```

Each service has its own `package.json`, `.env`, routes, controllers, middleware, utilities, and logs folder. The gateway does not have a database because it only forwards requests.

What you learned in Phase 2: each service is a separate application. You install and run each one independently.

## Phase 3: Gateway

The gateway receives client requests at `/api/...` and forwards them with Axios:

- `POST /api/users` -> User Service `POST /users`
- `GET /api/users` -> User Service `GET /users`
- `GET /api/users/:id` -> User Service `GET /users/:id`
- `POST /api/products` -> Product Service `POST /products`
- `GET /api/products` -> Product Service `GET /products`
- `GET /api/products/:id` -> Product Service `GET /products/:id`
- `POST /api/orders` -> Order Service `POST /orders`
- `GET /api/orders` -> Order Service `GET /orders`

The gateway files are:

- `app.js`: creates the Express app and registers routes.
- `server.js`: starts the server.
- `config/index.js`: reads service URLs from `.env`.
- `routes/gateway.routes.js`: maps gateway URLs to controller functions.
- `controllers/gateway.controller.js`: decides which service receives the request.
- `services/proxy.service.js`: sends the Axios request.
- `utils/logger.js`: prints readable gateway logs.

What you learned in Phase 3: an API Gateway hides internal services from the client and forwards requests to the right service.

## Phase 4: User Service

User Service manages users.

User fields:

- `name`
- `email`
- `phone`

Endpoints:

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

Validation:

- `name` is required.
- `email` must be valid.
- `phone` is optional.

What you learned in Phase 4: one service owns user data and exposes user-specific endpoints.

## Phase 5: Product Service

Product Service manages products.

Product fields:

- `name`
- `price`
- `quantity`

Endpoints:

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

Validation:

- `name` is required.
- `price` must be greater than `0`.
- `quantity` must be `0` or more.

What you learned in Phase 5: product data is separate from user data, even though the overall project is one E-Commerce example.

## Phase 6: Order Service

Order Service manages orders.

Order fields:

- `userId`
- `productId`
- `quantity`
- `totalPrice`

Endpoints:

- `POST /orders`
- `GET /orders`
- `GET /orders/:id`

Validation:

- `userId` is required.
- `productId` is required.
- `quantity` must be greater than `0`.

What you learned in Phase 6: orders store only IDs from other services. They do not perform database joins.

## Phase 7: MongoDB

Each service uses its own MongoDB database:

```text
user-service    -> user_service_db
product-service -> product_service_db
order-service   -> order_service_db
```

Start MongoDB locally before running the services. If MongoDB is installed as a service, it may already be running. If you use the MongoDB daemon manually, run:

```bash
mongod
```

What you learned in Phase 7: database ownership is a core microservices idea. A service should not directly use another service's database.

## Phase 8: Service Communication

When a client creates an order:

```text
Client
  |
  v
POST /api/orders
  |
  v
Gateway
  |
  v
Order Service
  |
  +--> GET /users/:userId on User Service
  |
  +--> GET /products/:productId on Product Service
  |
  v
Save order in Order MongoDB
  |
  v
Gateway
  |
  v
Client
```

Order creation steps:

1. Order Service receives `userId`, `productId`, and `quantity`.
2. Order Service calls User Service to verify that the user exists.
3. Order Service calls Product Service to verify that the product exists.
4. Order Service calculates `totalPrice = product.price * quantity`.
5. Order Service saves the order.
6. If User Service or Product Service returns an error, the order is not created.

What you learned in Phase 8: services can communicate synchronously over HTTP with Axios.

## Phase 9: Testing Using Postman

Import `postman_collection.json` into Postman.

The collection includes:

- Create User
- Get Users
- Create Product
- Get Products
- Create Order
- Get Orders
- Error examples

Example user request:

```json
{
  "name": "Asha Sharma",
  "email": "asha@example.com",
  "phone": "9876543210"
}
```

Example product request:

```json
{
  "name": "Notebook",
  "price": 50,
  "quantity": 100
}
```

Example order request:

```json
{
  "userId": "replace-with-created-user-id",
  "productId": "replace-with-created-product-id",
  "quantity": 2
}
```

What you learned in Phase 9: test data flows through the gateway first, then reaches the correct service.

## Phase 10: Project Execution

Open four terminals.

Terminal 1:

```bash
cd gateway
npm install
npm run dev
```

Terminal 2:

```bash
cd user-service
npm install
npm run dev
```

Terminal 3:

```bash
cd product-service
npm install
npm run dev
```

Terminal 4:

```bash
cd order-service
npm install
npm run dev
```

Recommended startup order:

1. MongoDB
2. User Service
3. Product Service
4. Order Service
5. Gateway

What you learned in Phase 10: each microservice is a separate process. The full application works when all required services are running.

## Dependencies

Each service installs only what it needs.

Gateway:

- `express`: HTTP server.
- `axios`: forwards requests to services.
- `dotenv`: reads `.env`.
- `morgan`: logs requests.
- `cors`: allows browser clients.
- `nodemon`: restarts during development.

User, Product, and Order services:

- `express`: HTTP server.
- `mongoose`: MongoDB object modeling.
- `express-validator`: validates request bodies.
- `dotenv`: reads `.env`.
- `morgan`: logs requests.
- `cors`: allows browser clients.
- `nodemon`: restarts during development.

Order Service also uses `axios` to call User Service and Product Service.

## Environment Variables

Gateway `.env`:

```env
PORT=3000
USER_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
```

User Service `.env`:

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/user_service_db
```

Product Service `.env`:

```env
PORT=3002
MONGO_URI=mongodb://127.0.0.1:27017/product_service_db
```

Order Service `.env`:

```env
PORT=3003
MONGO_URI=mongodb://127.0.0.1:27017/order_service_db
USER_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
```

## HTTP Status Codes

- `400 Bad Request`: validation failed because the client sent invalid data.
- `404 Not Found`: a user, product, or order ID does not exist.
- `409 Conflict`: the request conflicts with existing state, such as duplicate email or not enough product quantity.
- `500 Internal Server Error`: the service hit an unexpected server-side problem.

## Common Errors

MongoDB connection failed:

- Check that MongoDB is running.
- Check each service's `MONGO_URI`.

Gateway could not reach service:

- Check that the target service is running.
- Check gateway `.env` service URLs.

Validation failed:

- Check the request body in Postman.
- Make sure required fields are present.

User or product not found while creating order:

- Create a user and product first.
- Use the `_id` values returned by MongoDB.

## Future Improvements

- Authentication and authorization.
- Product stock updates after order creation.
- Docker Compose for easier local startup.
- Message queues for event-driven communication.
- Centralized logging.
- API documentation with Swagger.
- Tests with Jest or Supertest.

## Learning Notes

This project uses direct HTTP calls because they are easiest to understand at the beginning. In real systems, synchronous HTTP is useful, but it also creates dependencies: if Product Service is down, Order Service cannot create an order. That is why larger systems often add retries, circuit breakers, queues, or events later.

For now, the important lesson is clear ownership:

- Gateway owns routing.
- User Service owns users.
- Product Service owns products.
- Order Service owns orders and asks other services for needed information.
