import { useEffect, useState, useTransition } from "react";
import { getImagesFromRange } from "../../services/shared.service";
import "./Pictures.css";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";

export const Pictures = ({ dates }) => {
    const [pictureData, setPictureData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (dates.fromDate && dates.toDate) {
            setLoading(true)
            getImagesFromRange(dates.fromDate, dates.toDate)
                .then((res) => res.json())
                .then((res) => {
                    setLoading(false)
                    startTransition(() => {
                        setPictureData(res);
                    })
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

    if(isPending || loading) {
        return (
            <div className="pictures-container">
                <SkeletonLoader />
            </div>
        )
    }

    return (
        <>
            <div className="pictures-container">
                {pictureData.length > 0 &&
                    pictureData.map((picture, index) => (
                        <figure key={index} className="picture-item" onClick={() => openModal(picture)}>
                             {picture.url && <a>
                                <img src={picture.url} alt={picture.title} />
                            </a> }
                            {!picture.url && <span className="no-img">
                                <span className="middle">No image found</span>
                                </span>}
                            <figcaption>{picture.title}</figcaption>
                            <div className="card-footer">
                                <p>{picture.date}</p>
                                {picture.hdurl && <a target="_blank" href={picture.hdurl} onClick={(e) => e.stopPropagation()}>HD image</a>}
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