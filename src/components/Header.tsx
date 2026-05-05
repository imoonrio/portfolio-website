export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="YOUR NAME home">
        YOUR NAME
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
