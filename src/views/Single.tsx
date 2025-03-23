import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Media Details
      </h2>

      <h3 className="mt-4 text-xl font-semibold text-gray-700">{item.title}</h3>
      <p className="text-sm text-gray-500">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </p>

      {/* Näytetään joko kuva tai video */}
      <div className="mt-4">
        {item.media_type.includes('image') ? (
          <img
            className="max-h-96 w-full rounded-lg object-cover shadow-md"
            src={item.filename}
            alt={item.title}
          />
        ) : (
          <video
            className="w-full rounded-lg shadow-md"
            src={item.filename}
            controls
          />
        )}
      </div>

      {/* Like-nappi pienempänä */}
      <div className="mt-4 flex justify-start">
        <button className="rounded-md bg-blue-600 px-4 py-1 text-sm text-white shadow-sm hover:bg-blue-800">
          Like ❤️
        </button>
      </div>

      {/* Kuvaus ja tiedot */}
      <div className="mt-4">
        <p className="text-gray-700">{item.description}</p>
        <p className="text-sm text-gray-600">Owner: {item.username}</p>
        <p className="text-sm text-gray-600">Type: {item.media_type}</p>
        <p className="text-sm text-gray-600">
          Size: {Math.round(item.filesize / 1024)} kB
        </p>
      </div>

      {/* Kommentit ja post-nappi oikeassa paikassa */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Post a Comment</h3>
        <Comments item={item} />
        <button className="mt-3 w-full rounded-md bg-indigo-600 p-2 text-white shadow-md transition hover:bg-indigo-800">
          Post
        </button>
      </div>

      {/* Go Back -nappi pienempänä ja erillään */}
      <div className="mt-4 flex justify-end">
        <button
          className="rounded-md bg-gray-600 px-4 py-1 text-sm text-white shadow-sm hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Single;
