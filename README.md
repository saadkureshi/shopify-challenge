# Image Repository App - Shopify Developer Intern Challenge

## Project Overview

This is an image repository app created for the Shopify Developer Intern challenge.

## Stack Used

PostgreSQL, Express, React, Node

## Demo Video



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