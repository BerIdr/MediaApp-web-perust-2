import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/FormHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const {postRegister, getEmailAvailable, getUsernameAvailable} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      try {
        if (inputs.username.length > 2) {
          const result = await getUsernameAvailable(inputs.username);
          setUsernameAvailable(result.available);
        } else {
          setUsernameAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setUsernameAvailable(true);
      }
    };

    checkUsernameAvailability();
  }, [inputs.username, getUsernameAvailable]);

  useEffect(() => {
    const checkEmailAvailability = async () => {
      try {
        if (inputs.email.length > 5) {
          const result = await getEmailAvailable(inputs.email);
          setEmailAvailable(result.available);
        } else {
          setEmailAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setEmailAvailable(true);
      }
    };

    checkEmailAvailability();
  }, [inputs.email, getEmailAvailable]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Register
        </h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="regusername"
            >
              Username
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              name="username"
              type="text"
              id="regusername"
              onChange={handleInputChange}
              autoComplete="username"
            />
            {!usernameAvailable && (
              <p className="mt-1 text-right text-sm text-red-500">
                Username not available
              </p>
            )}
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="regpassword"
            >
              Password
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              name="password"
              type="password"
              id="regpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="regemail"
            >
              Email
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              name="email"
              type="email"
              id="regemail"
              onChange={handleInputChange}
              autoComplete="email"
            />
            {!emailAvailable && (
              <p className="mt-1 text-right text-sm text-red-500">
                Email not available
              </p>
            )}
          </div>
          <button
            className="mt-3 w-full rounded-md bg-indigo-600 p-2 text-white transition hover:bg-indigo-800"
            type="submit"
            disabled={
              !usernameAvailable ||
              !emailAvailable ||
              inputs.username.length < 3 ||
              inputs.password.length < 6 ||
              inputs.email.length < 6
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
