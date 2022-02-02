import Axios from 'axios';
import { Category, CategoryTranslations, Locale, Term, TranslationsData } from '../interfaces/Types';
import { getTermData, getEntityImageURL, getCategoryData } from '../utils/functions';

export interface QueryProps {
	type: string,
	isInfinite?: boolean
	args: Record<string, any>,
	options?: Record<string, any>
}

const api = Axios.create({
	// @ts-ignore
	baseURL: import.meta.env.BRK_API_BASE_URL
});

export const getCategories = async (): Promise<CategoryTranslations[]> => {
	let items: any[] = [];

	try {
		const { data: response } = await api.get(`api/categories?populate=*`);
		
		items = response.data.map(({ localizations, terms, locale, id, image, ...parentData }: any): {id: number, image: any, termsCount: number, translations: TranslationsData<Omit<Category, 'image'>>} => ({
			id,
			termsCount: terms.data.length,
			image: getEntityImageURL(image),
			translations: {
				en: getCategoryData({...parentData, id}),
				...Object.fromEntries(
					localizations?.data?.map(({ locale, ...data }: { locale: any }) => [locale, getCategoryData(data)])
				)
			}
		}));
		
	} catch (error) {
		console.log(error);
	} finally {
		return items;
	}

};

export const getTerms = async ({ category: categoryID }: { locale?: Locale, category?: string }): Promise<{
	items: Term[],
	category: any // 
}> => {
	let items: any[] = [];

	let category: any = {
		id: categoryID
	};

	try {
		const { data: response } = await api.get(`api/terms?category=${categoryID}`);

		const { id: parentCategoryID, localizations: categoryLocalizations, ...parentCategoryData } = response.meta.category;

		category = {
			id: parentCategoryID,
			translations: {
				en: getTermData({...parentCategoryData, id: parentCategoryID}),
				...Object.fromEntries(
					categoryLocalizations.map(({ locale, title }: { locale: any, title: string }) => [locale, {title}])
				)
			}
		};
		items = response.data.map(({ localizations, origin, locale, id, image, ...parentData }: any): {id: number, image: any, origin?: string, translations: TranslationsData<Omit<Term, 'image'|'origin'>>} => ({
			id,
			origin,
			image: getEntityImageURL({data: image}),
			translations: {
				en: getTermData({...parentData, id}),
				...Object.fromEntries(
					localizations?.map(({ locale, ...data }: { locale: any }) => [locale, getTermData(data)])
				)
			}
		}));
	} catch (error) {
		console.log(error);
	} finally {
		return {
			category: category,
			items
		};
	}

};

export const handleQuery = ({ type, args = {} }: QueryProps): any => ({
	'categories': () => getCategories(),
	'terms': () => getTerms(args),
}[type]);