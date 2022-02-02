import { useState } from 'react';

// Import config
import config from '../Constants';

// Import types
import { Term, TermsListInterface } from '../interfaces/Types';

// Import components
import { CSSTransition } from 'react-transition-group';
import TermItem from '../components/TermItem';

const TermsList = ( {terms, category,}: TermsListInterface ) => {

    const [inState, setInState] = useState<boolean>(false);
 
    setTimeout(() => setInState(true), config.inStateDelay);
 
    return (
        <div className="terms__wrapper">
            {terms.map( (term: Term, index: number) => (
                <CSSTransition key={`term_${category.id}-${term.id}`} in={inState} timeout={config.animationDelay * index} classNames="item">
                    <TermItem 
                        data={term} 
                        onSelect={() => {}} 
                    />
                </CSSTransition> 
            ))}
        </div>
    );

}

export default TermsList;