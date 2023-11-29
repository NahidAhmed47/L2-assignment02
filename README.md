# L2-assignment02

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/NahidAhmed47/L2-assignment02.git
   cd L2-assignment02
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

Start the application:

```bash
npm run start:dev
```

## API's Details

1. **Endpoint**

   ```bash
   https://assignment-02-alpha.vercel.app
   ```

2. **Create a new user**

   - Method: POST

   ```bash
   /api/users
   ```

3. **Retrieve a list of all users**

   - Method: GET

   ```bash
   /api/users
   ```

4. **Retrieve a specific user by ID**

   - Method: GET

   ```bash
   /api/users/:userId
   ```

5. **Update user information**

   - Method: PUT

   ```bash
   /api/users/:userId
   ```

6. **Delete a user**

   - Method: DELETE

   ```bash
   /api/users/:userId
   ```

7. **Add New Product in Order**

   - Method: PUT

   ```bash
   /api/users/:userId/orders
   ```

8. **Retrieve all orders for a specific user**

   - Method: GET

   ```bash
   /api/users/:userId/orders
   ```

9. **Calculate Total Price of Orders for a Specific User**

   - Method: GET

   ```bash
   /api/users/:userId/orders/total-price
   ```
