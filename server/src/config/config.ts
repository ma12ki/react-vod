import { accessSync } from 'fs';
import { resolve } from 'path';
import { config as dotenvConfig } from 'dotenv';

try {
    accessSync(resolve(__dirname, '..', '.env'));
    const env = dotenvConfig();
} catch (e) {
    console.warn(`Warning: loading .env failed: ${e}`);
}

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
