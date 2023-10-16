import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import './App.css';
import CurrenciesList from './components/CurrenciesList';
import CurrencyHistory from './components/CurrencyHistory';

function Layout() {
  return <Outlet />;
}

function App() {
  return (
    <Router>
      <div id="wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CurrenciesList />} />
            <Route path="/currency/:symbol" element={<CurrencyHistory />} />
            <Route path="*" element={<div>Page not found : (</div>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
