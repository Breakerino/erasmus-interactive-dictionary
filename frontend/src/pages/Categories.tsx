import React from 'react';

// Import config
import config from '../Constants';

// Import types
import { Category, TranslationsData } from '../interfaces/Types';

// Import components
import { isArray } from 'lodash';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { CSSTransition } from 'react-transition-group';
import CategoryItem from '../components/CategoryItem';
import Loader from '../components/Loader';
import { useAppContext } from '../contexts/AppContext';
import { getCategories } from '../queries';

const Categories = () => {

	const { store: { locale }, actions: { setHeaderTitle, navigate } } = useAppContext();
	const { data: categories, isFetching }: { data?: { id: number, image: any, termsCount: number, translations: TranslationsData<Omit<Category, 'image'>> }, isFetching: boolean } = useQuery(['categories'], () => getCategories(), { keepPreviousData: true });

	React.useEffect(() => {
		setHeaderTitle(config.getTranslation(config.translations.categories, locale));
	}, [locale])

	return (<>
		<Helmet>
			<title>{config.getTranslation(config.translations.categories, locale)} | {config.meta.title}</title>
			<meta property="og:title" content={`${config.getTranslation(config.translations.categories, locale)} | ${config.meta.title}`} />
		</Helmet>
		<Loader loading={isFetching} />
		<div className="categories__wrapper">
			{(isArray(categories) && categories ? categories : []).map((category, index: number) => (
				<CSSTransition key={`cat_${index}`} in={true} appear={true} timeout={config.animationDelay * index} classNames="item">
					<CategoryItem locale={locale} data={category} termsCount={category.termsCount} onSelect={() => {
						setHeaderTitle((category.translations?.[locale] ?? category.translations.en).title);
						navigate.to(`/category/${category.id}`)
					}} />
				</CSSTransition>
			))}

		</div>

	</>);

}

export default Categories;