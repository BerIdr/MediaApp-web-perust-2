import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  console.log(item);
  return (
    <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {item && (
        <div
          className={`bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ${
            item.media_type.includes('image') ? 'border-blue-500' : 'border-green-500'
          } border-4`}
        >
          <button
            onClick={() => {
              setSelectedItem(undefined);
            }}
            className="mb-4 text-red-500 hover:text-red-700 font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = item.filename;
              link.download = item.title;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="mb-4 ml-4 text-blue-500 hover:text-blue-700 font-semibold"
          >
            Download
          </button>
          <form className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              Add a comment:
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write your comment here..."
            />
          </form>
          <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
          <p className="text-gray-600 mb-4">{new Date(item.created_at).toLocaleString('fi-FI')}</p>
          {item.media_type.includes('image') ? (
            <img src={item.filename} alt={item.title} className="w-full rounded-md mb-4 shadow-md" />
          ) : (
            <video src={item.filename} controls className="w-full rounded-md mb-4 shadow-md" />
          )}
          <p className="text-gray-700">{item.description}</p>
        </div>
      )}
    </dialog>
  );
};
export default SingleView;
