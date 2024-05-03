import { fetcher } from '@/utils/fetcher';

const url = 'https://mock-apis-rho.vercel.app/api/words-generator/sports';

export const getLocations = async (key) => {
  try {
    const result = await fetcher(url);
    return result;
  } catch (e) {
    console.log('error');
    return false;
  }
};