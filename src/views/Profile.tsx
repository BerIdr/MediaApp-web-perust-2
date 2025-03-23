import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800">Profile</h2>
        {user ? (
          <div className="mt-4 space-y-3">
            <p className="text-gray-700">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">User Level:</span> {user.level_name}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Registered:</span>{' '}
              {new Date(user.created_at).toLocaleString('fi-FI')}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
