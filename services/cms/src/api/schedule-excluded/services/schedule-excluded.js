'use strict';

/**
 * schedule-excluded service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::schedule-excluded.schedule-excluded');
