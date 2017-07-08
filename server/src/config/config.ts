import { config as dotenvConfig } from 'dotenv';

const env = dotenvConfig();

const production = process.env.NODE_ENV === 'production';
const dirs = (process.env.APP_VIDEO_DIRS || '').split(',').map((dir: string) => dir.trim());

const config = {
    production,
    dirs,
};

if (!config.production) {
    console.log(config);
}

export { config };
