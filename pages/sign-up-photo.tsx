/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

import useLocalStorage from '../hooks/useLocalStorage';
import { TCategory, useCategories } from '../services/players';
import createObjectURL from '../utilities/file/createObjectURL';
import { authSignUp } from '../services/auth';
import { RequestError, ValidatorError } from '../services/type';
import throttle from '../utilities/delay/throttle';
// import debounce from '../utilities/delay/debounce';

type SignUpData = {
  name: string;
  username: string;
  email: string;
  password?: string;
  phoneNumber: string;
};

const throttleToastError = throttle((message: string) => {
  toast.error(message);
}, 1000);

const SignUpPhoto: NextPage = () => {
  const router = useRouter();
  const [favoriteGame, setFavoriteGame] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('/icon/upload.svg');
  const [imageFile, setImageFile] = useState<Blob | string>('');
  const { data, error } = useCategories<{ data: TCategory[] }>();
  const { localValue, saveLocalValue } =
    useLocalStorage<SignUpData>('signup-data');

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const submitForm = () => {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    formData.append('name', localValue.name);
    formData.append('username', localValue.username);
    formData.append('email', localValue.email);
    formData.append('password', localValue.password || '');
    formData.append('phoneNumber', localValue.phoneNumber);

    // Set favorite game category
    formData.append('favorite', favoriteGame || data.data[0]._id);

    authSignUp(formData)
      .then(() => {
        // Show success popup notification
        toast.success('Akun anda berhasil terdaftar');

        // remove password from local storage
        saveLocalValue(
          ({ name, username, email, phoneNumber }: SignUpData) => ({
            name,
            username,
            email,
            phoneNumber,
          })
        );

        return router.push('/sign-up-success');
      })
      .catch(async ({ status, data: dataFields }: RequestError) => {
        if (status !== 422) return toast(`${status}: Sign Up Error!`);

        const errorFields: ValidatorError[] = Object.values(dataFields.fields);

        const alerts = errorFields.map((field) => {
          const alertMessage = `Mohon maaf ${field.path} ${field.message} 🙏`;
          throttleToastError(alertMessage);
          return alertMessage;
        });

        await router.push('/sign-up');
        return alerts;
      });
  };
  const chooseFavoriteGame = (_id: string) => {
    setFavoriteGame(_id);
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-100 pb-lg-100 pt-60 pb-10">
      {/* Alert error */}
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar" className="preview-image">
                    <Image
                      src={previewImage}
                      objectFit="cover"
                      alt="upload icon"
                      layout="fill"
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const { files } = event.target;
                      const imageUrl = createObjectURL(files);
                      setPreviewImage(imageUrl);
                      setImageFile(files?.[0] || '');
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {localValue.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {localValue.email}
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue=""
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  onChange={({ target: { value } }) =>
                    chooseFavoriteGame(value)
                  }
                >
                  {data.data.map(({ _id, name }: TCategory) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={() => submitForm()}
              >
                Create My Account
              </button>
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="#"
                role="button"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpPhoto;
