
import {Link} from "react-router-dom"
import {formatISO9075} from "date-fns"
export const Post = ({title,cover,author,_id,summary,content,createdAt}) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
        <img src={`import.meta.env.VITE_SERVER_BASE_URL/${cover}`} />        
        </Link>
      </div>
      <div className="content">
      <Link to={`/post/${_id}`}>
         <h2> {title}</h2>
        </Link>
        <p className="info">
          <a href="#">by @{author?.username}</a>
          <time> {formatISO9075(createdAt)} </time>
        </p> 
        <p>
          {summary}
        </p>
      </div>
    </div>
  );
};
