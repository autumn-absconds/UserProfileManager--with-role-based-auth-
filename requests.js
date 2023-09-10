const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'demoOne',
    }
)

const secret = 'my-secret'



const roles = {
    'admin': ['/'],
    'subadmin': ['/upload'],
    'user': ['/getall'],
};



//login 
const login = (req, res) => {
    const { email, password } = req.body;

    const sql = 'select * from profile1 where  email = ?';
    const values = [email];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                res.send('wrong email');
            } else {
                const hashedpassword = result[0].password;
                const isPasswordCorrect = bcrypt.compare(password, hashedpassword);

                if (isPasswordCorrect) {
                    const role = result[0].role;
                    const name = result[0].name;
                    const routes = roles[role];
                    const token = jwt.sign({ email: email, role: role, routes: routes, name: name }, secret);
                    res.send({
                        token: token,
                        name: name,
                        role: role,
                        routes: routes,
                    })
                } else {
                    res.send('wrong pass');
                }

            }
        }
    })
}

const demoAuth = (req, res, next) => {
    const path = req.route.path;
    console.log(path)
    next();
}


//middleware for token 
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    const path = req.route.path;
    console.log(path);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decodeT = jwt.decode(token);
        const { role, routes } = decodeT;
        console.log(role, routes)

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            // console.log(decoded)
            // if(path === )
            const isPresent = routes.includes(path);
            if (isPresent) {
                next();
            }
            else {
                res.sendStatus(403)
            }
        })
    } else {
        res.sendStatus(401);
    }
}



//protected path 
const protected = (req, res) => {
    // const token = req.headers['Authorization'];
    res.send('ok vro')

}



const getRequest = (req, res) => {

    const sql = 'SELECT * from profile1';
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })


}


// get with id
const getRequestById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * from profile1 where id= ?';
    const values = [id];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
}


// post req.
const postRequest = (req, res) => {
    if (!req.body) {
        res.send('No data received');
        return;
    }

    // const salt = crypto.randomBytes(16);
    // const hashedPass = crypto.pbkdf2Sync(req.body.password, salt, 10, 60, 'sha512');

    const saltRounds = 10;
    const toEncrypt = req.body.password;
    // const hashedPass = bcrypt.hash(toEncrypt,saltRounds)
    // console.log(hashedPass)

    bcrypt.hash(toEncrypt, saltRounds, function (err, hash) {                      //always remeber that bcrypt will work only as functgion not as stated in the above line of code but only like this i think..

        const sql = `INSERT INTO profile1 (name, email, phone, password,role) VALUES(?,?,?,?,?)`;
        const values = [req.body.name, req.body.email, req.body.phone, hash];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Profile created successfully');
            }
        });
    })


}


//   patch req
const patchRequest = (req, res) => {

    const sql = `UPDATE profile1 SET 
    password = 'newPAssword'
    WHERE name = 'dd'`;
    const values = [req.body.password];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Profile updated successfully');
        }
    });
}


//addnumber -enter a new number then add it to all the previous ones and then save that inside the column at last
const addNum = (req, res) => {
    const { num1, num2 } = req.body;

    connection.query('SELECT SUM(num1) AS a,SUM(num2) AS b FROM additions', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const n = result;
            res.send(n)
            const n1 = n[0].a;
            console.log(n1);
            const n2 = n[0].b;
            console.log(n2)

            const sql = 'INSERT INTO additions(num1,num2) values(?,?)';
            values = [n1 + num1, n2 + num2];
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {

                    console.log('-------------------------------------------------------------')
                }
            })
        }
    })

}


// other approach to addnumber using forEach loop........................................
// const addNum = (req, res) => {
//     const { num1, num2 } = req.body;

//     connection.query('SELECT num1,num2 FROM additions', (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             const n = result;
//             res.send(n)

//             let add1 = 0;
//             let add2 = 0;

//             n.forEach(n => {
//                 add1 = add1 + n.num1;
//                 add2 = add2 + n.num2;
//             });
//             console.log(add1)
//             console.log(add2)

//             const sql = 'INSERT INTO additions(num1,num2) values(?,?)';
//             values = [add1 + num1, add2 + num2];
//             connection.query(sql, values, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     // req.send(result)
//                     // res.sendStatus(200);
//                     console.log('-------------------------------------------------------------')
//                 }
//             })
//         }
//     })
// }


//file upload

const uploadFile = async (req, res) => {

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'no t uploaded'
            })
        } else {
            let avatar = req.files.avatar;
            fileName = avatar.name
            avatar.mv('./uploads/' + fileName);
            const filePath = `${fileName}`;
            const sql = 'INSERT INTO filesupload(name,path) VALUES(?,?)'
            const values = [fileName, filePath];
            await connection.query(sql, values);

            res.send({
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            })
        }
    } catch (err) {
        res.sendStatus(500);
    }

}

const readFile = async (req, res) => {

    try {
        const sql = `SELECT * FROM filesupload`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result);
            }
        });

    } catch (err) {
        res.sendStatus(500);
    }

}


const functions = {
    getRequest,
    getRequestById,
    postRequest,
    patchRequest,
    login,
    protected,
    auth,
    addNum,
    uploadFile,
    readFile,
    demoAuth
};

module.exports = functions;




