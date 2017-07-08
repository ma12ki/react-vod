import { config as dotenvConfig } from 'dotenv';

const env = dotenvConfig();

console.log(env);

const production = process.env.NODE_ENV === 'production';
const dirs = process.env.APP_VIDEO_DIRS.split(',').map((dir: string) => dir.trim());

const config = {
  get production() {
      return production;
  },
  get dirs() {
    return dirs;
  },
};

export { config };
