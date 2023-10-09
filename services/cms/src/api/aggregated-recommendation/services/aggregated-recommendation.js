'use strict';

/**
 * aggregated-recommendation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::aggregated-recommendation.aggregated-recommendation');
