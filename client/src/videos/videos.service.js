import { schema, normalize } from 'normalizr';

import { http } from '../utils';

const videosSchema = new schema.Entity('videos');

const mapVideoDtoToModel = (videoDto) => {
    return {
        ...videoDto,
        dateCreated: new Date(videoDto.dateCreated),
        dateModified: new Date(videoDto.dateModified),
    };
};

const mapVideoDtosToModel = (videoDtos) => {
    return videoDtos.map((videoDto) => mapVideoDtoToModel(videoDto));
};

const getVideoList$ = () => {
    return http.get$('videos')
        .delay(1000)
        .map((videoDtos) => {
            const videos = mapVideoDtosToModel(videoDtos);
            return normalize(videos, [videosSchema]);
        });
};

const refreshVideoList$ = () => {
    return http.get$('videos/refresh')
        .delay(1000)
        .map((videoDtos) => {
            const videos = mapVideoDtosToModel(videoDtos);
            return normalize(videos, [videosSchema]);
        });
};

const getOneVideo$ = (id) => {
    return http.get$(`videos/${id}`)
        .delay(1000)
        .map((videoDto) => {
            const video = mapVideoDtoToModel(videoDto);
            return normalize(video, videosSchema);
        });
};

export {
    getVideoList$,
    refreshVideoList$,
    getOneVideo$,
};
