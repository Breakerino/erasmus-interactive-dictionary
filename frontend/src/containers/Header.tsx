// Import config
import config from '../Constants';

// Import components
import LanguageSwitcher from '../components/LanguageSwitcher';
 
// Import types
import { useAppContext } from '../contexts/AppContext';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const { store, actions: {navigate} } = useAppContext();
    const location = useLocation();

    return (
        <header className="page-header__container">
            <div className="placeholder"></div>
            <div className="page-header">
                { location.pathname !== '/'  && <span className="button-back" onClick={() => navigate.to('/')}><img src={config.icon.button.back} alt={'icon-back'} /></span> }
                <h1 className="title">{store.headerTitle}</h1>
                <LanguageSwitcher />
            </div>
        </header>
    );

}

export default Header;