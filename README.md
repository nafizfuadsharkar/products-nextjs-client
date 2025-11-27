# Product Management Platform

A full-featured **Next.js product management platform** with authentication, product listing, and CRUD operations.
Built with **Next.js (App Router)**, **NextAuth.js**, **DaisyUI/Tailwind CSS**, and a simple **Express.js backend**.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Pages & Functionality](#pages--functionality)
4. [UI Guidelines](#ui-guidelines)
5. [Technologies](#technologies)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)

---

## Project Overview

This platform allows users to view products, register/login, manage products, and interact with a clean, responsive UI.
It demonstrates role-based access, protected routes, and modern React patterns.

---

## Features

* **Authentication**: Login/Register with credentials or Google social login
* **Role-based access**: Protected pages for adding/managing products
* **Responsive design**: Mobile, tablet, desktop support
* **Uniform cards & tables**: Hover/focus states for better UX
* **Product management**: Add, view, delete products
* **Realistic UI**: Hero section, features, testimonials, banners

---

## Pages & Functionality

### 1. Landing Page

* **Navbar**: Logo, 4+ routes, Login/Register (sticky & responsive)
* **Logged-in Dropdown**: Shows user info, Add Product, Manage Products
* **Hero**: Headline, subtitle, primary CTA, optional background
* **4 Sections**: Features, product cards, testimonials, banner
* **Footer**: Links, social icons, copyright

### 2. Login/Register Page

* **Social login (Google)** & credentials form
* **Redirect to Home (`/`)** after successful login

### 3. Item List Page

* Page title + short description
* Search bar & optional category filter (UI only)
* Grid of at least 6 product cards

  * Image/icon
  * Title & short description
  * Price/meta
  * Details button

### 4. Item Details Page

* Large image/banner
* Product title & full description
* Meta info (price, date, priority)
* Back button

### 5. Protected Page: Add Product

* Only accessible to logged-in users
* Redirect unauthorized users to `/login`
* Form fields: Title, Short Description, Full Description, Price, Date, Priority, Optional Image URL
* Buttons: Submit (with success toast/confirmation)

### 6. Protected Page: Manage Products

* List all products in table/grid
* Each item has actions: View, Delete
* Responsive, clean layout

---

## UI Guidelines

* **Layout & Responsiveness**: Consistent spacing, clean layouts, adaptive for all devices
* **Typography & Colors**: Clear hierarchy, readable fonts, consistent color palette
* **Cards, Lists & Forms**: Uniform cards, hover/focus states, responsive grids, inline validation
* **Interactions & Consistency**: Hover/focus states, visual consistency, optional micro-animations

---

## Technologies

* **Frontend**: Next.js (App Router), Tailwind CSS, DaisyUI, Framer Motion (animations optional)
* **Authentication**: NextAuth.js (credentials + Google login)
* **Backend**: Express.js server (API for products, role-based access)
* **Database**: MongoDB / PostgreSQL (optional, for storing products and users)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nafizfuadsharkar/products-nextjs-client.git
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies (Express server):

```bash
cd server
npm install
```

4. Create `.env` file for environment variables:

```env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

DB_URI=your_database_connection_string
```

---

## Usage

### Run Frontend

```bash
npm run dev
```

Open `http://localhost:3000`

### Run Backend

```bash
cd server
npm run dev
```

API runs on `http://localhost:5000` (or configured port)

---

## Folder Structure (Example)

```
/first-nextjs-project
│
├─ /app                   # Next.js pages (App Router)
│   ├─ /products          # Item List & Details
│   ├─ /auth              # Login/Register pages
│   ├─ /dashboard         # Protected pages: Add/Manage Products
│   └─ page.jsx           # Landing page
│
├─ /components            # Reusable UI components
│   ├─ Navbar.jsx
│   ├─ Footer.jsx
│   ├─ ProductCard.jsx
│   └─ Hero.jsx
│
├─ /server                # Express.js backend
│   ├─ index.js
│   ├─ routes/
│   └─ controllers/
│
├─ /public
│   └─ images
│
├─ package.json
└─ tailwind.config.js
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AwesomeFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/AwesomeFeature`)
5. Open a Pull Request

---

Made with ❤️ using **Next.js, Tailwind, DaisyUI, NextAuth.js, Express.js**
