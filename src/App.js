import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import Header from './components/Header/Header.js';
import HomePage from './pages/HomePage/HomePage.js';
import OpenShortUrl from './components/OpenShortUrl.js';
import RankingPage from './pages/RankingPage/RankingPage.js';
import ShortenUrlPage from './pages/ShortenUrlPage/ShortenUrlPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import { UserProvider } from './contexts/UserContext.js';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserProvider>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/ranking' element={<RankingPage />} />
          <Route path='/shortenUrl' element={<ShortenUrlPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/:shortUrl' element={<OpenShortUrl />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
