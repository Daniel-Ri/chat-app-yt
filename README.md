# Chat App Website

I developed this project by following [As a Programmer](https://www.youtube.com/watch?v=HwCqsOis894)'s tutorial video.

## How to Run (Development Mode)

1. Install the packages:

   ```
   ROOT_FOLDER> npm install
   ROOT_FOLDER/frontend> npm install
   ```

2. Setup `.env` in ROOT_FOLDER

   ```
   PORT=3000
   MONGO_DB_URI=
   JWT_SECRET=
   ```

3. Setup `.env` in ROOT_FOLDER/frontend

   ```
   VITE_SERVER_URL=http://localhost:3000
   ```

4. Run the backend program

   ```
   ROOT_FOLDER> npm run dev
   ```

5. Run the frontend program (in different terminal)
   ```
   ROOT_FOLDER/frontend> npm run dev
   ```

## How to Deploy (Production Mode)

1. Setup `.env` in ROOT_FOLDER

   ```
   PORT=3000
   MONGO_DB_URI=
   JWT_SECRET=
   NODE_ENV=production
   VITE_SERVER_URL=http://localhost:3000
   ```

1. Run the build script:

   ```
   ROOT_FOLDER> npm run build
   ```

1. Run the start script
   ```
   ROOT_FOLDER> npm start
   ```
