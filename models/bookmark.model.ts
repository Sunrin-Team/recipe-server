import { Sequelize, DataTypes, Model } from 'sequelize';
import config from '../db-config';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

class BookmarkModel extends Model {}

BookmarkModel.init({
    id:{
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "bookmark",
    timestamps: false
});

export default BookmarkModel