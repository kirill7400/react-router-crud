import './App.css';
// @ts-ignore
import Cards from "./components/Cards.tsx";
// @ts-ignore
import NewPost from "./components/NewPost.tsx";
// @ts-ignore
import Card from "./components/Card.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Cards/> } />
        <Route path="/posts/new" element={ <NewPost/> } />
        <Route path="/posts/:id" element={ <Card mode={'one'}/> } />
        <Route path="*" element={ <div>404 Not Found</div> } />
      </Routes>
    </div>
  );
}

export default App;
