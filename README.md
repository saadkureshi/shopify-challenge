# Image Repository App - Shopify Developer Intern Challenge

## Project Overview

This is an image repository app created for the Shopify Developer Intern challenge. Users can register, login, view an image feed with images for all users, view their own profile to see the images they uploaded, and logout.

## Stack Used

PostgreSQL, Express, React, Node

## Demo Video

https://user-images.githubusercontent.com/68786365/134990426-32c46ec9-e89b-4785-af25-155c830c35e7.mp4

## Routes

GET http://localhost:5000/
- Response is "Welcome to the backend server."

POST http://localhost:5000/login
- Request includes the email and plain text password.
- Response is the user details if the email and hashed password are correct, "There is no account associated with this email address" if there is no email match, and "The password entered is incorrect" if bcrypt compare of passwords returns false.

POST http://localhost:5000/logout
- Response is "You logged out successfully."

POST http://localhost:5000/register
- Request includes first name, last name, email, and password.
- Response is the user details that just got added or the error message if post fails.

GET http://localhost:5000/users
- Response is all the users in the database.

GET http://localhost:5000/users/:id
- Request includes user id.
- Response is the specific user in the database.

GET http://localhost:5000/images
- Response is all the images in the database.

GET http://localhost:5000/images/:id
- Request includes user id.
- Response is "Please log in to view your profile." if the user making the request is not logged in, or all the images for the specific user if they are logged in.

POST http://localhost:5000/upload
- Request includes the cloudinary URL for a single image or multiple images along with the user id.
- Response is the image details that just got uploaded to the database, or an error if the upload fails.

POST http://localhost:5000/refresh
- Request includes the jwt access token.
- Response is either "You are not authenticated", "Refresh token is not valid", or the new access and new refresh tokens.

## Project Setup

Prerequisites: User needs to have node, npm, and postgreSQL installed on their machine.

- Open terminal and navigate to the directory where you want the repository to be cloned
- Type `git clone git@github.com:saadkureshi/shopify-challenge.git`
- Navigate into the folder `frontend` and type `npm install` followed by `npm start`
- In a new terminal window, navigate into the folder `backend` and type `npm install` followed by `npm start`
- In a third terminal window, navigate to the `shopify-challenge/backend` folder and log into your postgreSQL account `psql -U postgres`
- In order to create and seed the database with dummy data, type the following 3 lines:
  - `db/schema/00_all_migrations.sql`
  - `db/seeds/01_users_seeds.sql`
  - `db/seeds/02_images_seeds.sql`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Future Improvements

The following features can be left for future improvements due to time constraints:

- Test Suites
- Search and delete images
