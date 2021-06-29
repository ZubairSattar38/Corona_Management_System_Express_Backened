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
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique:true,
            required:true,
            isEmail: true,
        },
        qualification: {
            type: Sequelize.STRING,
        },
        contactNo: {
            type: Sequelize.STRING
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
        vaccination_id:{
            type: Sequelize.INTEGER,
            default:1,
            ref:"vaccination"
        },
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'users',
        timestamps: false,
        underscored: true
    },
    )
    return User;
}