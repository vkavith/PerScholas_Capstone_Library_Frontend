# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#Project Name:

Digital Library Management System to have a seamless interaction to access the Library Catalog.

## https://github.com/vkavith/PerScholas_Capstone_Library_Backend


# Table of Contents

## Why would you build this App
+ I can scale this App further and promote in my native city library and any small towns in India to access this Digital Library.The city or a small town library in India are not funded much by the Corporation, so can help the library which are in real need. Implement the same to Government funded schools where the infrastructure is not good. Help the library/schools in my native city in India which are less fortunate.
+ A fun toolkit for my young nephews to play with and checkout the children's category. 

## How will you model your data? (Schema) What is the data you are CRUD ing?
+ Books
+ Users
+ Transactions

+ Books data model
  + bookName
  + isbn
  + author
  + category
  + stock
  + imageURL
   
+ User data model
  + username
  + email
  + password
  + isAdmin
  
 
+ Transaction
   + book { ref: 'Book'}
   + user:{ ref: 'User'}
   + issueDate
   + dueDate
   + returnDate
   + status [issued, returned]

## What are your 4 pages? (How will you create FULL CRUD on the Front End)
   + Home page
      + Welcome page
   + Add Book
      + Add Books to the Library Catalog
   + Edit Book
      + Edit Book Details in the Library Catalog
   + Delete Book
      + Delete a BookName from the Library Catalog
   + Issue Book
      + Issue Book to a User, display error message if the same book issued again. Book stock decreased by 1 after issue
   + Return Book
      + Return Book to the Library Catalog from the User, Book stock increased by 1 after return      
   + Collection
      + Display entire books from the Library Catalog. User has the option to search for 1 book at a time
 
## Do you have a third party API?
  + Google Books API was used to get the Book Images URL, also to refresh the Book Images URL from Google Books API in the code.


## Wireframe - I will email, it is hand-written


## https://github.com/vkavith/PerScholas_Capstone_Library_Backend

## Overview 

+ MERN-Digital Library is a comprehensive web application built using the MERN stack (MongoDB, Express.js, React and Node.js) that allows users to efficiently manage and operate a books collection in Library Catalog. This project incorporates essential CRUD (Create, Read, Update, Delete) operations to handle books, book transactions, book details and other relevant data within the digital library inventory.

+ The Library Management Application is a web-based application that allows librarians to manage books, track borrowing and returning of books, manage user accounts. The system includes functionalities such as:

+ Book Management: Add, update, and delete books, select books from the inventory.

+ Transaction Management: Handle the borrowing and returning of books.

+ Search and Filtering: Search for books and users, filter results based on various criteria.

1. 📖 Book Management:

- Create, read, update and delete books in the app

- Associate books with authors, isbn, category, stock, bookimage

2. 👨‍💼 Author Management:
- Link authors to their respective books for easy navigation.

3. 📚 Genre Management:
- Add, edit, and delete categories, bookStock as needed.

4. 📚 Book Transaction Management

- Issue Book from Library Catalog to User
- Return Book from User to Library Catalog

5. 🌟 User-Friendly Interface:
- Utilize React.js to create a responsive and user-friendly front-end.
- Intuitive and visually appealing design for a smooth user experience.

6. 🚀 Scalability and Performance(To-Do):
- Prepare the application for potential scaling by using best practices.
- As application gets complex, tune database queries and routes
- Implement User Authentication
- Use External API for Book Reviews

# Technologies Used

- 🌐 Front-end: React.js, HTML/CSS, JavaScript - Front-end development, responsive design, user experience enhancements. Components, state management, hooks,
- ⚙️ Back-end: Node.js, Express.js - Server-side development, API creation, MongoDB integration.
- 🗃️ Database: MongoDB - NoSQL database management, schema design, data handling.
- 🔄 Version Control: Git
- ☁️ Deployment: Render


# How to Run the Project



1. Clone the Repository:

git clone https://github.com/vkavith/PerScholas_Capstone_Library_Backend.git

2. Navigate to the Project Directory for Backend

cd PerScholas_Capstone_Library_Backend

3. Install Dependencies:

- npm install
- npm init -y
- npm i dotenv express mongoose mongodb
- npm install express cors 

4. Set Up the Environment Variables: Create a .env file in the root directory and add your MongoDB connection string and other environment variables.

- MONGO_URI=your_mongodb_uri
- PORT = port_no

5. Run the Backend Server:

- npm start

6. Clone the Repository:

    git clone https://github.com/vkavith/PerScholas_Capstone_Library_Frontend.git

7. Navigate to the Project Directory for Frontend:

   cd PerScholas_Capstone_Library_Frontend

8. Install dependencies for front-end

   npm install react-router-dom

   npm i axios

8. Run the Frontend: Open another terminal window and start the React development server:

   npm run dev

9. Access the Application: Open your web browser and go to http://localhost:5173

10. I have deployed in render, the link
    
    https://perscholas-capstone-library-frontend.onrender.com/


# API Endpoints


Method - GET 
       - http://localhost:5000/api/books 
       - Get all books

Method - GET 
       - http://localhost:5000/api/books/search?q=${searchQuery}
       - Get one book

Method - PUT
       - http://localhost:5000/api/books/${selectedBook._id}
       - Edit book info 

Method - POST
       - http://localhost:5000/api/books
       - Post 1 book

Method - DELETE
       - http://localhost:5000/api/books/${selectedBook._id}
       - Delete a complete book

Method - GET
       - http://localhost:5000/api/users
       - Get all users
       
Method - POST
       - http://localhost:5000/api/issuetransactions
       - GET transactions

