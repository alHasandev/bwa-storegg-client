import useLogout from '../../../hooks/useLogout';
import Footer from './Footer';
import MenuItem from './MenuItem';
import Profile from './Profile';

interface SidebarProps {
  activeMenu: 'overview' | 'transactions' | 'settings';
}

function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;
  const logout = useLogout('/');

  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <MenuItem
            link="/member"
            iconSrc="/icon/menu-overview.svg"
            title="Overview"
            active={activeMenu === 'overview'}
          />
          <MenuItem
            link="/member/transactions"
            iconSrc="/icon/menu-transactions.svg"
            title="Transactions"
            active={activeMenu === 'transactions'}
          />
          <MenuItem
            link="/member/massages"
            iconSrc="/icon/menu-massages.svg"
            title="Massages"
          />
          <MenuItem
            link="/member/card"
            iconSrc="/icon/menu-card.svg"
            title="Card"
          />
          <MenuItem
            link="/member/rewards"
            iconSrc="/icon/menu-rewards.svg"
            title="Rewards"
          />
          <MenuItem
            link="/member/edit-profile"
            iconSrc="/icon/menu-settings.svg"
            title="Settings"
            active={activeMenu === 'settings'}
          />
          <MenuItem
            onClick={() => logout()}
            iconSrc="/icon/menu-logout.svg"
            title="Log Out"
          />
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default Sidebar;
