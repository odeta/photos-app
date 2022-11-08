import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>

      <main className="App-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
