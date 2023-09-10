const functions = require('../requests.js')
const express = require('express')
const router = express.Router();


router.post('/upload',functions.uploadFile)
router.get('/readFile',functions.readFile)


router.post('/login',functions.login);

router.get('/protected',functions.auth, functions.protected);

router.get('/getall',functions.auth, functions.getRequest);
router.get('/getall/:id', functions.getRequestById);
router.post('/insert', functions.postRequest);
router.patch('/update', functions.patchRequest);

//number table
router.post('/add',functions.addNum)

module.exports = router;