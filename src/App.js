import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-logo">Photos</h1>

        {location.pathname !== '/photos' && (
          <Link className="Link" to='/photos'>Back to all photos</Link>
        )}
      </header>

      <main className="App-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
