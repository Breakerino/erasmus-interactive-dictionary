import React, { MutableRefObject, useState } from 'react';

// Import config
import config from '../Constants';

// Import types
import { ModalInterface, Term } from '../interfaces/Types';

// Import components
import LanguageSwitcher from './LanguageSwitcher';
import ExamplesList from '../containers/ExamplesList';
import { isEmpty, isUndefined } from 'lodash';
import { useAppContext } from '../contexts/AppContext';

const Modal = ({ terms, activeTermID, onModalClose, onTermChange }: ModalInterface) => {

    // Manage active example 
    const [activeExample, setActiveExample] = useState<Term | undefined>(undefined);
    const [activeExampleRef, setActiveExampleRef] = useState<MutableRefObject<HTMLDivElement> | undefined>(undefined);

    const { store: { locale } } = useAppContext();

    const activeTerm = React.useMemo(() => {
        const activeTermData = terms.find(({ id }) => id === activeTermID)

        if (!activeTermData) return null;

        const { translations, ...data } = activeTermData;
        
        return {
            ...(translations?.[locale] ?? translations?.en),
            ...data,
            examples: ! isEmpty( translations?.[locale]?.examples ) ? translations?.[locale]?.examples : translations?.en?.examples
        }
    }, [activeTermID, locale, terms]);
		
		React.useEffect(() => {
			setActiveExample(undefined);
			setActiveExampleRef(undefined);
			document.querySelector('.examples__wrapper')?.scrollTo({top: 0, left: 0, behavior: 'smooth'});
		}, [locale])

    // Don's show modal if it is not opened 
    if (!activeTermID || !activeTerm) return null;

    const handleSelectExample = (selectedExample: Term | undefined, selectedExampleRef: MutableRefObject<HTMLDivElement> | undefined = undefined) => {

        const exampleRef = selectedExampleRef ?? activeExampleRef;
        let containerOffset = 0;

        if ( activeTerm?.examples && exampleRef && selectedExample && exampleRef.current?.parentElement ) {
            const selectedExampleIndex = activeTerm?.examples.findIndex(({ id }) => id === selectedExample.id);
            const { offsetWidth: cardWidth } = exampleRef.current;

            containerOffset = cardWidth * selectedExampleIndex;
        }
        
        if ( exampleRef?.current?.parentElement ) {
            exampleRef.current.parentElement.scrollTo({top: 0, left: containerOffset, behavior: 'smooth'});
        }

        setActiveExample(selectedExample);

    }

    const handleChangeTerm = (direction: 'prev' | 'next') => {

        if (!isUndefined(activeTerm.examples) && ! isEmpty(activeTerm.examples)) {

            if (activeExample) {

                const actions = { prev: -1, next: 1 };

                let currentIndex = activeTerm?.examples.findIndex(({ id }) => id === activeExample.id);
                let nextIndex = currentIndex + actions[direction];

                if (nextIndex > (activeTerm?.examples.length - 1)) {
                    handleSelectExample(undefined);
                    onTermChange(direction);
                } else if (nextIndex < 0) {
                    handleSelectExample(activeTerm?.examples[nextIndex]);
                } else {
                    handleSelectExample(activeTerm?.examples[nextIndex]);
                }


            } else {

                if (direction === 'next') {
                    handleSelectExample(activeTerm?.examples[0]);
                } else {
                    onTermChange(direction);
                }


            }

        } else {
            onTermChange(direction);
        }

    }

    return (
        <div className="modal__container" onClick={(e) => e.currentTarget === e.target && onModalClose()}>
            <div className="modal__wrapper">
                <div className="modal__navigation">
                    <span className="button-nav prev" onClick={() => handleChangeTerm('prev')}><img src={config.icon.button.nav} alt={'icon-nav-prev'} /></span>
                    <span className="button-nav next" onClick={() => handleChangeTerm('next')}><img src={config.icon.button.nav} alt={'icon-nav-next'} /></span>
                </div>
                <div className={`image ${isEmpty(activeExample?.image ?? activeTerm.image) ? 'no-image' : 'has-image'}`}>
                    {!isUndefined(activeTerm.origin) && !isEmpty(activeTerm.origin) &&
                        <div className="country-flag__wrapper">
                            {config.getFlag(activeTerm.origin)}
                        </div>
                    }
                    {!isEmpty(activeExample?.image ?? activeTerm.image) && <img src={config.getImageURL(activeExample?.image ?? activeTerm.image)} alt={activeExample?.title ?? activeTerm.title} />}
                </div>
                <div className="content">
                    <header>
                        <LanguageSwitcher />
                        <span className="button-close" onClick={() => onModalClose()}><img src={config.icon.button.close} alt={'icon-close'} /></span>
                    </header>
                    <div className="main">
                        <h1 className="title"><span>{activeExample?.title ?? activeTerm.title}</span></h1>
                        <p className="description">{activeExample?.description ?? activeTerm.description}</p>
                    </div>
                    {activeTerm?.examples &&
                        <ExamplesList
                            examples={activeTerm.examples}
                            activeExample={activeExample}
                            activeExampleRef={(exampleRef: MutableRefObject<HTMLDivElement> | undefined) => setActiveExampleRef(exampleRef)}
                            selectExample={(example: Term, exampleRef: MutableRefObject<HTMLDivElement> | undefined) => handleSelectExample(example, exampleRef)}
                        />
                    }
                </div>
            </div>
        </div>
    );

}

export default Modal; 