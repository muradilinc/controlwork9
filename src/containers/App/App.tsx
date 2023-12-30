import Layout from '../../components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import {CATEGORIES_PAGE} from '../../constants/routes';
import CategoriesPage from '../CategoriesPage/CategoriesPage';

const App = () => {
    return (
        <>
         <Layout>
           <Routes>
             <Route path={'/'} element={<HomePage/>}/>
             <Route path={CATEGORIES_PAGE} element={<CategoriesPage/>}/>
           </Routes>
         </Layout>
        </>
    );
};

export default App;