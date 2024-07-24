# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

bob@bob-vintage:~/Sahand-MERN-Blog/client$ npm i
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported

//not fixed yet. leave it for now, Jun 8, 2024

=========================================

Future Improvement:

1. When a user sign up, validate on both front-end and back-end. Perhaps back-end first.

2. First Name(cannot change, not unique), Last Name, Email(cannot changed. But unique), Birth Year(cannot change), State(cannot change),( County, city later)

3. React Hook Form or React Fomik? React Hook Form seems newer with hooks without class function.(later)

4. No "signout" on sidebar. ask him to write and pull up maybe 3 or 5 posts by others. 30% vs 70%

5. "Delete Account" should be difficult to be found. "Welcome! Please double check your information here. If there are some typos when you signup, please delete your account at very very bottom. Then signup a new one."

==========================================

https://tailwindcss.com/docs/guides/vite

Using React

---

npm run dev

---

ES7+ React/Redux/React-Native

intall this extension in VS Code IDE

---

control + shift + L # select multiple same words for editing.

---

http://localhost:5173/

in client folder
npm run dev

## npm i react-router-dom

1. Use with Vite - Flowbite React
   https://flowbite-react.com/docs/guides/vite

Install Flowbite React

in client directory
Step 1. npm i flowbite-react

then follow step 2 as well on the webpage since it is the latest update, instead on the video.

---

For API

go to Sahand-MERN directory and
npm init -y

"type": "module",
"scripts": {
"dev": "nodemon api/index.js",
"start": "node api/index.js"
},
in package.json

node api/index

npm i nodemon

## npm run dev

## move .gitignore to Sahand-MERN directory

## npm i mongoose

mongoDB Atlas

danlidennydeng
HOcdTj6Jd0SelcRg

mongodb+srv://danlidennydeng:HOcdTj6Jd0SelcRg@cluster0.x4ougqw.mongodb.net/

npm i dotenv

---

npm i bcryptjs

---

## npm i jsonwebtoken

npm install @reduxjs/toolkit
npm install react-redux
#for managing signin state

npm i redux-persist

---

OAuth with Google

search for firebase
https://firebase.google.com/

click on console at left of songdeng2008@gmail.com

/client, npm install firebase

---

firebase storage for pictures
u.s. central

rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
// /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=\*_} {
allow read;
allow write: if request.resource.size < 2 _ 1024 _ 1024 &&
request.resource.contentType.matches("image/._")
}
}
}

---

search for "react circular progress bar"

## npm install --save react-circular-progressbar //under client folder

/Sahand-MERN-Blog$ npm i cookie-parser

~/Sahand-MERN-Blog/client$ npm install react-quill --save

~/Sahand-MERN-Blog/client$ npm install --save-dev tailwind-scrollbar

=========================================================

After getposts in DashPosts.jsx, the sort date is not based on updateAt

After you have deleted some posts, the show more button is still there even if all posts are less than 9.
