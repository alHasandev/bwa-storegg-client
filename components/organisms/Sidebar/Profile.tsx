import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { IMAGE_URL } from '../../../services';
import { JwtData } from '../../../services/auth';

import { TPlayer } from '../../../services/players';

function Profile() {
  const [user, setUser] = useState<TPlayer | null>(null);

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('User is not authenticated');

      const jwtToken = atob(token ?? '');
      const payload: JwtData = jwtDecode(jwtToken);

      const player = payload?.player;

      if (!player) throw new Error('Authentication token is corupted!');

      setUser(player);
    } catch (error) {
      console.error('Error Sidebar Profile', error);
    }

    // if(!!user)
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user text-center pb-50 pe-30">
      <img
        src={`${IMAGE_URL}/${user.avatar}`}
        width="90"
        height="90"
        className="img-fluid mb-20"
        alt="avatar"
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}

export default Profile;
