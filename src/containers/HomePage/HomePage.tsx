import TransactionForm from './TransactionForm';
import {useEffect, useState} from 'react';
import {getCategories} from '../../store/category/categoryThunk';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Modal from '../../components/Modal/Modal';
import {useLocation, useNavigate} from 'react-router-dom';
import {ADD_PAGE, HOME_PAGE} from '../../constants/routes';
import {getTransactions} from '../../store/transaction/transactionThunk';
import {selectTransactions} from '../../store/transaction/transactionSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    setModal(location.pathname.includes(ADD_PAGE));
  }, [location]);

  const closeModal = () => {
    navigate(HOME_PAGE);
  };

  return (
    <div>
      <div>
        {
          transactions.map((transaction) =>(
            <div>
              <h1>{transaction.categoryType.name}</h1>
              {
                transaction.categoryType.type.toLowerCase() === 'income' ?
                  <p>+ {transaction.item.amount}</p>
                  :
                  <p>-{transaction.item.amount}</p>
              }
            </div>
          ))
        }
      </div>
      <Modal
        title="Expence/Income"
        show={modal}
        onClose={closeModal}
      >
        <TransactionForm/>
      </Modal>
    </div>
  );
};

export default HomePage;