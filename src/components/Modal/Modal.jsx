export function Modal({ show, title, body, onClose }) {
    if (!show) return null;

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={handleClose}>
                    &times;
                </button>
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
        </div>
    );
}