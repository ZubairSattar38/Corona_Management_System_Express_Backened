var express = require('express');
const authController = require('../controllers/authentication');
const doctController = require('../controllers/doctor');
const patController = require('../controllers/patients');
const jwtVerify = require('../controllers/authenticateToken');
var router = express.Router();


router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/addDoctor',doctController.addDoctor);
//router.get('/getPatients/:type',patController.getPatients);
// router.get('/getPatient/:type',jwtVerify.authenticateToken,patController.getPatients);

router.get('/getPatient/:type',patController.getPatients);
router.delete('/deletePatient/:email',patController.deletePatient);
module.exports = router;
