import React from 'react';
import MyButton from "../UI/buttons/MyButton";

const Post = ({post, deletePost}) => {
    
    return (
        <div className="post">
           <div className="content">

                <h1>{post.title}</h1>
                <p>{post.body}</p>
           </div>
            <MyButton onClick={() => deletePost(post)}>Delete</MyButton>
        </div>
    );
};

export default Post;