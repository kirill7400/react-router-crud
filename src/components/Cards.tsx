// @ts-ignore
import Card from "./Card.tsx";
import {useEffect, useState} from "react";
import {ICard} from "../common/interfaces";
import {fetch, POSTS} from "../common/urls";
import {Link, useNavigate} from "react-router-dom";

export default function Cards() {
  const [cards, setCards] = useState<ICard[]>([])
  const navigate = useNavigate()

  const createPost = () => {
    navigate('/posts/new')
  }

  useEffect(() => {
    fetch(POSTS, 'get')
      .then((res: any) => setCards(res))
  }, []);
  return(
    <div className="Cards">
      <button onClick={ createPost }>Создать пост</button>
      { cards?.map(card => <Card key={ card.id } card={ card }/>) }
    </div>
  )
}