import { isNull } from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Modal from '../components/Modal';
import TermItem from '../components/TermItem';
import config from '../Constants';
import { useAppContext } from '../contexts/AppContext';
import { TermWithTranslations } from '../interfaces/Types';
import { getTerms } from '../queries';

const Terms = () => {
  const { id: categoryID } = useParams()
  const { store: { locale }, actions: { setHeaderTitle } } = useAppContext();
  const { data, isFetching }: { data?: { category: any /** */, items: TermWithTranslations[] }, isFetching: boolean } = useQuery(['categories', categoryID], () => getTerms({ locale, category: categoryID }), { keepPreviousData: true });

  const [activeTerm, setActiveTerm] = React.useState<number | null>(null);
  const handleTermChange = (direction: 'prev' | 'next') => {

    if ( ! data || isNull(activeTerm) ) return;

    const actions = {prev: -1, next: 1};

    let currentIndex    = data.items.findIndex(({id}) => id === activeTerm);
    let nextIndex       = currentIndex + actions[direction];

    // Skip to first
    if ( nextIndex > (data.items.length - 1) ) {
        nextIndex = 0;
    }

    // Skip to last
    if ( nextIndex < 0 ) {
        nextIndex = (data.items.length - 1);
    }

    setActiveTerm(data.items[nextIndex].id);
    
}

  React.useEffect(() => {
    !isFetching && data?.category && setHeaderTitle(data?.category.translations?.[locale].title);
  }, [data?.category, isFetching, locale])
  return (<>

    <CSSTransition unmountOnExit in={Boolean(activeTerm)} timeout={config.animationDelay} classNames="item">
      <Modal
        terms={data?.items ?? []}
        activeTermID={activeTerm}
        onTermChange={handleTermChange} 
        onModalClose={() => setActiveTerm(null)}
      />
    </CSSTransition>

    <div className="terms__wrapper">
      {(data?.items ?? []).map(({translations, ...term}: TermWithTranslations, index: number) => (
        <CSSTransition key={`term_${categoryID}-${term.id}`} in={true} appear={true} timeout={config.animationDelay * index} classNames="item">
          <TermItem
            data={{...(translations?.[locale] ?? translations.en), ...term}}
            onSelect={() => setActiveTerm(term.id)}
          />
        </CSSTransition>
      ))}
    </div>

  </>
  );

}

export default Terms;