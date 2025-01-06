# 📸 Photo Catalog 

## Description
"Photo Catalog" is an application that allows you to browse, filter, and manage a catalog of photos. The application was built using React with state managed by `useState`.

## Features
- 🔍 **Browse the photo catalog** without logging in
- 🔄 **Filter catalog items**
- 🔐 **User login** using tokens and hashed passwords
- ✏️ **Edit items** by logged-in users
- 🛠️ **Full catalog management** by administrators
- 📥 **Automatic loading of sample items** if all current items are deleted

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/mariuszmmm/photo-catalog
   ```
2. **Navigate to the project directory:**
   ```bash
   cd photo-catalog
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the application:**
   ```bash
   npm start
   ```

## Requirements
- Node.js
- npm

## Demo
The application is available at: [https://photocatalog.netlify.app](https://photocatalog.netlify.app)

## Login Details
- **Administrator**
  - login: `admin`
  - password: `admin#`
- **Sample user**
  - login: `user`
  - password: `user#`


## Backend and Deployment Status
The application has been migrated to a serverless architecture and no longer uses a separate backend or the Railway server. Instead, serverless functions are hosted directly on Netlify.

## Deployment Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/a315cfe5-02a0-4fed-84b2-9ab82fe50d72/deploy-status)](https://app.netlify.com/sites/photocatalog/deploys)


You can access the live application [here](https://photocatalog.netlify.app).

