import { isEmpty, isUndefined } from 'lodash';
import React, { useRef, useEffect } from 'react';

// Import config
import config from '../Constants';

// Import types
import { ExampleItemInterface } from '../interfaces/Types';

const ExampleItem = ({ data, isActive, selectExample, setExampleRefIfActive }: ExampleItemInterface) => {

    const { image }: { image: string } = data

    const exampleItemRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        isActive && setExampleRefIfActive(exampleItemRef);
    }, [isActive])

    const classNames: String[] = ['example__item'];

    isActive && classNames.push('active');

    return (
        <div className={classNames.join(' ')} onClick={() => selectExample(data, exampleItemRef)} ref={exampleItemRef}>
            {!isUndefined(data?.origin) && !isEmpty(data?.origin) &&
                <div className="country-flag__wrapper">
                    {config.getFlag(data.origin)}
                </div>
            }
            <div className={`image ${isEmpty(image) ? 'no-image' : 'has-image'}`}>
                {!isEmpty(image) && <img src={config.getImageURL(image)} alt={data.title} />}
            </div>
            <div className="content">
                <h1 className="title"><span>{data.title}</span></h1>
            </div>
        </div>
    );

}

export default ExampleItem; 