import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h1 className="footer__title">
          <Link href="/">DinnerChamp</Link>
        </h1>
        <div className="footer__links">
          <a href="https://github.com/mirsadikov" target="_blank" rel="noreferrer">
            <GitHubIcon />
            <span>My Github</span>
          </a>
          <a href="mailto:mirabror9545@gmail.com">
            <EmailIcon />
            <span>Email me</span>
          </a>
        </div>
        <p className="footer__text">
          This website is a course project made for BISP module at the Westminster International University in Tashkent.
        </p>
        <p>
          &copy; 2023 by Mirabror Sodikov. 00012860
        </p>
      </div>
    </footer>
  );
}
