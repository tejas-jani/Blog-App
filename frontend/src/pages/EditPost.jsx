import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../components/Editor";
import fetchFromApi from "../api";

export function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
   

  const setPost=(post)=>{
    const {title,summary,content} =post;
    setTitle(title);
    setsummary(summary);
    setContent(content);
  }
  const { id: postId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const {data: post} = await fetchFromApi(`/post/${postId}`);
         
        if(!post.err)
        setPost(post);

      } catch (err) {
          alert("something is wrong");
      }
    })();
  }, []);
  const editPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", postId);
    if(files[0])
    data.set("file", files[0]); 
  try{  const {response }= await fetchFromApi("/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
      if(response.ok)
    setRedirect(true);
  }catch(err){

  }
  };
  if(redirect) return <Navigate to={`/post/${postId}`} />
  return (
    <form className="form_for_create_Post" onSubmit={editPost}>
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
      <input type="file" id="fileInput" onChange={(e) => setFiles(e.target.files)} />
     
      <Editor value={content} onChange={(newValue) => setContent(newValue)} />
      <button style={{ marginTop: "10px" }}>Update post</button>
    </form>
  );
}

// Where to Find Wii ISO Fullmetal Alchemist: Prince of the Dawn Jpn

// wfckjaenwjkankednkaewd