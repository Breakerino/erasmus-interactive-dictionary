import { isEmpty } from 'lodash';

// Import config
import config from '../Constants';

// Import types
import { CategoryItemProps } from '../interfaces/Types'; 

const CategoryItem = ( {data, termsCount, locale, onSelect}: CategoryItemProps ) => {

    const { image } = data
    const { title } = data?.translations?.[locale] ?? data?.translations.en;

    const getTermsCount = (count: number | undefined) => `${count ? count : 0} ${ count === 1 ? config.getTranslation(config.translations.term, locale)  : config.getTranslation(config.translations.terms, locale) }`;
     
    return (
        <div className="category__item" onClick={onSelect}>
          <div className={`image ${isEmpty(image) ? 'no-image' : 'has-image'}`}>
                {!isEmpty(image) && <img src={config.getImageURL(image)} alt={title} />}
            </div>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="count">{getTermsCount(termsCount)}</span>
            </div>
        </div>
    );

}

export default CategoryItem;
