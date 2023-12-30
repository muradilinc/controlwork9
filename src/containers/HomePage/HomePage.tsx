import TransactionForm from './TransactionForm';
import {useEffect, useState} from 'react';
import {getCategories} from '../../store/category/categoryThunk';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Modal from '../../components/Modal/Modal';
import {useLocation, useNavigate} from 'react-router-dom';
import {ADD_PAGE, HOME_PAGE} from '../../constants/routes';
import {deleteTransaction, getTransaction, getTransactions} from '../../store/transaction/transactionThunk';
import {selectGetTransLoading, selectTransactions} from '../../store/transaction/transactionSlice';
import dayjs from 'dayjs';
import {NotePencil, Trash} from '@phosphor-icons/react';
import Spinner from '../../components/Spinner/Spinner';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const transactionsLoading = useAppSelector(selectGetTransLoading);
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

  const selectTran = async (id: string) => {
    await dispatch(getTransaction(id));
  };

  const deleteHandler = async (id: string) => {
    await dispatch(deleteTransaction(id));
    await dispatch(getTransactions());
  };


  return (
    <div>
      <div className="mb-2">
        <p className="text-xl">
          <span className="me-3">Total:</span>
          {
            transactions.reduce((sum, item) => {
              if (item.categoryType.type.toLowerCase() === 'income') {
                return sum + Number(item.item.amount);
              } else {
                return sum - Number(item.item.amount);
              }
            }, 0)
          }
        </p>
      </div>
      {
        transactionsLoading ?
          <Spinner/>
          :
          <div className="grid grid-cols-1 gap-y-3">
            {
              transactions.map((transaction) => (
                <div key={transaction.id} className="border-black items-center border flex p-2 justify-between">
                  {dayjs(transaction.item.createdAd).format('DD.MM.YYYY HH:mm:ss')}
                  <h1>{transaction.categoryType.name}</h1>
                  {
                    transaction.categoryType.type.toLowerCase() === 'income' ?
                      <p className="text-white bg-green-600 py-[5px] px-[10px]">+{transaction.item.amount}</p>
                      :
                      <p className="text-white bg-red-600 py-[5px] px-[10px]">-{transaction.item.amount}</p>
                  }
                  <div>
                    <button
                      onClick={() => selectTran(transaction.id)}
                    >
                      <NotePencil size={32}/>
                    </button>
                    <button
                      onClick={() => deleteHandler(transaction.id)}
                    >
                      <Trash size={32}/>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
      }
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