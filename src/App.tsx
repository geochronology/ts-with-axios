// Source: https://medium.com/swlh/interacting-with-restful-apis-using-typescript-react-hooks-and-axios-part-1-af52920ae3e4
import React, { useState } from 'react';
import axios from "axios"
import './App.css';

interface IPost {
  userId: number;
  id?: number;
  title: string;
  body: string;
}
const defaultPosts: IPost[] = [];

const App: React.FC = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  React.useEffect(() => {

    axios
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch(ex => {
        const err =
          ex.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(err);
        setLoading(false);
      })

  }, []);

  return (
    <div className="App">
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default App;
