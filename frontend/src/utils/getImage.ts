import CONTENT_PLACEHOLDER from './../../public/content_pl.png';

export const getImage = (image: string | null) => {
  if (image && (image.includes('uploads') || image.includes('fixtures')))
    return `http://localhost:8000/${image}`;
  return CONTENT_PLACEHOLDER;
};
