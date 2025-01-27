# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#Project Name:

Digital Library Management System to have a seamless interaction to access the Library Catalog.

# Table of Contents

## Why would you build this App
+ I can scale this App further and promote in my native city library and any small towns in India to access this Digital Library.The city or a small town library in India are not funded much by the Corporation, so can help the library which are in real need. Implement the same to Government funded schools where the infrastructure is not good. Help the library/schools in my native city in India which are less fortunate.
+ A fun toolkit for my young nephews to play with and checkout the children's category. 

## How will you model your data? (Schema) What is the data you are CRUD ing?
+ Books
+ User
+ Transaction

+ Books data model
  + bookName
  + ISBN
  + author
  + stock
  + category
   
+ User data model
  + username
  + email
  + password
  + role [admin, user]
 
+ Transaction
   + book { ref: 'Book'}
   + user:{ ref: 'User'}
   + issueDate
   + dueDate
   + returnDate
   + status [issued, returned]
 
+ What are your 4 pages? (How will you create FULL CRUD on the Front End)
   + Home page
      + Login , Register
   + Add Book
      + Add Books to the Library Catalog
   + Edit Book
      + Edit Book Details in the Library Catalog
   + Delete Book
      + Delete one or multiple books of the same BookName
   + Collection
      + Display books based on Category, Display book based on the Book Name/Title
 
 + Do you have a third party API?
      + My College mate is a founder of toolo.in, it's a children's online Library, where the books get delivered at doorstep. She is the co-owner of this company. She told me the App is in MEAN stack, I was curious in full stack web dev from then on, thanks to Per Scholas! I can talk to her about the MERN stack Library App and see how it goes.


+ Wireframe - I will email, it is hand-written

  

