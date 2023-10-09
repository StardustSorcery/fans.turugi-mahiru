'use strict';

/**
 * provided-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::provided-service.provided-service');
