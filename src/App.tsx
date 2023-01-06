import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/Pizza-react/" element={<Home />} />
          <Route path="/Pizza-react/cart" element={<Cart />} />
          <Route path="/Pizza-react/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
