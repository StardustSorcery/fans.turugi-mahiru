import strapi from '@/app/api/_libs/strapi';
import type {
  Terms,
  StrapiResponseData,
} from '@/types/strapi';

export default async function getTerms(): Promise<{ data: StrapiResponseData<Terms> | null; error: any; }> {
  try {
  const terms = await strapi
    .find<StrapiResponseData<Terms>>('term')
    .then((res) => {
      return res.data;
    });

    return {
      data: terms,
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
