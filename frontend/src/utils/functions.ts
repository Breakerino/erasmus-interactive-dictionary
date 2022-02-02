import { isArray } from 'lodash';

export const getTermData = ({id, title, description, origin, examples}: any) => ({
  id,
  title,
  description,
  origin,
  examples: isArray(examples) ? examples.map((example) => ({...example, image: getEntityImageURL({data: example.image})})) : [],
  // examples: isArray(examples) ? examples.map((example) => ({...example, image: example.image?.formats?.small?.url ?? example.image?.formats?.thubmnail?.url})) : [],
  //image: image?.formats?.small?.url ?? image?.formats?.thumbnail?.url
}) 

export const getCategoryData = ({id, title, description}: any) => ({
  id,
  title,
  description,
}) 

export const getEntityImageURL = (image: any) => {
  if ( ! image?.data?.formats ) return '';

  const {thumbnail, small, medium, large}: any = image.data.formats;
	
  return (small ?? medium ?? large ?? thumbnail)?.url ?? '';
}