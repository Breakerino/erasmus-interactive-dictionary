// Import config
import config from '../Constants';
 
// Import types
import { LanguageSwitchInterface } from '../interfaces/Types';

const LanguageSwitch = ( {language, isActive, selectLanguage}: LanguageSwitchInterface ) => {

    const classNames: String[] = ['language-switch'];

    isActive && classNames.push('active');

    return (
        <span onClick={() => selectLanguage(language)} className={classNames.join(' ')}>
            <img src={config.icon.flags[language]}  alt={`ico-lang_${language}`}/>
        </span>
    );

}

export default LanguageSwitch;