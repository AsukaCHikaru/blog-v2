import React from 'react';

import '../styles/footer.css';

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}{' '}
    <a
      className="footer--link"
      href="https://asukachikaru.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      asukachikaru.com
    </a>
  </footer>
);

export default Footer;
