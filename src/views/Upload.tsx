import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../hooks/FormHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
      setUploading(false);
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Upload
        </h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              name="title"
              type="text"
              id="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </div>
          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              name="description"
              rows={3}
              id="description"
              onChange={handleInputChange}
              value={inputs.description}
            ></textarea>
          </div>
          <div>
            <label className="block font-medium text-gray-700" htmlFor="file">
              Upload File
            </label>
            <input
              className="focus:ring-opacity-50 mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              ref={fileRef}
            />
          </div>
          <img
            className="mx-auto mt-3 h-32 w-32 rounded-lg border border-gray-300 object-cover"
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://place-hold.it/150?text=Choose+image'
            }
            alt="preview"
          />
          <button
            className="mt-3 w-full rounded-md bg-indigo-600 p-2 text-white transition hover:bg-indigo-800"
            type="submit"
            disabled={
              !file ||
              inputs.title.length < 3 ||
              inputs.description.length === 0
            }
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          <button
            className="w-full rounded-md bg-gray-600 p-2 text-white transition hover:bg-gray-800"
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>
          <p className="mt-2 text-center text-gray-700">{uploadResult}</p>
        </form>
      </div>
    </div>
  );
};

export default Upload;
