export type DefaultLanguage = 'en';
export type Locale        = 'cs' | 'en' | 'el' | 'sk' | 'tr';

export type Terms = Term[];

export interface Term {
    id: number,
		parentID?: number,
    title: string,
    description: string,
    image: string,
    origin?: Locale,
    examples: Terms
}

export type DefaultTranslations = {
    [index:string]: Translations;
}

export interface TranslationsData<T> {
    en: T,
    sk?: T,
    cs?: T,
    tr?: T,
    el?: T
};

export interface Translations {
    en: string,
    sk?: string,
    cs?: string,
    tr?: string,
    el?: string
};

export interface Translation {
    title: string,
    description?: string,
}

export interface TermWithTranslations extends Pick<Term, 'id' | 'image' | 'origin'> {
    id: number,
    parentID?: number,
    translations: TranslationsData<Term>
}

export type Categories = Category[];

export interface Category {
    id: number,
    title: string,
    image: string,
    count?: number,
    //translations: Translations
    //terms: Terms
}

export interface CategoriesListInterface {
    categories: Categories, 
    selectCategory: Function
}

export interface TermsListInterface {
    category: Category,
    terms: Terms, 
    onSelect: Function
}

export interface LanguageSwitchInterface {
    language: Locale,
    isActive: Boolean,
    selectLanguage: Function
}

export interface CategoryTranslations {
    termsCount: number | undefined;
    en: Category,
    sk?: Category,
    cs?: Category,
    tr?: Category,
    el?: Category
}

export interface CategoryItemProps {
    data: {
        id: number,
        image: string,
        translations: TranslationsData<Category>
    },
    locale: Locale,
    termsCount: number,
    onSelect: () => void
}

export interface TermItemInterface {
    data: Term, 
    onSelect: Function
}

export interface ModalInterface { 
    terms: TermWithTranslations[] 
    activeTermID: number | null,
    onModalClose: Function
    onTermChange: Function
}

export interface ExamplesListInterface {
    examples: Terms,
    activeExample: Term | undefined, 
    activeExampleRef: Function,
    selectExample: Function
}

export interface ExampleItemInterface {
    data: Term, 
    isActive: boolean, 
    selectExample: Function,
    setExampleRefIfActive: Function
}