export const fetcher = (url) => fetch(url, {
  headers: {
    'Access-Control-Allow-Origin': 'https://mock-apis-rho.vercel.app'
  }
});