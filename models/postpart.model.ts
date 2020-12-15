import { Sequelize, DataTypes, Model } from 'sequelize';
import config from '../db-config';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

class PostPartModel extends Model {}

PostPartModel.init({
    id:{
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    image:{
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    text:{
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    partNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "postpart",
    timestamps: false
});

export default PostPartModel