'use strict';

/**
 * provided-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::provided-service.provided-service');
