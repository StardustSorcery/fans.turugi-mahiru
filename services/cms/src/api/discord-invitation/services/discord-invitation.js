'use strict';

/**
 * discord-invitation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::discord-invitation.discord-invitation');
