# Snapgram App

Snapgram is a social media web application inspired by Instagram. The app has a responsive design and includes user authentication with the ability to create and view posts.

The project is built using React and Vite with TypeScript and Tailwind CSS. Appwrite is used as the backend service for authentication and data management. React Router is used for navigation and TanStack Query is used for data fetching and caching.

To run the project locally, clone the repository, install the dependencies, and start the development server.

git clone https://github.com/your-username/snapgram-app.git
cd snapgram-app
npm install
npm run dev

This project requires environment variables to work correctly. Create a .env file in the root directory and add the following variables. All environment variables must start with VITE_.

VITE_APPWRITE_URL=https://cloud.appwrite.io/v1

VITE_APPWRITE_PROJECT_ID=

VITE_APPWRITE_DATABASE_ID=

VITE_APPWRITE_STORAGE_ID=

VITE_APPWRITE_USER_COLLECTION_ID=

VITE_APPWRITE_POST_COLLECTION_ID=

The .env file is not included in the repository for security reasons. An .env.example file is provided to show the required variables. You need to create your own Appwrite project and configure these values.

This project is intended for learning and portfolio purposes.
