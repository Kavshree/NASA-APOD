import "./RandomDay.css"

export const RandomDay = ({ dates }) => {
    const handleRandom = () => {
        const startDate = new Date('1995-06-16');
        const endDate = new Date();
        const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        const randomDate = new Date(randomTime).toISOString().slice(0, 10);
        
        dates.setFrom(randomDate);
        dates.setTo(randomDate);
    };

    return (
        <span title="Select a Random Day!" className="random-wrapper" onClick={handleRandom}>🎲</span>
    );
};