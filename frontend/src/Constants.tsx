import { DefaultTranslations, Locale, Translations } from './interfaces/Types';

const getAssetURL = (file: string) => `/assets/${file}`;

const getTranslation = (translations: Translations, language: Locale, defaultLanguage: Locale = 'en') => {

    if ( language in translations ) {
        return translations[language] ?? '';
    }

    return translations[defaultLanguage] ?? '';

}

const truncate = ( str: string = '', n: number = 140, useWordBoundary: any = true) => {

    if (str.length <= n) { 
        return str; 
    }

    const subStr = str.substr(0, n - 1);

    return (useWordBoundary ? subStr.substr(0, subStr.lastIndexOf(' ')) : subStr) + ' ...';

};

// TODO: Merge with language switchers icons getter
const getFlag = (locale: Locale) => {
    return (
        <span className="country-flag">
            <img src={config.icon.flags[locale]}  alt={`ico-country_${locale}`}/>
        </span>
    )
} 

const locales: Locale[] = ['en', 'sk', 'cs', 'tr', 'el'];

const icons = {
    button: {
        back: getAssetURL('icons/ico-back.svg'),
        close: getAssetURL('icons/ico-close.svg'),
        nav: getAssetURL('icons/ico-nav.svg')
    },
    flags: Object.fromEntries(locales.map(locale => [locale, getAssetURL(`icons/ico-lang_${locale}.svg`)]))
}

const translations: DefaultTranslations = {
    categories: {  
        en: 'Categories', 
        sk: 'Kategórie',
        cs: 'Kategórie',
        tr: 'Kategoriler',
        el: 'κατηγορίες'
    },
    term: {
        en: 'term',
        sk: 'slovo',
        cs: 'slovo',
        tr: 'kelime',
        el: 'λέξη'
    },
    terms: {
        en: 'terms',
        sk: 'slov',
        cs: 'slov',
        tr: 'kelimeler',
        el: 'λόγια'
    }
}

const config = {
    icon: icons,
    meta: {
        title: 'Erasmus - Interactive Dictionary',
        description: 'A multilingual interactive dictionary of various interesting things, events and places all around the world from countries like Slovakia, Czech Republic, Turkey and Greece.',
        image: '%PUBLIC_URL%/static/img/logo512.png'
    },
    languages: locales,
    translations: translations,
    animationDelay: 150,
    inStateDelay: 50,
    getFlag: (locale: Locale) => getFlag(locale),
    getFileURI: (file: string) => getAssetURL(file),
		// @ts-ignore
    getImageURL: (image: string) => `${import.meta.env.BRK_API_BASE_URL}${image}`,
    truncate: ( str: string = '', n: number = 140, useWordBoundary: any = true) => truncate(str, n, useWordBoundary),
    getTranslation: (translations: Translations, language: Locale, defaultLanguage: Locale = 'en') => getTranslation(translations, language, defaultLanguage)
}

export default config;