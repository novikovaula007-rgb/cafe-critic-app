# Cafe Critic App 🍽️

Cafe Critic is a full-stack web application that allows users to discover, review, and share their experiences at various cafes and eateries. Built with a robust backend powered by Node.js, Express, and TypeScript, and a dynamic frontend using React, TypeScript, and Vite, this application provides a seamless platform for food enthusiasts.

--- 

## 🚀 Features

*   **User Authentication:** Secure registration and login system to manage user accounts. 🔐
*   **Place Management:** Add, view, and delete cafe/restaurant listings. 📝
*   **Review System:** Users can leave detailed reviews with ratings for food quality, service, and interior. 🌟
*   **Image Uploads:** Support for uploading multiple images per place to showcase the venue.
*   **Admin Panel:** Administrators have the ability to manage places and reviews. 🛡️
*   **Responsive Design:** A user-friendly interface built with Material UI, ensuring a great experience across all devices.

--- 

## 💻 Tech Stack

*   **Backend:** Node.js, Express, TypeScript, Mongoose, Argon2, JWT
*   **Frontend:** React, TypeScript, Vite, Material UI, Redux Toolkit, React Router DOM, Zod, React Toastify, Axios
*   **Database:** MongoDB

--- 

## 🛠️ Installation

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn
*   MongoDB

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the `backend` directory and add your MongoDB connection string:
    ```
    DB_CONNECTION_STRING=mongodb://localhost:27017/cafe-critic
    ACCESS_SECRET_JWT=your_access_secret
    REFRESH_SECRET_JWT=your_refresh_secret
    ```
4.  Seed the database with initial data (optional):
    ```bash
    npm run seed
    ```
5.  Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

--- 

## ▶️ Usage

This application allows users to explore various cafes, read reviews, and contribute their own feedback. Registered users can add new places, upload photos, and write reviews. Administrators have additional privileges to manage content.

### Key User Flows:

1.  **Browsing Places:** Visit the homepage to see a list of recommended cafes with their ratings and review counts.
2.  **Viewing Details:** Click on a place to see its description, images, overall ratings, and user reviews.
3.  **Adding a New Place:** Logged-in users can add new cafes by providing a title, description, and a main photo. 📸
4.  **Writing Reviews:** Logged-in users can leave reviews for places, including comments and ratings for food, service, and interior.
5.  **Image Gallery:** Users can upload multiple images to a place's gallery to provide a visual overview.
6.  **Authentication:** Users can register for a new account or log in to their existing account.

--- 

## 🔎 API Reference

### Users

*   `POST /api/users`: Register a new user.
*   `POST /api/users/sessions`: Log in a user.
*   `DELETE /api/users/sessions`: Log out a user.
*   `POST /api/users/token`: Refresh access token.

### Places

*   `POST /api/places`: Create a new place (requires authentication).
*   `GET /api/places`: Get all places with aggregated stats.
*   `GET /api/places/:id`: Get a specific place with reviews and ratings.
*   `DELETE /api/places/:id`: Delete a place (admin only).

### Reviews

*   `POST /api/reviews`: Create a new review (requires authentication).
*   `GET /api/reviews?placeId=:id`: Get all reviews for a specific place.
*   `DELETE /api/reviews/:id`: Delete a review (author or admin).

### Gallery

*   `POST /api/gallery/:id`: Upload images for a place (requires authentication).
*   `DELETE /api/gallery/:id`: Delete an image (admin only).
*   `GET /api/gallery/:id`: Get all images for a place.
