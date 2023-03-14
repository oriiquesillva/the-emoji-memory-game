import "./styles.css";
import Card, { CardProps } from "../Card";
import { useRef, useState } from "react";
import { duplicateRegenerateSortArray } from "../../utils/card-utils";

export interface GridProps {
  cards: CardProps[];
}

export default function Grid({ cards }: GridProps) {
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenerateSortArray(cards);
  });
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)


  const firstCard = useRef<CardProps | null>(null);
  const secondCard = useRef<CardProps | null>(null);
  const unflipped = useRef(false);



  const handleClick = (id: string) => {
    const newStateCards = stateCards.map((card) => {
      if (card.id !== id) return card;

      if (card.flipped) return card;

      if (unflipped.current && firstCard.current && secondCard.current) {

        firstCard.current.flipped = false;
        secondCard.current.flipped = false;
        firstCard.current = null;
        secondCard.current = null;
        unflipped.current = false;
      }

      card.flipped = true;

      if (firstCard.current === null) {
        firstCard.current = card;
      } else if (secondCard.current === null) {
        secondCard.current = card;
      }

      if (firstCard.current && secondCard.current) {
        if (firstCard.current.back === secondCard.current.back) {
          firstCard.current = null;
          secondCard.current = null;
          setMatches(m => m+1);
        } else {
            unflipped.current = true;
        }
        setMoves(m => m+1);
      }

      return card;
    });
    setStateCards(newStateCards);
  };

  const handleRestart = () => {
    setStateCards(duplicateRegenerateSortArray(cards));
    firstCard.current = null;
    secondCard.current = null;
    unflipped.current = false;
    setMoves(0);
    setMatches(0);
  }

  return (
    <>
    <div className="text">
    <h1>THE EMOJI MEMORY GAME</h1>
        <p>Movements: {moves} | Hits: {matches}</p>
        <button onClick={() => handleRestart()}>Restart Game</button>
    </div>
    <div className="grid">
      {stateCards.map((card) => {
        return <Card {...card} key={card.id} handleClick={handleClick} />;
      })}
    </div>
    </>
  );
}
