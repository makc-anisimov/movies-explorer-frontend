import avatar from '../../../images/avatar.png'
import Portfolio from '../Portfolio/Portfolio';
export default function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutProject__title" >Студент</h2>
      <h3 className="aboutProject__title">Максим</h3>
      <p className="">Фронтенд-разработчик, 37 лет</p>
      <p className="">Я&nbsp;родился Вологодской области и&nbsp;в&nbsp;данный момент живу в&nbsp;Вологде, закончил факультет экономики СГУ. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь спортом, велопрогулками, футболом и&nbsp;бегом. Предпочитаю активный отдых. С&nbsp;2010 года работаю в&nbsp;компании &laquo;Тензор&raquo;. Интересуюсь последними технологиями Web-разработки. Мечтаю полетать на&nbsp;дельта-плане</p>
      <img
        src={avatar}
        alt="Фото профиля"
      />
      <a className="link" href="https://github.com/makc-anisimov/">Github</a>
      <Portfolio />
    </section>
  );

}