import {Link} from 'react-router-dom';
import {ADD_PAGE, CATEGORIES_PAGE, HOME_PAGE} from '../../constants/routes';

const Header = () => {
  return (
    <div className="bg-blue-400 py-5">
      <div className="container mx-auto grid grid-cols-2 items-center">
        <div className="col-span-1">
          <Link
            to={HOME_PAGE}
            className="text-2xl font-bold text-white"
          >
            MoneyGuard
          </Link>
        </div>
        <div className="col-span-1 grid place-content-end">
          <div className="flex gap-x-5">
            <Link
              to={CATEGORIES_PAGE}
              className="capitalize text-xl text-white"
            >
              categories
            </Link>
            <Link
              to={ADD_PAGE}
              className="capitalize text-xl text-white"
            >
              add
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;