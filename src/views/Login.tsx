import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };
  return (
    <>
      {displayRegister ? (
        <RegisterForm />
      ) : (
        <LoginForm toggleRegister={toggleRegister} />
      )}
      <div className="mt-3 flex justify-center">
        <button
          className="m-2 cursor-pointer rounded-md border border-solid border-gray-300 bg-white p-3 text-gray-700 hover:bg-gray-100"
          onClick={toggleRegister}
        >
          {displayRegister ? 'Login?' : 'Register?'}
        </button>
      </div>
    </>
  );
};

export default Login;
