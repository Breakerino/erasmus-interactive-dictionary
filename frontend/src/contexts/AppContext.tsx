import React from 'react';
import _ from 'lodash';
import { Locale } from '../interfaces/Types';
import { useNavigate } from 'react-router-dom';
import useQueryParams from '../hooks/useQueryParams';
import config from '../Constants';

export interface AppContextProps {
    headerTitle?: string
}

export interface AppContextProviderProps {
    store: AppContextStore,
    actions: AppContextActions
}

export interface AppContextActions {
    setHeaderTitle: (title: string) => void,
    setLocale: (locale: Locale) => void
    navigate: {
        to: (path: string, props?: Record<string, any>) => void,
        back: () => void
    }
}

export interface AppContextStore {
    headerTitle: string
    locale: Locale,
    history: string[]
}

const initialStore: AppContextStore = {
    headerTitle: '',
    locale: 'en',
    history: []
};

const AppContext = React.createContext<AppContextProviderProps>({
    store: initialStore,
    actions: {
        setLocale: () => {},
        setHeaderTitle: () => {},
        navigate: {
            to: () => {},
            back: () => {},
        }
    }
});

export const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
    
    const navigate = useNavigate();
    const queryParams = useQueryParams();

    const getSiteLocale = (defaultLocale: string): Locale => {
        const locale = queryParams.get('lang');
        // @ts-ignore
        return config.languages.includes(locale) ? locale : defaultLocale;
    }
    
    /**
     * 
     */
    const [store, updateStore] = React.useState<AppContextStore>({ 
        ...initialStore,
        locale: getSiteLocale(initialStore.locale)
     });


    /**
     * Utility function for updating 
     * context's store props
     * 
     * @param key 
     * @param value 
     * @type void
     */
    const setState = (key: string, value: any) => {
        if (!(key in initialStore)) throw Error(`Key ${key} is not valid state.`);
        updateStore((prevState: any) => ({ ...prevState, [key]: value instanceof Function ? value(prevState[key]) : value, }));
    };

    const setLocale = (locale: Locale) => {
        queryParams.set('lang', locale);
        navigate({search: queryParams.toString()})
        setState('locale', locale);
    }

    const setHeaderTitle = (title: string) => setState('headerTitle', title);

    return (
        <AppContext.Provider children={children} value={{
            store, 
            actions: {
                setHeaderTitle,
                setLocale,
                navigate: {
                    to: (pathname, props) => navigate({pathname, search: queryParams.toString()}, props),
                    back: () => setState('history', (prevState: string[]) => prevState.pop())
                }
            }
        }} />
    )

};

export const useAppContext = () => React.useContext(AppContext);