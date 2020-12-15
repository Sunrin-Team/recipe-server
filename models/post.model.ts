import { Sequelize, DataTypes, Model } from 'sequelize';
import config from '../db-config';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

class PostModel extends Model {}

PostModel.init({
    id:{
        type: DataTypes.INTEGER(),
        allowNull: false,
        unique: true,
    },
    imageUrl:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(1000),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "post"
});

export default PostModel