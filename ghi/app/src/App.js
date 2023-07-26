import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

function App() {





  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="customer">
            {/* add element={CreateCustomer} directly below */}
            <Route path="new" />
          </Route>

          <Route path="salesperson">
            <Route path="new" />
          </Route>

          <Route path="salerecord">
            {/* add element = component name and any props */}
            <Route path="new" />
            {/* add component and any props */}
            <Route index  />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
