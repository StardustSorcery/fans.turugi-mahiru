import Strapi from 'strapi-sdk-js'

const strapi = new Strapi({
  url: process.env.CMS_URL || 'http://cms:1337/',
  axiosOptions: {
    headers: {
      'Authorization': `Bearer ${process.env.CMS_API_TOKEN || ''}`,
    },
  },
});

export default strapi;
