import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { Sequelize } from 'sequelize';

import config from './server-config';
import dbconfig from './db-config';

import IndexRoute from './controllers/index.controller';
import AuthRoute from './controllers/auth.controller';
import PostRoute from './controllers/post.controller';
import BookmarkRoute from './controllers/bookmark.controller';

const app: express.Application = express();
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(dbconfig[env].database, dbconfig[env].username, dbconfig[env].password, dbconfig[env]);

sequelize.sync();

app.use(logger(config.env));
app.disable('x-powered-by');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(config.staticDir));

app.use('/', IndexRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/post', PostRoute);
app.use('/api/bookmark', BookmarkRoute);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/static', express.static(config.fileDir.default));

app.listen(config.port, (): void => {
    console.log(`Listening at http://localhost:${config.port}/`);
});