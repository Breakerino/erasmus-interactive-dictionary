import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from '../pages/Categories';
import Terms from '../pages/Terms';
import Layout from './Layout';

const App: React.FC = () => {

    return (
        <Routes>
            <Route path={`/`} element={<Layout />}>
                <Route index element={<Categories />} />
                <Route path="/category/:id" element={<Terms />} />
            </Route>
        </Routes>
    )

}

export default App;