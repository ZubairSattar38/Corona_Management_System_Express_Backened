module.exports = (sequelize, Sequelize) => {
    const doze = sequelize.define('doze',{
        name:{
            type:Sequelize.STRING,
            notNull: true,
            unique:true,
        },
        no_of_dozes:{
            type:Sequelize.INTEGER,
            min:0,
        },
    },{
        sequelize,
        freezeTableName: true,
        tableName: 'doze',
        timestamps: false,
        underscored: true
    })
    return doze;
}