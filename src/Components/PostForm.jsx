import React from 'react';
import MyInput from "../UI/inputs/MyInput";
import MyButton from "../UI/buttons/MyButton";
import {useState} from "react";

const PostForm = ({create}) => {
    let [post, setPost] = useState({title: '', body: ''});

    function addPost(e){
        e.preventDefault();
        const newPost = {...post, id: Date.now(), key: Date.now(),};
        create(newPost);
        setPost({title: '', body: ''});
    }



    return (
        <form action="" >
            <MyInput value={post.title}
                     onChange = {(e) => setPost({...post, title: e.target.value})}
                     placeholder = "Введите название поста"/>
            <MyInput value={post.body}
                     onChange = {(e) => setPost({...post, body: e.target.value})}
                     placeholder = "Введите описание"/>
            <MyButton  onClick = {addPost}>Отправить</MyButton>
        </form>
    );
};

export default PostForm;