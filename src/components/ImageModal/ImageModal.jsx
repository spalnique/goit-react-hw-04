import ReactModal from 'react-modal';
import style from '../ImageModal/ImageModal.module.css';
import { IoCloseCircleOutline } from 'react-icons/io5';

const ImageModal = ({ isOpen, image, closeModal }) => {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName={style.modalOverlay}
      className={style.modalContainer}
      bodyOpenClassName={style.noScroll}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}>
      <div
        className={style.imageWrapper}
        onContextMenu={(e) => {
          e.preventDefault();
          closeModal();
        }}>
        {image && (
          <img
            className={style.modalImage}
            src={image.urls.regular}
            alt={image.alt_description}
            onClick={closeModal}
            onContextMenu={closeModal}
          />
        )}
        <ul className={style.descList}>
          <li className={style.descItem}>
            <span className={style.descItemTitle}></span>
            <span className={style.descItemText}></span>
          </li>
          <li className={style.descItem}>
            <span className={style.descItemTitle}></span>
            <span className={style.descItemText}></span>
          </li>
          <li className={style.descItem}>
            <span className={style.descItemTitle}></span>
            <span className={style.descItemText}></span>
          </li>
          <li className={style.descItem}>
            <span className={style.descItemTitle}></span>
            <span className={style.descItemText}></span>
          </li>
        </ul>
        <span className={style.modalClose} onClick={closeModal}>
          <IoCloseCircleOutline size={24} />
        </span>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
