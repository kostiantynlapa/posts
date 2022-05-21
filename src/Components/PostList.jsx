import React, {useEffect, useState} from 'react';
import Post from "./post";
import PostForm from "./PostForm";
import Filter from "./Filter";
import MyModal from "../UI/MyModal/MyModal";
import MyButton from "../UI/buttons/MyButton";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPagesArray, getPagesCount} from "./utils/pages";
import Pagination from "./Pagination";

const PostList = (props) => {
    let [posts, setPosts] = useState([]);
    let [filter, setFilter] = useState({sort: '', query: ''})
    let [visible, setVisible] = useState(false);

    let [totalPages, setTotalPages] = useState(0);
    let [limit, setLimit] = useState(10);
    let [page, setPage] = useState(1);

    let [fetchPosts, isPostsLoading, postError] = useFetching(async () =>{
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        let totalCount  = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    })



    useEffect(() =>{
        fetchPosts();
    }, [page] )

    // let sortedPosts = useSortedPosts(posts, filter.sort);
    let sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);



    function changePage(page){
        setPage(page);
    }

    function createPost(newPost){
        setPosts([...posts, newPost]);
        setVisible(false)
    }
    function deletePost(post){
        setPosts(posts.filter(p => p.id !== post.id));
    }


    return (
        <div>

            <MyButton style={{marginTop: 30, marginBottom: 30}} onClick={() => setVisible(true)}>Создать пост</MyButton>

            <MyModal visible = {visible} setVisible={setVisible}>
                <PostForm create = {createPost}/>
            </MyModal>
            <h1>{props.title}</h1>
            <hr style={{margin: '20px 0'}}/>
            <Filter filter = {filter} setFilter={setFilter} />
            {postError
                && <h1>произошла ошибка {postError}</h1>

            }
            {isPostsLoading
                ? <div style={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}><Loader/></div>
            : <TransitionGroup>
                    {sortedAndSearchedPosts.map(post =>
                        <CSSTransition
                            key={post.key}
                            timeout={500}
                            classNames="post">
                            <Post post = {post} deletePost = {deletePost}/>
                        </CSSTransition>)}
                </TransitionGroup>
            }

            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
        </div>
    );
};

export default PostList;