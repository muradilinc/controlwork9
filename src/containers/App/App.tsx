import Layout from '../../components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import {ADD_PAGE, CATEGORIES_PAGE, HOME_PAGE} from '../../constants/routes';
import CategoriesPage from '../CategoriesPage/CategoriesPage';

const App = () => {
    return (
        <>
         <Layout>
           <Routes>
             <Route path={HOME_PAGE} element={<HomePage/>}/>
             <Route path={CATEGORIES_PAGE} element={<CategoriesPage/>}/>
             <Route path={ADD_PAGE} element={<HomePage/>}/>
           </Routes>
         </Layout>
        </>
    );
};

export default App;