
export default function AboutProject() {
  return (
      <section className="aboutProject" id={'aboutProject'}>
        <h2 className="main__section-title aboutProject__title" >О проекте</h2>
        <div className="aboutProject__info">
          <div className="aboutProject__card">
            <div className="aboutProject__card-title">Дипломный проект включал 5&nbsp;этапов</div>
            <div className="aboutProject__card-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</div>
          </div>
          <div className="aboutProject__card">
            <div className="aboutProject__card-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</div>
            <div className="aboutProject__card-text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
          </div>
        </div>
        <div className="aboutProject__progress">
          <div className="aboutProject__progress-timing aboutProject__progress-timing_active">1&nbsp;неделя</div>
          <div className="aboutProject__progress-timing">4&nbsp;недели</div>
          <div className="aboutProject__progress-production">Back-end</div>
          <div className="aboutProject__progress-production">Front-end</div>
        </div>
      </section>
  );
}