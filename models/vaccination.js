module.exports = (sequelize, Sequelize) => {
    const Roll = sequelize.define("vaccination", {
        name: {
            type: Sequelize.STRING,
            unique:true,
            allowNull:false,
        },
        count:{
            type: Sequelize.INTEGER,
            allowNull:true,
            default:0.
        }
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'vaccination',
        timestamps: false,
        underscored: true
    })
    return Roll;
}
// INSERT INTO `rolls`(`firstName`) VALUES ('doctor');
// INSERT INTO `rolls`(`firstName`) VALUES ('doctor');