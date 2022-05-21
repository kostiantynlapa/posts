import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    let sortedPosts = useMemo(() => {
        if(sort){
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    let sortedPosts = useSortedPosts(posts, sort);
    let sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}
