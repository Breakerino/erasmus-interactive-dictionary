import { debounce } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const Loader = ({ loading }: { loading: boolean }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const debouncedLoading = debounce(async (state) => {
        setIsLoading(state);
    }, 150);

    useEffect(() => {
        debouncedLoading(loading);
    }, [loading]);

    return (
        <CSSTransition in={isLoading} unmountOnExit timeout={400}>
            <div className="loader__container">
                <div className="loader__wrapper">
                    <div className="loader">
                        <div className="inner">
                            <div className="left"></div>
                            <div className="middle"></div>
                            <div className="right"></div>
                        </div>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default Loader;
