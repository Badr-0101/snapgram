import home from '@/assets/icons/home.svg'
import explore from '@/assets/icons/wallpaper.svg'
import people from '@/assets/icons/people.svg'
import bookmark from '@/assets/icons/bookmark.svg'
import createPost from '@/assets/icons/gallery-add.svg'
export const sidebarLinks = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: explore,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: people,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: createPost,
    route: "/create-post",
    label: "Create Post",
  },
];
export const bottomBarLinks = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: explore,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: createPost,
    route: "/create-post",
    label: "Create Post",
  },
]