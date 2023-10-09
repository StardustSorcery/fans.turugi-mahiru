'use strict';

/**
 * provider-account service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::provider-account.provider-account');
