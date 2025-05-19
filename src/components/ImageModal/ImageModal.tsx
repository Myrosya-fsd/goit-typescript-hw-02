import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";
import type { UnsplashImage } from "../../types";

interface ImageModalProps {
  image: UnsplashImage | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (image) {
      Modal.setAppElement("#root");
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [image]);

  if (!image) return null;

  const { alt_description, user, location, urls } = image;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      appElement={document.getElementById("root")!}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <img src={urls.regular} alt={alt_description || "Image"} />
        <div className={styles.modalInfo}>
          <h2>{alt_description || "No description available"}</h2>
          <p className={styles.author}>
            Photo by{" "}
            <a href={user.links.html} target="_blank" rel="noopener noreferrer">
              {user.name}
            </a>
          </p>
          {location && (
            <p className={styles.location}>
              Location: {location.name || "Unknown"}
            </p>
          )}
        </div>
      </div>
      <button className={styles.btnClose} onClick={onClose}>
        ×
      </button>
    </Modal>
  );
};

export default ImageModal;
