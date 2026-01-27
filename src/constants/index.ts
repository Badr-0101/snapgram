import home from '../../public/assets/icons/home.svg';
import wallpaper from '../../public/assets/icons/wallpaper.svg';
import people from '../../public/assets/icons/people.svg';
import bookmark from '../../public/assets/icons/bookmark.svg';
import galleryAdd from '../../public/assets/icons/gallery-add.svg';

export const sidebarLinks = [
  {
    imgURL: home,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: wallpaper,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: people,
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: bookmark,
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: galleryAdd,
    route: '/create-post',
    label: 'Create Post',
  },
];
export const bottomBarLinks = [
  {
    imgURL: home,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: wallpaper,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: bookmark,
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: galleryAdd,
    route: '/create-post',
    label: 'Create Post',
  },
];
export const INITIAL_USER = {
  $id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};
