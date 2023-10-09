'use strict';

/**
 * recommendation-voting service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recommendation-voting.recommendation-voting');
