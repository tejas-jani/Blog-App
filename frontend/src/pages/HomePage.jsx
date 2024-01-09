import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import fetchFromApi from "../api";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
   ; (async () => {
      const  {data:posts}= await fetchFromApi("/posts");      
      setPosts(posts);
    })();
  }, []);

  return (
    <>
    {!!posts.length  && posts.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
}
