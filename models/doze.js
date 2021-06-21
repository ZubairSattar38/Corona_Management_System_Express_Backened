module.exports = (sequelize, Sequelize) => {
    const doze = sequelize.define('doze',{
        name:{
            type:Sequelize.STRING,
            unique:true,
            allowNull:false,
        },
        no_of_dozes:{
            type:Sequelize.INTEGER,
        },
        users: [{
            type: Sequelize.INTEGER,
            allowNull: true,
        }]
    })
    return doze;
}