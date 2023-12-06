import symbOk from '../../images/symbOk.svg';
import symbFail from '../../images/symbFail.svg';

function PopupInfo({
  isOpen,
  isOk,
  onClose,
}) {

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} >
      <div className='popup__container'>
        <button
          onClick={onClose}
          className="popup__close-button link"
          type="button"
          aria-label="закрыть окно"
        />
        {isOk
          ? <>
            <h2 className='popup__title'>Успешно</h2>
            <img className='popup__image' src={symbOk} alt='Успешно' />
          </>
          : <>
            <h2 className='popup__title'>Ошибка</h2>
            <img className='popup__image' src={symbFail} alt='Ошибка' />
          </>
        }
      </div>
    </div>
  )
}

export default PopupInfo;