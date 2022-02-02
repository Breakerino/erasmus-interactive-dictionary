import { isEmpty, isUndefined } from 'lodash';

// Import config
import config from '../Constants';

// Import types
import { TermItemInterface } from '../interfaces/Types'; 

const TermItem = ({data: {title, description, image, origin}, onSelect}: TermItemInterface ) => {
    return (
        <div className="term__item" onClick={() => onSelect()}>
            {! isUndefined(origin) && ! isEmpty(origin) &&
                <div className="country-flag__wrapper">
                    {config.getFlag(origin)}
                </div>
            }
            <div className={`image ${isEmpty(image) ? 'no-image' : 'has-image'}`}>
                {image &&<img src={config.getImageURL(image)} alt={title} />}
            </div>
            <div className="content">
                <h1 className="title"><span>{title}</span></h1>
                <p className="description">{config.truncate(description)}</p>
            </div>
        </div>
    );

}

export default TermItem;
