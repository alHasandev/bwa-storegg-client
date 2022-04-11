import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { TPlayer } from '../../../services/players';
import { IMAGE_URL } from '../../../services';
import useLogout from '../../../hooks/useLogout';
import { JwtData } from '../../../services/auth';

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<TPlayer | null>(null);

  const logout = useLogout('/');

  const logoutUser = async () => {
    await logout();

    setIsLogin(false);
    setUser(null);
  };

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('User is not authenticated');

      const jwtToken = atob(token ?? '');
      const payload: JwtData = jwtDecode(jwtToken);

      const player = payload?.player;

      if (!player) throw new Error('Authentication token is corupted!');

      setIsLogin(true);
      setUser(player);
    } catch (error) {
      setIsLogin(false);
    }

    // if(!!user)
  }, []);

  if (isLogin && !!user) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              src={`${IMAGE_URL}/${user.avatar}`}
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <Link href="/member/">
                <a className="dropdown-item text-lg color-palette-2">
                  My Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/member/wallet">
                <a className="dropdown-item text-lg color-palette-2">Wallet</a>
              </Link>
            </li>
            <li>
              <Link href="/member/edit-profile">
                <a className="dropdown-item text-lg color-palette-2">
                  Account Settings
                </a>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item text-lg color-palette-2"
                onClick={() => logoutUser()}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in">
        <a
          className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
          role="button"
        >
          Sign In
        </a>
      </Link>
    </li>
  );
}

export default Auth;
