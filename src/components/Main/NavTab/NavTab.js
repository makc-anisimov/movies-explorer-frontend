import { Link } from "react-router-dom";

export default function NavTab() {
  return (
    <menu className="navTab">
      <Link to="" className="link navTab__link">О проекте</Link>
      <Link to="" className="link navTab__link">Технологии</Link>
      <Link to="" className="link navTab__link">Студент</Link>
    </menu>
  );
}