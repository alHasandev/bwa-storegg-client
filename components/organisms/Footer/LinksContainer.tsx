import GroupLinks from '../../molecules/GroupLinks';

const lists = [
  {
    title: 'Company',
    items: [
      {
        link: '/',
        text: 'About Us',
      },
      {
        link: '/',
        text: 'Press Release',
      },
      {
        link: '/',
        text: 'Term of Use',
      },
      {
        link: '/',
        text: 'Privacy & Policy',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        link: '/',
        text: 'Refund Policy',
      },
      {
        link: '/',
        text: 'Unlock Rewards',
      },
      {
        link: '/',
        text: 'Live Chatting',
      },
    ],
  },
  {
    title: 'Connect',
    items: [
      {
        link: '/',
        text: 'hi@store.gg',
      },
      {
        link: '/',
        text: 'team@store.gg',
      },
      {
        link: '/',
        text: 'Pasific 12, Jakarta Selatan',
      },
      {
        link: '/',
        text: '021 - 1122 - 9090',
      },
    ],
  },
];

function LinksContainer() {
  return (
    <div className="row gap-sm-0">
      {lists.map((list) => (
        <GroupLinks key={list.title} title={list.title} items={list.items} />
      ))}
    </div>
  );
}

export default LinksContainer;
