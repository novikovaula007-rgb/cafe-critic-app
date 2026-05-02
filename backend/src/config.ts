import 'dotenv/config';
import path from 'path';

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: 'mongodb://localhost/cafe-critic',
    refreshJWTSecret: process.env.REFRESH_SECRET_JWT ?? 'secret',
    accessJWTSecret: process.env.ACCESS_SECRET_JWT ?? 'secret',
};

export default config;