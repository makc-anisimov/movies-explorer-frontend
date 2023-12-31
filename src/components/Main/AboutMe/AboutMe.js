import { Link } from 'react-router-dom';
import avatar from '../../../images/av2.jpg'
export default function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="main__section-title aboutMe__title" >Студент</h2>
      <div className="aboutMe__profile">
        <div className='aboutMe__info'>
          <h3 className="aboutMe__name">Максим</h3>
          <p className="aboutMe__speciality">Web-разработчик, 37 лет</p>
          <p className="aboutMe__description">Я&nbsp;родился в Вологодской области и&nbsp;в&nbsp;данный момент живу в&nbsp;Вологде, закончил электро-энергетический факультет ВоГУ. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь спортом, велопрогулками, футболом и&nbsp;бегом. Предпочитаю активный отдых. С&nbsp;2010 года работаю в&nbsp;компании &laquo;Тензор&raquo;. Интересуюсь актуальными технологиями Web-разработки. Мечтаю полетать на&nbsp;параплане.</p>
          <Link
            to='https://github.com/makc-anisimov/'
            className="link aboutMe__github-link"
            target='_blank'>
            Github
          </Link>
        </div>
        <img className="aboutMe__photo"
          src={avatar}
          alt="Фото профиля"
        />
      </div>
    </section>
  );
}