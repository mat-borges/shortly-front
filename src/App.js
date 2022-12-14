import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
