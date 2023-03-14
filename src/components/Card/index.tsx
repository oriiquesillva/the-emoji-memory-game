import "./styles.css";

export interface CardProps {
  id: string;
  flipped?: boolean;
  back: string;
  handleClick?: (id: string) => void;
}

export default function Card({ flipped = false, back, handleClick, id }: CardProps) {
  const cardContentClassNames = ["card-content"];
  flipped && cardContentClassNames.push("card-content-flipped");

  const handleClickFn = (id: string) => {
    if (handleClick) {
      handleClick(id);
    }
  };

  return (
    <div className="card" onClick={() => handleClickFn(id)}>
      <div className={cardContentClassNames.join(" ")}>
        <div className="card-face card-face-front">?</div>
        <div className="card-face card-face-back">{back}</div>
      </div>
    </div>
  );
}
