import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import Header from './components/Header.js';
import HomePage from './pages/HomePage.js';
import RankingPage from './pages/RankingPage.js';
import ShortenUrlPage from './pages/ShortenUrlPage.js';
import SignInPage from './pages/SignInPage.js';
import SignUpPage from './pages/SignUpPage.js';
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
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
