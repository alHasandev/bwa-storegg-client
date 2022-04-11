/* eslint-disable @typescript-eslint/no-floating-promises */
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LabelInput from '../../components/molecules/LabelInput';
import Sidebar from '../../components/organisms/Sidebar';
import useFormData from '../../hooks/useFormData';
import { IMAGE_URL } from '../../services';
import { JwtData } from '../../services/auth';
import { TPlayer, updateProfile } from '../../services/players';
import createObjectURL from '../../utilities/file/createObjectURL';

type EditProfileProps = {
  user: TPlayer;
  jwtToken: string;
};

type UpdateProfileResponse = {
  data: {
    token: string;
  };
};

type AvatarImage = {
  src: string;
  file: File | null;
};

type InputData = {
  name: string;
  phoneNumber: string;
};

function EditProfile({ user, jwtToken }: EditProfileProps) {
  const [avatar, setAvatar] = useState<AvatarImage>({
    src: '/icon/upload.svg',
    file: null,
  });

  const {
    formData: { name, phoneNumber },
    changeFormValue,
  } = useFormData<InputData>({
    name: user.name,
    phoneNumber: user.phoneNumber,
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    if (avatar.file) formData.append('avatar', avatar.file);

    toast
      .promise(updateProfile<UpdateProfileResponse>(formData, jwtToken), {
        pending: 'Menyimpan Perubahan...',
        success: 'Berhasil mengupdate profile',
        error: 'Gagal mengupdate profile',
      })
      .then(({ data }: UpdateProfileResponse) => {
        // Save new token
        const tokenBase64 = btoa(data.token);
        return Cookies.set('token', tokenBase64, { expires: 1 });
      });
  };

  useEffect(() => {
    setAvatar((img) => ({ ...img, src: `${IMAGE_URL}/${user.avatar}` }));
  }, [user.avatar]);

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="" onSubmit={onSubmit}>
              <div className="photo d-flex">
                <div className="image-upload text-center">
                  <label htmlFor="avatar" className="preview-image">
                    <Image
                      src={avatar.src}
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
                      setAvatar({
                        src: imageUrl,
                        file: files?.[0] || null,
                      });
                    }}
                  />
                </div>
              </div>

              <LabelInput
                type="email"
                label="Email Address"
                id="email"
                name="email"
                placeholder="Enter your email address"
                defaultValue={user.email}
                readOnly
              />
              <LabelInput
                type="text"
                label="Full Name"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={changeFormValue}
              />
              <LabelInput
                type="tel"
                label="Phone"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={changeFormValue}
              />
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="submit"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

export default EditProfile;

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('Silahkan login terlebih dahulu!');

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const { player: user }: JwtData = jwtDecode(jwtToken);

    if (!user) throw new Error('Silahkan login terlebih dahulu!');

    return {
      props: {
        user,
        jwtToken,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
};
