import React from 'react';

import { Videos } from './Videos';
import { Video } from './Video';

const prefix = 'vod/router/videos/';

export const routesKeys = {
    home: `${prefix}HOME`,
    video: `${prefix}VIDEO`,
};

export const routesMap = { 
    [routesKeys.home]: { path: '/', title: 'Home' }, 
    [routesKeys.video]: { path: '/video/:id', title: 'Play', theme: 'dark' }, 
};

export const routeSwitcher = (key) => {
    switch (key) {
        case routesKeys.home: {
            return <Videos />;
        }
        case routesKeys.video: {
            return <Video />;
        }
        default: {
            return null;
        }
    }
}
