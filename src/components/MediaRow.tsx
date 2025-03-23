import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  const {user} = useUserContext();

  return (
    <article className="mb-4 w-full rounded-md bg-stone-600 shadow-lg">
      <img
        className="h-72 w-full rounded-t-md object-cover"
        src={
          item.thumbnail ||
          (item.screenshots && item.screenshots[2]) ||
          undefined
        }
        alt={item.title}
      />
      <div className="p-4">
        <h3 className="mb-2 text-center text-xl font-bold text-white">
          {item.title}
        </h3>
        <p className="mb-4 max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-stone-300">
          {item.description}
        </p>
        <div className="border-stone-400 p-2">
          <Link
            to="/single"
            state={{item}}
            className="mb-2 block w-full cursor-pointer bg-blue-600 p-2 text-center font-semibold text-white transition-all duration-500 ease-in-out hover:bg-blue-800"
          >
            Show
          </Link>
          {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                onClick={() => {
                  console.log('Modify clicked!', item.media_id);
                }}
                className="mb-2 block w-full cursor-pointer bg-green-600 p-2 text-center font-semibold text-white transition-all duration-500 ease-in-out hover:bg-green-800"
              >
                Modify
              </button>
              <button
                onClick={() => {
                  console.log('Delete clicked!', item.media_id);
                }}
                className="block w-full cursor-pointer bg-red-600 p-2 text-center font-semibold text-white transition-all duration-500 ease-in-out hover:bg-red-800"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default MediaRow;
