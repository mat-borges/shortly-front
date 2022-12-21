import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import Header from './components/Header.js';
import Loading from './components/Loading';
import { UserProvider } from './contexts/UserContext.js';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <UserProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Loading />} />
          <Route path='/shortenUrl' element={<Loading />} />
          <Route path='/signUp' element={<Loading />} />
          <Route path='/signIn' element={<Loading />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
