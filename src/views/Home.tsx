import {Link} from 'react-router-dom';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <h2 className="mt-5 mb-5 text-center text-3xl font-bold text-gray-800">
        All Media
      </h2>
      <section className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mediaArray.map((item) => (
          <Link
            key={item.media_id}
            to={`/single`}
            state={{item}}
            className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg"
          >
            <img
              src={item.thumbnail ?? ''}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="space-y-2 p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="truncate text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Home;
