/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import useFormData from '../../../hooks/useFormData';
import { UserError } from '../../../services';
import { authSignIn } from '../../../services/auth';

function SignInForm() {
  const router = useRouter();
  const {
    formData: { email, password },
    changeFormValue,
  } = useFormData({
    email: '',
    password: '',
  });

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!email && !password) {
        throw new UserError(400, 'Email dan Password wajib di isi!');
      }

      const { data } = await toast.promise(authSignIn({ email, password }), {
        pending: 'Autentikasi login...',
        success: 'Berhasil login',
        error: 'Gagal login, silahkan coba lagi',
      });
      // Process jwt token
      // const buf = Buffer.from(data.token, 'base64');
      const tokenBase64 = btoa(data.token);
      Cookies.set('token', tokenBase64, { expires: 1 });

      return router.push('/');
    } catch (error: any) {
      return toast.error('Error Login!');
    }
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">
        Masuk untuk melakukan proses top up
      </p>
      <div className="pt-50">
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          name="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={changeFormValue}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          name="password"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={changeFormValue}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="submit"
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
        >
          Continue to Sign In
        </button>
        <Link href="/sign-up">
          <a
            className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
            role="button"
          >
            Sign Up
          </a>
        </Link>
      </div>
    </form>
  );
}

export default SignInForm;
