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
        console.log("req.body ",req.body);
        if (!req.body) {
            next();
        }
        const { firstName, lastName, password, email } = req.body;
        let pass = await hashPassword.hashPassword(password);
        console.log(pass);
        const rollId = await db.sequelize.query(`select id from rolls where roll = 'patient'`);
        var rollData =rollId[0][0].id

        await db.sequelize.query(`INSERT INTO users(firstName,lastName, password, email,roll) VALUES ('${firstName}','${lastName}','${pass}','${email}','${rollData}')`, { type: QueryTypes.INSERT })
            .then(async (users) => {
                console.log(users)
                if (users) {
                    const accessToken = await token.generateAccessToken(email);
                    return res.status(200).json({
                        message: 'Successfully Created',
                        email: email,
                        token: accessToken,
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
        await db.sequelize.query(`Select r.roll,u.email,u.password from users  as u inner join rolls as r on u.roll =  r.id where email = '${email}' `, { type: QueryTypes.SELECT })
            .then(async (users) => {
                if (users) {
                    console.log("User data ",users);
                    bcrypt.compare(password, users[0].password, async function (err, result) {
                        if (result) {
                            const accessToken = await token.generateAccessToken(email);
                            return res.status(200).json({
                                message: 'Successfully Login',
                                email: users.email,
                                roll: users.roll,
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