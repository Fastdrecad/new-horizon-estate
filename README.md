# Setting Up the MERN Real Estate App

This guide will walk you through the process of setting up the MERN Real Estate App on your local machine.

## Prerequisites

Before you begin, ensure you have Node.js installed on your system.

## Cloning the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/Fastdrecad/new-horizon-estate.git
cd new-horizon-estate
```

## Backend Configuration

1. **Environment File**: Navigate to the `api` folder and create file: `.env`. Add the following contents to both files:

    ```plaintext
    MONGO=
    JWT_SECRET=
    ```

2. **MongoDB Setup**: 
    - Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Create a new cluster and follow the instructions to set up a new database.
    - Once set up, obtain your MongoDB connection string and add it to the `MONGO` variable in your `.env` file.
   
3. **JWT_SECRET**:
    - This just needs to be any long, random string. You can google "secret key generator".

## Frontend Configuration

1. **Environment File**: Navigate to the `client` folder and create a file: `.env`:

    ```plaintext
    VITE_FIREBASE_API_KEY=
    ```

## Running the Application

1. **Backend**:
    - Navigate to the `api` directory.
    - Install dependencies: `npm install`.
    - Start the server: `npm run dev`.

2. **Frontend**:
    - Open a new terminal and navigate to the `client` directory.
    - Install dependencies: `npm install`.
    - Start the frontend application: `npm run dev`.
    - The application should now be running on `http://localhost:3000` but verify this in your command line terminal  
