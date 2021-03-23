# Employee Review Management
Employee performance review management(Partial solution)

# Full Stack Developer Challenge
This is an interview challenge. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
* This is not a pass or fail test, this will serve as a common ground that we can deep dive together into specific issues


# Overview of the project
Minimal prototype version for Employee Performance Review Management.

## Functionalities Implemented
* Add/View/Update/Delete Employee
* Employees List
* Search employee by name
* View reviews of an employee
* Edit individual 

## TODOs
* Login page  for admin and employee
* Assign Employee for review
* List employees for review in the employee view

## Technologies used
This project uses the following technologies:

- [React](https://reactjs.org) for frontend
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MySQL](https://www.mysql.com/) for the database
- [Sequelize](https://sequelize.org) is a promise-based Node.js ORM for MySQL

## Configuration

Make sure to add your own `MYSQL DB CREDENTIALS` of your database in `config/db.config.js`.

```javascript
module.exports = {
    HOST: "YOUR_MYSQL_URI_HERE",
    USER: "YOUR_MYSQL_USERNAME_HERE",
    PASSWORD: "YOUR_MYSQL_PASSWORD_HERE",
    DB: "YOUR_MYSQL_DATABASE_NAME_HERE",
    ...
  };
```


## Quick Start

```javascript
// Install dependencies for client
// in frontend directory
npm install
// Run client 
npm run start

// Install dependencies for server
// in backend directory
npm install
// Run server
npm start

// Server runs on http://localhost:8080 and client on http://localhost:3000
```