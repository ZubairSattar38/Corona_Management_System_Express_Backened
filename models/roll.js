module.exports = (sequelize, Sequelize) => {
    const Roll = sequelize.define("roll", {
        roll: {
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
        tableName: 'rolls',
        timestamps: false,
        underscored: true
    })
    return Roll;
}