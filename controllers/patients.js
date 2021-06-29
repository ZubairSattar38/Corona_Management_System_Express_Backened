const { QueryTypes } = require('sequelize');
const db = require('../models');
module.exports = {
    async getPatients(req, res, next) {
        await db.sequelize.query(`select * from users where vaccination_id = ${req.params.type} and roll = (select id from rolls where roll= 'patient')`)
            .then(patient => {
                console.log("Check Data ", patient);
                return res.status(200).json({
                    message: 'Successfully Fetched',
                    patient: patient,
                    type: 'patient',
                });
            }).catch((err) => {
                console.log(err);
                next();
            })
    },
    async deletePatient(req, res, next) {
        console.log("Patient Id  :- ", req.params.email);
        const email = req.params.email;
        const vaccId = await db.sequelize.query(`select vaccination_id from users where email='${email}'`);
        var vaccData = vaccId[0][0].vaccination_id;
        console.log(vaccData);
        await db.sequelize.query(`UPDATE vaccination SET count = count - 1 where id =${vaccData}`, { type: QueryTypes.UPDATE })
        await db.sequelize.query(`DELETE FROM users WHERE email = '${email}'`)
            .then(patient => {
                console.log("Successfulyy Deleted");
                return res.status(200).json({
                    message: "Successfully Deleted",
                    patient: true,
                })
            }).catch((err) => {
                console.log(err);
                next();
            })
    },
    async updateVaccinatedPatient(req, res, next) {
        console.log(req.body);
        const { email, first_Name, last_Name, vaccName, type } = req.body;
        const vaccId = await db.sequelize.query(`select id from vaccination where name='${vaccName}'`);
        var vaccData = vaccId[0][0].id
        await db.sequelize.query(`UPDATE vaccination SET count = count + 1 where id =${vaccData}`, { type: QueryTypes.UPDATE })
        await db.sequelize.query(`UPDATE vaccination SET count = count - 1 where id =${type}`, { type: QueryTypes.UPDATE })
        await db.sequelize.query(`update users set vaccination_id = ${vaccData} where email = '${email}'`)
            .then(updated => {
                console.log("Successfuly Updated");
                return res.status(200).json({
                    message: "Successfully Updated",
                    updatePatien: true,
                })
            }).catch((err) => {
                console.log(err);
                next();
            })
    }
}