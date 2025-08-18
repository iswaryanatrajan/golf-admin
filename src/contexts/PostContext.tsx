import React, { useCallback, useEffect, useState } from 'react';
import { deletePost, fetchAllPosts, fetchSinglePosts } from '../api/Posts';


interface IPost {
    createdAt: string;
    id: 1;
    mediaFile: [];
    tags:"#fsdfdsfsdffd";
    text:"new post";
    updatedAt:"2024-01-29T08:33:13.000Z";
    userId: 1;
}

const PostCont = React.createContext<any>({});

export const PostContext = ({ children }: any) => {

    const [posts, setPosts] = useState<IPost[]>([]);
    const [postsCount, setPostsCount] = useState<string>();
    const store_token: string = localStorage.getItem('admin_token') || '';
    const [singlePost, setSinglePost] = useState<any>();
    const [postId, setPostId] = useState<any>();
    const [deletepostId, setDeletePostId] = useState<any>();
    const [updated, setUpdated] = useState<any>();

    useEffect(() => {
        if (postId) {
            fetchSinglePosts(handleSinglePost, postId);
        }
       
    }, [ setSinglePost, postId]);
    useEffect(() => {
        fetchAllPosts(setPosts, setPostsCount, store_token);
        if(deletepostId){
            deletePost(deletepostId, setPosts)
        }
    }, [deletepostId, updated ]);

    const handlePost = useCallback((value: any) => {
        return setPosts(value);
    }, [posts]);
    const handlePostId = useCallback((value: any) => {

        if(!store_token){
            router("/login-page");
        }
        setPostId(value)
        
    }, [postId])
        
    const handleSinglePost = useCallback((value: any) => {
        setSinglePost(value)
    }, [singlePost]);
    const handleDeletePost = useCallback((value: any) => {
        setDeletePostId(value)
    }, [deletepostId]);
    const value = { handlePost,handlePostId,handleDeletePost,setUpdated, singlePost, posts, postsCount }

    return <PostCont.Provider value={value}> {children}</PostCont.Provider>
}

export const postContextStore = () => React.useContext(PostCont);

function router(arg0: string) {
    throw new Error('Function not implemented.');
}

