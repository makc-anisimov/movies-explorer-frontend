import { Link } from "react-scroll";

export default function NavTab() {
  return (
    <menu className="navTab">
      <Link
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        to="aboutProject"
        className="link navTab__link"
      >
        О проекте
      </Link>
      <Link
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        to="techs"
        className="link navTab__link"
      >
        Технологии
      </Link>
      <Link
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        to="aboutMe"
        className="link navTab__link"
      >
        Студент
      </Link>
    </menu>
  );
}