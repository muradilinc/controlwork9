import Layout from '../../components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';

const App = () => {
    return (
        <>
         <Layout>
           <Routes>
             <Route path={'/'} element={<HomePage/>}/>
           </Routes>
         </Layout>
        </>
    );
};

export default App;