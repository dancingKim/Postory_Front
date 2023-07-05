import { Navigate } from 'react-router-dom';
import Home from './pages/general/home/Home';
import SearchPost from './pages/general/search/SearchPost';
import SearchSeries from './pages/general/search/SearchSeries';
import SearchChannel from './pages/general/search/SearchChannel';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Email from './pages/auth/Email';
import ProfileChannel from './pages/general/profile/ProfileChannel';
import ProfilePost from './pages/general/profile/ProfilePost';
import ProfileSeries from './pages/general/profile/ProfileSeries';
import Logout from './pages/auth/Logout';
import Webtoon from './pages/general/home/Webtoon';
import Webnovel from './pages/general/home/Webnovel';
import SubsPost from './pages/general/subs/SubsPost';
import SubsChannel from './pages/general/subs/SubsChannel';
import ScrapPost from './pages/general/myLibrary/ScrapPost';
import LikePost from './pages/general/myLibrary/LikePost';
import AccountSettings from './pages/general/accSettings/AccountSetting';
import ProfileSettings from './pages/general/accSettings/ProfileSetting';
import BlackedChannel from './pages/general/accSettings/BlackedChannel';
import ChannelCreate from './pages/general/ChannelCreate';
import ChannelHome from './pages/general/channel/ChannelHome';
import ChannelWebtoon from './pages/general/channel/ChannelWebtoon';
import ChannelWebnovel from './pages/general/channel/ChannelWebnovel';
import ChannelAbout from './pages/general/channel/ChannelAbout';
import PostCreate from './pages/general/create/PostCreate';

const urls = {
  login: '/login',
  logout: '/logout',
  signup: '/signup',
  emailAuth: '/email/auth',

  home: '/',
  webtoon: '/webtoon',
  webnovel: '/webnovel',

  //subscriptions
  subscriptions: '/subscriptions',
  subsChannel: '/subscriptions/channel',

  //library
  library: '/library',
  history: '/library/view',
  scrap: '/library/scrap',
  purchases: '/library/purchases',
  likes: '/library/likes',
  comments: '/library/comments',

  //point
  point: '/point',
  earnings: '/point/earnings',

  //account/settings
  setAccount: '/account/settings',
  setProfile: '/account/settings/profile',
  setBlacklist: '/account/settings/blacklist',

  //channel
  channelCreate: '/channel/create',
  channel: '/channel/:chnlUri',
  channelWebtoon: '/channel/:chnlUri/webtoon',
  channelWebnovel: '/channel/:chnlUri/webnovel',
  channelAbout: '/channel/:chnlUri/about',

  search: '/search',
  searchSeries: '/search/series',
  searchChannel: '/search/channel',

  //profile
  profile: `/profile/:nic`,
  profilePost: `/profile/:nic/post`,
  profileSeries: `/profile/:nic/series`,

  // crate
  postCreate: `/post/create`,
};

// Links
// header
export const headerLinks = [
  { to: urls.home, children: '홈' },
  { to: urls.subscriptions, children: '구독' },
  { to: urls.library, children: '보관함' },
];

// navLinks
export const homeLinks = [
  { to: urls.home, children: '추천' },
  { to: urls.webtoon, children: '웹툰' },
  { to: urls.webnovel, children: '웹소설' },
];

export const subsLinks = [
  { to: urls.subscriptions, children: '포스트', end: true },
  { to: urls.subsChannel, children: '채널' },
];

export const libraryLinks = [
  { to: urls.scrap, children: '스크랩' },
  // { to: urls.purchases, children: '구매' },
  { to: urls.likes, children: '좋아요' },
  // { to: urls.comments, children: '댓글' },
];

export const pointLinks = [
  { to: urls.point, children: '포인트/수익', isTitle: true },
  { to: urls.point, children: '내 포인트', end: true },
  { to: urls.earnings, children: '내 수익' },
];

export const accSetLinks = [
  { to: urls.setAccount, children: '설정', isTitle: true },
  { to: urls.setAccount, children: '계정', end: true },
  { to: urls.setProfile, children: '프로필' },
  { to: urls.setBlacklist, children: '차단' },
];

export const channelLinks = [
  { to: urls.channel, children: '홈' },
  { to: urls.channelWebtoon, children: '웹툰' },
  { to: urls.channelWebnovel, children: '웹소설' },
  { to: urls.channelAbout, children: '소개' },
];

// app.js routing
export const pageRoutes = [
  { id: 1, path: urls.signup, element: <Signup /> },
  { id: 2, path: urls.login, element: <Login /> },
  { id: 3, path: urls.logout, element: <Logout /> },
  { id: 4, path: urls.emailAuth, element: <Email /> },

  //home
  { id: 5, path: urls.home, element: <Home /> },
  { id: 6, path: urls.webtoon, element: <Webtoon /> },
  { id: 7, path: urls.webnovel, element: <Webnovel /> },

  //subscriptions
  { id: 8, path: urls.subscriptions, element: <SubsPost /> },
  { id: 9, path: urls.subsChannel, element: <SubsChannel /> },

  //library
  { id: 10, path: urls.library, element: <Navigate to={urls.scrap} replace /> },
  { id: 11, path: urls.scrap, element: <ScrapPost /> },
  // { id: 12, path: urls.purchases, element: <div>구매</div> },
  { id: 13, path: urls.likes, element: <LikePost /> },
  // { id: 14, path: urls.comments, element: <div>댓글</div> },

  //point
  // { id: 15, path: urls.point, element: <div>내 포인트</div> },
  // { id: 16, path: urls.earnings, element: <div>내 수익</div> },

  //settings
  { id: 17, path: urls.setAccount, element: <AccountSettings /> },
  { id: 18, path: urls.setProfile, element: <ProfileSettings /> },
  { id: 19, path: urls.setBlacklist, element: <BlackedChannel /> },

  //search
  { id: 20, path: urls.search, element: <SearchPost /> },
  { id: 21, path: urls.searchSeries, element: <SearchSeries /> },
  { id: 22, path: urls.searchChannel, element: <SearchChannel /> },

  //profile
  { id: 23, path: urls.profile, element: <ProfileChannel /> },
  { id: 24, path: urls.profilePost, element: <ProfilePost /> },
  { id: 25, path: urls.profileSeries, element: <ProfileSeries /> },

  //channel
  { id: 26, path: urls.channelCreate, element: <ChannelCreate /> },
  { id: 27, path: urls.channel, element: <ChannelHome /> },
  { id: 28, path: urls.channelWebtoon, element: <ChannelWebtoon /> },
  { id: 29, path: urls.channelWebnovel, element: <ChannelWebnovel /> },
  { id: 30, path: urls.channelAbout, element: <ChannelAbout /> },

  // create
  { id: 31, path: urls.postCreate, element: <PostCreate /> },
];
