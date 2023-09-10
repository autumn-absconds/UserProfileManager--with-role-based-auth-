const express = require('express');
const mysql = require('mysql')
const router = require('./router/router')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const uploadfolder = require('./uploads');


const server = express();
server.use(bodyParser.urlencoded({ extended: true }));               //very imp for post request
server.use(bodyParser.json());


server.use('/', express.static('./uploads'));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'demoOne',
});

server.use(fileUpload({
  createParentPath: true
}))


// const createTable = () => {
//   connection.query("CREATE table addNum(id INT NOT NULL primary key auto_increment,num1 int,num2 int", function (err) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       console.log('created table')
//     }
//   })

// }

// const insertData = () => {
//   connection.query("insert into add(num1,num2) values(3,3)", function (err) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       console.log('data entered in table')
//     }
//   })
// }


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);

    return;
  }

  server.use(router);

  // setTimeout(() => {
  //   connection.query("CREATE TABLE additions ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, num1 INT, num2 INT);", function (err) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     else {
  //       console.log('created table')
  //     }
  //   })
  // }, 2000)



  // connection.query("INSERT INTO additions(num1,num2) values(3,3)", function (err) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   else {
  //     console.log('data entered in table')
  //   }
  // })
  console.log('Connected to MySQL!');




});





server.listen(8000, () => {
  console.log('server started');
})


