const hashPassword = require('./hashPassword');
const db = require('../models');
const { QueryTypes } = require('sequelize');

module.exports = {
    async addDoctor(req, res, next) {
        console.log("req.body ", req.body);
        if (!req.body) {
            next();
        }
        const { firstName, lastName, password, email,phoneNumber,qualification,contactNo,city,age} = req.body;
        let pass = await hashPassword.hashPassword(password);
        console.log(pass);
        const rollId = await db.sequelize.query(`select id from rolls where roll = 'doctor'`);
        var rollData = rollId[0][0].id
        await db.sequelize.query(`INSERT INTO users(first_name,last_name, password, email,roll,phone_number,qualification,contact_no,city,age) VALUES ('${firstName}','${lastName}','${pass}','${email}','${rollData}','${phoneNumber}','${qualification}','${contactNo}','${city}','${age}')`, { type: QueryTypes.INSERT })
            .then(async (users) => {
                console.log(users)
                if (users) {
                    await db.sequelize.query(`UPDATE rolls SET count = count + 1 where id =${rollData}`, { type: QueryTypes.UPDATE })
                    return res.status(200).json({
                        message: 'Successfully Inserted',
                    });
                } else {
                    return res.status(400).json('Error in insert new record');
                }
            }).catch(err => {
                console.log(err);
                next();
            })
    },
    async getDoctors(req, res, next) {
        console.log("Doctor id :- ",req.params.type);
        await db.sequelize.query(`select * from users where vaccination_id = ${req.params.type} and roll = (select id from rolls where roll= 'doctor')`)
            .then(doctor => {
                console.log("Check Data ", doctor);
                return res.status(200).json({
                    message: 'Successfully Fetched',
                    doctor: doctor,
                    type: 'doctor',
                });
            }).catch((err) => {
                console.log(err);
                next();
            })

    },
    async deleteDoctor(req, res, next) {
        console.log("doctor Id  :- ", req.params.email);
        const email = req.params.email;
        const vaccId = await db.sequelize.query(`select vaccination_id from users where email='${email}'`);
        var vaccData = vaccId[0][0].vaccination_id;
        console.log(vaccData);
        await db.sequelize.query(`UPDATE vaccination SET count = count - 1 where id =${vaccData}`, { type: QueryTypes.UPDATE})
        await db.sequelize.query(`DELETE FROM users WHERE email = '${email}'`)
            .then(doctor => {
                console.log("Successfulyy Deleted");
                return res.status(200).json({
                    message: "Successfully Deleted",
                    doctor: true,
                })
            }).catch((err) => {
                console.log(err);
                next();
            })
    },
    async updateVaccinatedDoctors(req, res, next) {
        console.log(req.body);
        const { email, first_Name, last_Name, vaccName, type } = req.body;
        const vaccId = await db.sequelize.query(`select id from vaccination where name='${vaccName}'`);
        var vaccData = vaccId[0][0].id
        await db.sequelize.query(`UPDATE vaccination SET count = count + 1 where id =${vaccData}`, { type: QueryTypes.UPDATE })
        await db.sequelize.query(`UPDATE vaccination SET count = count - 1 where id =${type}`, { type: QueryTypes.UPDATE })
        await db.sequelize.query(`update users set vaccination_id = ${vaccData} where email = '${email}'`)
            .then(updated => {
                console.log("Successfully Updated");
                return res.status(200).json({
                    message: "Successfully Updated",
                    updateDoctor: true,
                })
            }).catch((err) => {
                console.log(err);
                next();
            })
    }
}