import strapi from '@/app/_libs/strapi';
import type {
  Privacy,
  StrapiResponseData,
} from '@/types/strapi';

export default async function getPrivacy(): Promise<{ data: StrapiResponseData<Privacy> | null; error: any; }> {
  try {
    const privacy = await strapi
      .find<StrapiResponseData<Privacy>>('privacy')
      .then((res) => {
        return res.data;
      });

    return {
      data: privacy,
      error: null,
    };
  }
  catch(err) {
    return {
      data: null,
      error: err,
    };
  }
}
