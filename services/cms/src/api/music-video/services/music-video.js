'use strict';

/**
 * music-video service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::music-video.music-video');
