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
        await db.sequelize.query(`INSERT INTO users(firstName,lastName, password, email,roll,phoneNumber,qualification,contactNo,city,age) VALUES ('${firstName}','${lastName}','${pass}','${email}','${rollData}','${phoneNumber}','${qualification}','${contactNo}','${city}','${age}')`, { type: QueryTypes.INSERT })
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
}