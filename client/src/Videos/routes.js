const routerPrefix = '[ROUTER]';
const featurePrefix = '[VIDEOS]';
const prefix = `${routerPrefix}${featurePrefix}`;

export const routesKeys = {
    home: `${prefix}HOME`,
    video: `${prefix}VIDEO`,
};

export const routesMap = { 
    [routesKeys.home]: '/', 
    [routesKeys.video]: '/video/:id', 
};
