import RankingPage from '../RankingPage/RankingPage.js';
import ShortenUrlPage from '../ShortenUrlPage/ShortenUrlPage.js';

export default function HomePage() {
  return <>{localStorage.token ? <ShortenUrlPage /> : <RankingPage />}</>;
}
