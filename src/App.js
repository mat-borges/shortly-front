import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Loading />} />
        <Route path='/shortenUrl' element={<Loading />} />
        <Route path='/signUp' element={<Loading />} />
        <Route path='/signIn' element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
