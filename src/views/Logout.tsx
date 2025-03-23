import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  // kutsu handleLogout useEffectin sisällä
  const {handleLogout} = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return <div className="text-center text-gray-700">Logout</div>;
};

export default Logout;
