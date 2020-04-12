const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getImageSrcString = query => query && BASE_URL + query;

export default getImageSrcString;
