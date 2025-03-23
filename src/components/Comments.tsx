import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useCommentStore} from '../store';
import {useEffect, useRef} from 'react';
import {useComment} from '../hooks/apiHooks';
import {useForm} from '../hooks/FormHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useUserContext();
  const {comments, setComments} = useCommentStore();
  const {postComment, getCommentsByMediaId} = useComment();

  const initValues = {comment_text: ''};
  const doComment = async () => {
    // adding comments "locally" (dummy version)
    // addComment({
    //   comment_text: inputs.comment_text,
    //   username: user.user?.username,
    //   user_id: user.user?.user_id,
    //   media_id: item.media_id,
    // });

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    // TODO: add try-catch & user notification
    await postComment(inputs.comment_text, item.media_id, token);
    // update comments after post
    getComments();
    // reset form
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setInputs(initValues);
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      setComments([]);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user && (
        <form
          className="mt-4 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex w-4/5 flex-col">
            <label
              htmlFor="comment_text"
              className="mb-2 font-medium text-gray-700"
            >
              Post a comment
            </label>
            <input
              className="rounded-md border p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
              autoComplete="off"
              ref={inputRef}
            />
          </div>
          <button
            disabled={!inputs.comment_text}
            className="my-2.5 block w-4/5 rounded-md bg-blue-600 p-2 text-center font-semibold text-white transition-all duration-500 ease-in-out hover:bg-blue-800"
            type="submit"
          >
            Post
          </button>
        </form>
      )}
      {comments.length > 0 && (
        <ul className="mt-4 space-y-2">
          {comments.map((comment) => (
            <li
              key={comment.comment_id}
              className="rounded-md border border-gray-800 bg-gray-100 p-4 shadow-md"
            >
              <p className="font-bold text-gray-800">{comment.username}</p>
              <p className="text-sm text-gray-600">
                {new Date(comment.created_at || '').toLocaleString('fi-FI')}
              </p>
              <p className="mt-2 text-gray-700">{comment.comment_text}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
