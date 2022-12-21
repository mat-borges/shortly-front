import RankingPage from './RankingPage.js';
import ShortenUrlPage from './ShortenUrlPage.js';
import UserContext from '../contexts/UserContext.js';
import { useContext } from 'react';

export default function HomePage() {
  const { userInfo } = useContext(UserContext);
  return <>{userInfo.loggedIn ? <ShortenUrlPage /> : <RankingPage />}</>;
}
