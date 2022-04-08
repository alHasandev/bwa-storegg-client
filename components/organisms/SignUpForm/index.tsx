/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import useLocalStorage from '../../../hooks/useLocalStorage';

function SignUpForm() {
  const initialValue = {
    name: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  };

  const [{ name, username, email, password, phoneNumber }, setFormData] =
    useState(initialValue);
  const { saveLocalValue } = useLocalStorage('signup-data', initialValue);
  const router = useRouter();

  const changeValue = (event: { target: HTMLInputElement }) =>
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));

  const nextForm = (link: string) => {
    // Save signup data to local storage
    if (!name && !username && !email && !password && !phoneNumber) {
      return toast.warning('Semua field harus di isi!');
    }
    saveLocalValue({
      name,
      username,
      email,
      password,
      phoneNumber,
    });

    // Redirect to {link}
    return router.push(link);
  };

  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">
        Daftar dan bergabung dengan kami
      </p>
      <div className="pt-50">
        <label
          htmlFor="name"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Full Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="name"
          name="name"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          onChange={changeValue}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="username"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Username
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="username"
          name="username"
          aria-describedby="username"
          placeholder="Enter your username"
          value={username}
          onChange={changeValue}
        />
      </div>
      <div className="pt-30">
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
          onChange={changeValue}
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
          onChange={changeValue}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="phoneNumber"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Nomer Telepon
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="phoneNumber"
          name="phoneNumber"
          aria-describedby="phoneNumber"
          placeholder="Your Phone Number"
          value={phoneNumber}
          onChange={changeValue}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          onClick={() => nextForm('/sign-up-photo')}
        >
          Continue
        </button>
        <Link href="/sign-in">
          <a
            className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
            role="button"
          >
            Sign In
          </a>
        </Link>
      </div>
    </>
  );
}

export default SignUpForm;
