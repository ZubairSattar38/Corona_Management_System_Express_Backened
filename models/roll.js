module.exports = (sequelize, Sequelize) => {
    const Roll = sequelize.define("roll", {
        roll: {
            type: Sequelize.STRING,
            unique:true,
            allowNull:false,
        },
    })
    return Roll;
}