'use strict';

/**
 * news-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-tag.news-tag');
