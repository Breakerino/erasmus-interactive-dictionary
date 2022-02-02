import { MutableRefObject, useState } from 'react';

// Import config
import config from '../Constants';

// Import types
import { ExamplesListInterface, Term } from '../interfaces/Types';

// Import components
import { CSSTransition } from 'react-transition-group';
import ExampleItem from '../components/ExampleItem';

const ExamplesList = ( {examples, activeExample, activeExampleRef, selectExample}: ExamplesListInterface ) => {

    const [inState, setInState] = useState<boolean>(false);

    setTimeout(() => setInState(true), config.inStateDelay);

    const classList: Array<string> = ['examples__wrapper'];

    activeExample?.id && classList.push('isActive');

    return (
        <div className={classList.join(' ')}>
        
            {examples.map( (example: Term, index: number) => (
                <CSSTransition key={`example_${example.id}`} in={inState} timeout={config.animationDelay * index} classNames="item">
                    <ExampleItem 
                    data={example}
                    isActive={example.id === activeExample?.id} 
                    setExampleRefIfActive={(exampleRef: MutableRefObject<HTMLDivElement> | undefined) => activeExampleRef(exampleRef)} 
                    selectExample={((selectedExample: Term, exampleItemRef: MutableRefObject<HTMLDivElement> | undefined) => selectExample(selectedExample, exampleItemRef))} 
                />
                </CSSTransition> 
            ))}

        </div>
    );

}

export default ExamplesList;