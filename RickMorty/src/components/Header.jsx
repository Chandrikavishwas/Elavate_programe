import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="title">Rick and Morty Encyclopedia</h1>
          <p className="subtitle">Explore the multiverse, one character at a time</p>
        </div>
      </div>
    </header>
  );
}

export default Header;