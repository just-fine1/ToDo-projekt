


# Vue Todo App with Supabase

## Overview

This project is a Todo application built with **Vue 3**, **Pinia**,
**Vue Router**, **Vuetify**, and **Supabase**.

Features include:

-   User registration
-   User login/logout
-   Create tasks
-   View all tasks
-   Edit tasks
-   Mark tasks as completed
-   Delete tasks
-   Filter tasks (all / open / done)

## Technologies

-   Vue 3 (`<script setup>`)
-   Pinia (state management)
-   Vue Router
-   Vuetify
-   Supabase Authentication
-   Supabase Database

## Project Structure

    src/
    ├── lib/
    │   └── supabase.js
    ├── router/
    │   └── index.js
    ├── store/
    │   ├── task.js
    │   └── user.js
    ├── views/
    │   ├── Login.vue
    │   ├── Signup.vue
    │   ├── Dashboard.vue
    │   └── Auth.vue
    ├── App.vue
    └── main.js

## Application Flow

1.  `main.js` starts the Vue application.
2.  `App.vue` renders the active route.
3.  `Vue Router` loads Login, Signup or Dashboard.
4.  `Supabase` handles authentication.
5.  `task.js` communicates with the `tasks` table.
6.  `Dashboard.vue` displays and manages todos.

## Task Operations

* Create:
    POST /tasks – Create a new task.
* Read (All Tasks):
    GET /tasks – Retrieve all tasks.
* Read (Single Task):
    GET /tasks/{id} – Retrieve a single task.
* Update:
    PUT /tasks/{id} – Update a task.
* Complete:
    PATCH /tasks/{id}/complete – Mark a task as completed.
* Delete:
    DELETE /tasks/{id} – Delete a task.

## Authentication

Users can:

-   Register with email and password
-   Log in with email and password
-   Log out
-   Be redirected to the dashboard after successful login

## Environment Variables

Create a `.env` file similar to:

``` env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Running the Project

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```


