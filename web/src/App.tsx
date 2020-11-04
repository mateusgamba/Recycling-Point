import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
      />
    </>
  );
};

export default App;
