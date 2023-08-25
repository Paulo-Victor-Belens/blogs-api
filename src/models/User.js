const UserSchema = (sequelize, DataTypes) => { 
    const UserTable = sequelize.define('User', {
        id: DataTypes.INTEGER,
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        tableName: 'users',
        timestamps: false,
        underscored: true,
    });
    return UserTable;
}

module.exports = UserSchema;