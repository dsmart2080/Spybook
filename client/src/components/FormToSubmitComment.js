import {useState} from 'react';

function FormToSubmitComment({post,user,setPostsCommentsWrapperToAddNewComment}){

    const [commentFormData, setCOmmentFormData] = userState({
        author_id: user.id,
        post_id: post.id,
        body: ''
    });

    function change
}