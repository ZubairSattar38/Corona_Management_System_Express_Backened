module.exports = (sequelize, Sequelize) => {
    const vaccination = sequelize.define('vaccination', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        partially: {
            type: Sequelize.BOOLEAN,
        },
        fully: {
            type: Sequelize.BOOLEAN
        },
        users: [{
            type: Sequelize.INTEGER,
            allowNull: true,
        }]
    })
    return vaccination;
}
// INSERT INTO `rolls`(`firstName`) VALUES ('doctor');
// INSERT INTO `rolls`(`firstName`) VALUES ('doctor');