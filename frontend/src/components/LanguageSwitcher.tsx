// Import config
import config from '../Constants';
import { useAppContext } from '../contexts/AppContext';

// Import types
import { Locale } from '../interfaces/Types';

// Import components
import LanguageSwitch from './LanguageSwitch';

const LanguageSwitcher = () => {

    const { actions, store } = useAppContext(); 

    return (
        <div className="language-switcher__wrapper">
            {config.languages.map( (locale: Locale, index: number) => (
                <LanguageSwitch key={index} selectLanguage={actions.setLocale} language={locale} isActive={store.locale === locale} />
            ))}
        </div>
    );

}

export default LanguageSwitcher;