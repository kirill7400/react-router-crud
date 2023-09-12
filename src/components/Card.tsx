import {ICard} from "../common/interfaces";
import {useLocation, useNavigate} from "react-router-dom";
import {fetch, POSTS} from '../common/urls'
import {useEffect, useState} from "react";

export default function Card({ card, mode = 'list' }:{ key?: number, card?: ICard, mode?: string }) {
  const navigate = useNavigate()
  const location = useLocation();

  const [item, setItem] = useState<ICard>()
  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState('')

  const getData = () => {
    fetch(POSTS + '/' + location.pathname[7], 'get')
      .then((res:{ post:ICard }) => setItem(res.post))
  }

  useEffect(() => {
    if (mode === 'one') {
      getData()
    }
    else {
      setItem(card)
    }
  }, []);

  const prettyDate = (v: number) => {
    let date = new Date(v)
    const addZero = (v: number) => v.toString().length === 2 ? v : '0' + v
    return addZero(date.getDate()) + '.' + addZero(date.getMonth()) + '.' + date.getFullYear()
  }

  const openPost = () => {
    mode === 'list' && navigate('/posts/' + item?.id)
  }

  const deletePost = () => {
    fetch(POSTS + '/' + location.pathname[7], 'delete')
      .then(() => navigate('/'))
  }

  const edit = () => {
    fetch(POSTS + '/' + location.pathname[7], 'get')
      .then((res:{ post:ICard }) => {
        setEditMode(true)
        setText(res.post.content)
      })
  }

  const save = () => {
    fetch(POSTS + '/' + location.pathname[7], 'put', { content: text })
      .then(() => {
        setEditMode(false)
        getData()
      })
  }

  const exit = () => {
    setEditMode(false)
  }

  const toStart = () => {
    navigate('/')
  }

  return(
    <>
      {
        editMode ?
          <div className='NewPost'>
            <textarea value={ text } onChange={e => setText(e.target.value)} cols={ 40 } rows={ 10 }/>
            <button onClick={ save }>Сохранить</button>
            <button onClick={ exit }>Отмена</button>
          </div> :
          <div onClick={ openPost } className="Card">
            <div className="Card-header">
              <div className="Card-userName">
                Иван Иванов
              </div>
              <div className="Card-date">
                { item?.created ? prettyDate(item.created) : null }
              </div>
            </div>
            <div className="Card-body">
              { item?.content }
            </div>
            { mode === 'one' ?
              <div className='CardBtn'>
                <button onClick={ edit }>Редактировать</button>
                <button onClick={ deletePost }>Удалить</button>
                <button onClick={ toStart }>Отмена</button>
              </div> : null
            }
          </div>
      }
    </>

  )
}