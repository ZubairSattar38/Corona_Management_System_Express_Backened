// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { QueryTypes } = require('sequelize');
const db = require('../models');
const hashPassword = require('./hashPassword');
const jwt = require('json-web-token');
const token = require('./authenticateToken');
module.exports = {
    async register(req, res, next) {
        if (!req.body) {
            next();
        }
        const { firstName, lastName, password, email,age } = req.body;
        let pass = await hashPassword.hashPassword(password);
        const rollId = await db.sequelize.query(`select id from rolls where roll = 'patient'`);
        const vaccId = await db.sequelize.query(`select id from vaccination where name = 'non_vaccinated'`);
        var rollData =rollId[0][0].id
        var vaccData =vaccId[0][0].id
        await db.sequelize.query(`INSERT INTO users(first_name,last_name, password, email,roll,vaccination_id,age) VALUES ('${firstName}','${lastName}','${pass}','${email}','${rollData}','${vaccData}',${age})`, { type: QueryTypes.INSERT })
            .then(async (users) => {
                console.log(users)
                if (users) {
                    await db.sequelize.query(`UPDATE rolls SET count = count + 1 where id =${rollData}`, { type: QueryTypes.UPDATE })
                    await db.sequelize.query(`UPDATE vaccination SET count = count + 1 where id =${vaccData}`, { type: QueryTypes.UPDATE })
                    const accessToken = await token.generateAccessToken(email);
                    return res.status(200).json({
                        message: 'Successfully Created',
                        email: email,
                        token: accessToken,
                        name: firstName+' '+lastName,
                        isToken:true,
                        roll:'patient',
                    });
                } else {
                    return res.status(400).json('Error in insert new record');
                }
            }).catch(err => {
                console.log(err);
                next();
            })
    },
    async login(req, res, next) {
        console.log(req.body);
        if (!req.body) {
            next();
        }
        const { email, password } = req.body;
        await db.sequelize.query(`Select r.roll,u.email,u.password ,u.first_name,u.last_name from users  as u inner join rolls as r on u.roll =  r.id where email = '${email}' `, { type: QueryTypes.SELECT })
            .then(async (users) => {
                console.log("Roll Data ",users);

                if (users) {
                    bcrypt.compare(password, users[0].password, async function (err, result) {
                        if (result) {
                            const accessToken = await token.generateAccessToken(email);
                            return res.status(200).json({
                                message: 'Successfully Login',
                                email: users[0].email,
                                roll: users[0].roll,
                                name: users[0].first_name+' '+users[0].last_name,
                                isToken:true,
                                token: accessToken
                            });
                        } else {
                            return res.json({
                                message: 'Login Error! Invalid Password',
                            });
                            next();
                        }
                    });
                }
            }).catch(err => {
                return res.json({
                    message: 'Login Error! Invalid Email',
                });
                console.log(err);
                next();
            })
    },
    async updateUserData(req,res,next){
        console.log(req.body);
        const {phone,age,city,isVaccinated,roll} = req.body;
    }

}
