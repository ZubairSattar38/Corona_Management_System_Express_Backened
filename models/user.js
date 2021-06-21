module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            unique:true,
            required:true,
        },
        qualification: {
            type: Sequelize.INTEGER,
        },
        contactNo: {
            type: Sequelize.INTEGER
        },
        age: {
            type: Sequelize.INTEGER,
        },
        city: {
            type: Sequelize.STRING
        },
        roll: {
            type: Sequelize.INTEGER,
            ref: "roll",
        },
        doze:{
            type: Sequelize.INTEGER,
            ref: "doze",
        },
        vaccination:{
            type: Sequelize.INTEGER,
            ref:"vaccination"
        }
    })
    return User;
}