import {
  Like,
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import {fetchData} from '../lib/functions';
import {Credentials, RegisterCredentials} from '../types/LocalTypes';
import {
  AvailableResponse,
  LoginResponse,
  MessageResponse,
  UploadResponse,
  UserResponse,
} from 'hybrid-types/MessageTypes';
import {Comment} from 'hybrid-types/DBTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // kaikki mediat ilman omistajan tietoja
        const media = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        // haetaan omistajat id:n perusteella
        const mediaWithOwner: MediaItemWithOwner[] = await Promise.all(
          media.map(async (item) => {
            const owner = await fetchData<UserWithNoPassword>(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );

            const mediaItem: MediaItemWithOwner = {
              ...item,
              username: owner.username,
            };
            return mediaItem;
          }),
        );

        console.log(mediaWithOwner);

        setMediaArray(mediaWithOwner);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    getMedia();
  }, []);

  const postMedia = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ) => {
    const media: Omit<
      MediaItem,
      'media_id' | 'user_id' | 'thumbnail' | 'screenshots' | 'created_at'
    > = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      media_type: file.data.media_type,
      filesize: file.data.filesize,
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/media',
      options,
    );
  };

  return {mediaArray, postMedia};
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const fromData = new FormData();
    fromData.append('file', file);
    const options = {
      method: 'POST',
      body: fromData,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_API + '/upload',
      options,
    );
  };
  return {postFile};
};

const useAuthentication = () => {
  const postLogin = async (credentials: Credentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'},
    };
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    try {
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users/token',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const getUsernameAvailable = async (username: string) => {
    try {
      return await fetchData<AvailableResponse>(
        `${import.meta.env.VITE_AUTH_API}/users/username/${username}`,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const getEmailAvailable = async (email: string) => {
    console.log(email);
    return await fetchData<AvailableResponse>(
      `${import.meta.env.VITE_AUTH_API}/users/email/${email}`,
    );
  };

  const getUserById = async (id: number) => {
    return await fetchData<UserWithNoPassword>(
      import.meta.env.VITE_AUTH_API + '/users/' + id,
    );
  };

  const postRegister = async (credentials: RegisterCredentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'},
    };
    try {
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {
    getUserByToken,
    postRegister,
    getUsernameAvailable,
    getEmailAvailable,
    getUserById,
  };
};

const useComment = () => {
  const {getUserById} = useUser();
  // TODO: implement media/comments resource API connections here
  const postComment = async (
    comment_text: string,
    media_id: number,
    token: string,
  ) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id, comment_text}),
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/comments',
      options,
    );
  };

  const getCommentsByMediaId = async (media_id: number) => {
    // Send a GET request to /comments/bymedia/:media_id to get the comments.
    const comments = await fetchData<Comment[]>(
      import.meta.env.VITE_MEDIA_API + '/comments/bymedia/' + media_id,
    );
    // Send a GET request to auth api and add username to all comments
    const commentsWithUsername = await Promise.all<
      Comment & {username: string}
    >(
      comments.map(async (comment) => {
        const user = await getUserById(comment.user_id);
        return {...comment, username: user.username};
      }),
    );
    return commentsWithUsername;
  };

  return {postComment, getCommentsByMediaId};
};

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    // Send a POST request to /likes with object { media_id } and the token in the Authorization header.
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes',
      options,
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    // Send a DELETE request to /likes/:like_id with the token in the Authorization header.
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes/' + like_id,
      options,
    );
  };

  const getCountByMediaId = async (media_id: number) => {
    // Send a GET request to /likes/count/:media_id to get the number of likes.
    return await fetchData<{count: number}>(
      import.meta.env.VITE_MEDIA_API + '/likes/count/' + media_id,
    );
  };

  const getUserLike = async (media_id: number, token: string) => {
    // Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  return {postLike, deleteLike, getCountByMediaId, getUserLike};
};

export {useMedia, useAuthentication, useUser, useComment, useFile, useLike};
