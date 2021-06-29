var express = require('express');
const authController = require('../controllers/authentication');
const doctController = require('../controllers/doctor');
const patController = require('../controllers/patients');
const userController = require('../controllers/user');
const dozeController = require('../controllers/doze');
const jwtVerify = require('../controllers/authenticateToken');
var router = express.Router();


router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/addDoctor',doctController.addDoctor);
//router.get('/getPatients/:type',patController.getPatients);
// router.get('/getPatient/:type',jwtVerify.authenticateToken,patController.getPatients);


//              Patient
router.get('/getPatient/:type',patController.getPatients);
router.delete('/deletePatient/:email',patController.deletePatient);
router.post('/updatePatient',patController.updateVaccinatedPatient);

//              Doctor
router.get('/getDoctor/:type',doctController.getDoctors);
router.delete('/deleteDoctor/:email',doctController.deleteDoctor);
router.post('/updateDoctor',doctController.updateVaccinatedDoctors);


//              User
router.get('/getUserRecord/:type',userController.getUserRecord);


//              Doze
router.post('/AddDoze',dozeController.addDoze);
router.get('/getDozeRecord',dozeController.getDozes);
router.delete('/deleteDoze/:email',dozeController.deleteDoze);
module.exports = router;
