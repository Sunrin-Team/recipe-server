import { Sequelize, DataTypes, Model } from 'sequelize';
import config from '../db-config';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    nickname:{
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: false
});

export default UserModel