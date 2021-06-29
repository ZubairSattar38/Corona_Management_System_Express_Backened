const db = require('../models');
const { QueryTypes } = require('sequelize');
module.exports = {
    async addDoze(req, res, next) {
        if (!req.body) {
            next();
        }
        const { name, quantity } = req.body;
        
        await db.sequelize.query(`Select name from doze where name = '${name}'`, { type: QueryTypes.SELECT })
            .then(async (doze) => {
                if (doze.length > 0) {
                    return res.status(200).json({
                        message: 'Already Exist',
                    });
                } else {
                    await db.sequelize.query(`INSERT INTO doze(name,no_of_dozes) VALUES ('${name}','${quantity>0?quantity:0}')`, { type: QueryTypes.INSERT })
                        .then(async (data) => {
                            return res.status(200).json({
                                message: 'Data Inserted',
                                doze:true
                            });
                        }).catch(err => {
                            console.log(err);
                            next();
                        })

                }
            }).catch(err => {
                console.log(err);
                next();
            })
    },
    async getDozes(req, res, next) {
        await db.sequelize.query(`select * from doze`)
        .then(records => {
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
    async deleteDoze(req, res, next) {
        
        console.log("doctor Id  :- ", req.params.email);
        const name = req.params.email;
        await db.sequelize.query(`DELETE FROM doze WHERE name = '${req.params.email}'`)
            .then(async doctor => {
                await db.sequelize.query(`UPDATE doze SET no_of_dozes = no_of_dozes - 1 where name = '${name}'`, { type: QueryTypes.UPDATE})

                console.log("Successfulyy Deleted");
                return res.status(200).json({
                    message: "Successfully Deleted",
                    doze: true,
                })
            }).catch((err) => {
                console.log(err);
                next();
            })
    },
}




