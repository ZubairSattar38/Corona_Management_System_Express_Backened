const { QueryTypes } = require('sequelize');
const db = require('../models');
const triggers = require('./triggers');
const view = require('./viewTable')
module.exports={
    async getUserRecord(req, res, next) {
        view.doctorView();
        
        await db.sequelize.query(`select * from users where roll = (select id from rolls where roll= '${req.params.type}')`)
            .then(records => {
                console.log("Check Data ", records);
                return res.status(200).json({
                    message: 'Successfully Fetched',
                    records: records,
                    type: req.params.type,
                });
            }).catch((err) => {
                console.log(err);
                next();
            })

    }, 
};