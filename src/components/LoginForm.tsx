import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/FormHooks';
import {Credentials} from '../types/LocalTypes';
import {useNavigate} from 'react-router-dom';

type Props = {
  toggleRegister: () => void;
};

const LoginForm = (props: Props) => {
  const toggleRegister = props.toggleRegister;
  const {handleLogin} = useUserContext();
  const navigate = useNavigate();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs as Credentials);
      navigate('/Home');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Login
        </h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="loginusername"
            >
              Username
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              name="username"
              type="text"
              id="loginusername"
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="loginpassword"
            >
              Password
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              name="password"
              type="password"
              id="loginpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button
            className="mt-3 w-full rounded-md bg-indigo-600 p-2 text-white transition hover:bg-indigo-800"
            type="submit"
          >
            Login
          </button>
          <button
            className="w-full rounded-md bg-gray-600 p-2 text-white transition hover:bg-gray-800"
            type="button"
            onClick={toggleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
