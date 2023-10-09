'use strict';

/**
 * recommendation-provisional-voting service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recommendation-provisional-voting.recommendation-provisional-voting');
