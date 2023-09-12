import {useState} from "react";
import {POSTS, fetch} from '../common/urls'
import {useNavigate} from "react-router-dom";

export default function NewPost() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const create = () => {
    fetch(POSTS, 'post', { content: text })
      .then(() => navigate('/'))
  }

  const exit = () => {
    navigate('/')
  }


  return (
    <div className='NewPost'>
      <textarea value={ text } onChange={e => setText(e.target.value)} cols={ 40 } rows={ 10 }/>
      <button onClick={ create }>Опубликовать</button>
      <button onClick={ exit }>Отмена</button>
    </div>
  )
}