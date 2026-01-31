import { useEffect, useState } from "react";
import { getImagesFromRange } from "../../services/shared.service";
import "./Pictures.css";

export const Pictures = ({ dates }) => {
    const [pictureData, setPictureData] = useState([]);
    const [selectedPicture, setSelectedPicture] = useState(null);

    useEffect(() => {
        if (dates.fromDate && dates.toDate) {
            getImagesFromRange(dates.fromDate, dates.toDate)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setPictureData(res);
                });
        }
    }, [dates.fromDate, dates.toDate]);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const openModal = (picture) => {
        setSelectedPicture(picture);
    };

    const closeModal = () => {
        setSelectedPicture(null);
    };

    return (
        <>
            <div className="pictures-container">
                {pictureData.length > 0 &&
                    pictureData.map((picture, index) => (
                        <figure key={index} className="picture-item" onClick={() => openModal(picture)}>
                            <a>
                                <img src={picture.url} alt={picture.title} />
                            </a>
                            <figcaption>{picture.title}</figcaption>
                            <div className="card-footer">
                                <p>Clicked on: {picture.date}</p>
                                <a target="_blank" href={picture.hdurl} onClick={(e) => e.stopPropagation()}>HD image</a>
                            </div>
                        </figure>
                    ))}
            </div>

            {selectedPicture && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>
                        <img src={selectedPicture.url} alt={selectedPicture.title} />
                        <h2>{selectedPicture.title}</h2>
                        <p>{selectedPicture.explanation}</p>
                    </div>
                </div>
            )}
        </>
    );
};