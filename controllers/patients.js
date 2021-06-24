const { QueryTypes } = require('sequelize');
const db = require('../models');
module.exports={
    async getPatients(req, res, next) {
        console.log("Name Data ",req.params.type);
        await db.sequelize.query(`select * from users where vaccination IS ${req.params.type} and roll = (select id from rolls where roll= 'patient')`)
        .then(patient => {
            return res.status(200).json({
                message:'Successfully Fetched',
                patient: patient,
                type:'patient',
            });
        }).catch((err)=>{
            console.log(err);
            next();
        })
    },
    async deletePatient(req,res,next){
        console.log("Patient Id  :- ",req.params.email);
        const email = req.params.email;
        console.log("Email Data ",email);
        await db.sequelize.query(`DELETE FROM users WHERE email = '${email}'`)
        .then(patient =>{
            console.log("Successfulyy Executed");
            return res.status(200).json({
                message:"Successfully Deleted",
                patient:true,
            })
        }).catch((err)=>{
            console.log(err);
            next();
        })
    }
}