import { useState } from "react";
import { Editor } from "../components/Editor";
import fetchFromApi from "../api";
import { Navigate } from "react-router-dom";



export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [postId, setPostId] = useState("");
 
  const createNewPost = async(e)=>{
    e.preventDefault();
    const data = new FormData();
    data.set("title", title)
    data.set("summary",summary)
    data.set("content", content)
    data.set("file", files[0])  
  try{
     const {response,data:post} = await fetchFromApi("/post",{
    method:"POST",
    body:data,
    credentials:"include" 
   })
   if(response.ok){
    setPostId(post._id)
     setRedirect(true);


  }
  }catch(err){

  }
  }

  if(redirect) return <Navigate to={`/post/${postId}`} />
  return (
    <form className="form_for_create_Post" onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter summary"
        value={summary}
        onChange={(e) => setsummary(e.target.value)}
      />
      <input type="file" onChange={(e)=> setFiles(e.target.files)} />
     <Editor value={content} onChange={(newValue) => setContent(newValue)}/>
      <button style={{ marginTop: "10px" }}>Create post</button>
    </form>
  );
};
