const express = require('express');
const mysql = require('mysql')
const router = require('./router/router')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const uploadfolder = require('./uploads');


const server = express();
server.use(bodyParser.urlencoded({ extended: true }));               //very imp for post request
server.use(bodyParser.json());

const connection = mysql.createConnection({               // creating connection 
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'UserProfileManager',
});

server.use('/', express.static('./uploads'));                       // making uploads folder available for geting on client side.

server.use(fileUpload({
  createParentPath: true
}))



connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);

    return;
  }

  server.use(router);                                    

  // setTimeout(() => {                                                   //just a test table for before test.
  
  //   connection.query("CREATE TABLE additions ( id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, num1 INT, num2 INT);", function (err) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     else {
  //       console.log('created table')
  //     }
  //   })
  // }, 2000)

  console.log('Connected to MySQL!');
});


server.listen(8000, () => {
  console.log('server started on PORT::8000');
})


