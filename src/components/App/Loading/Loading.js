import Preloader from "../../Movies/Preloader/Preloader";

export default function Loading() {
  return (
    <section className="loading">
      <div className="loading__wrapper">
        <Preloader isShowPreloader={true} />
      </div>
    </section>

  )
}