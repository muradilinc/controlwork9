import React from 'react';

interface Props extends React.PropsWithChildren {
  title: string;
  show: boolean;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({title, children, show, onClose}) => {
  return (
    <div
      className={`fixed bg-black/20 inset-0 flex justify-center items-center ${show ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow p-4 w-[40%]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b-2 text-center">
          <h4 className="text-xl pb-3">Add {title}</h4>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;