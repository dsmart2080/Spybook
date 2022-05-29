import {useState} from 'react';

function FormToSubmitComment({post,user,setPostsCommentsWrapperToAddNewComment}){

    const [commentFormData, setCOmmentFormData] = userState({
        author_id: user.id,
        post_id: post.id,
        body: ''
    });

    function changeCommentFormDataHandler(event){
        setCOmmentFormData({
            ...commentFormData,
            [event.target.name]: event.target.value
        });
    }


    function submitCommentFormDataHandler(event){
        event.preventDefault();


        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentFormData)
        })
        .then(response => response.json())
        .then(comment => setPostsCommentsWrapperToAddNewComment(comment));

        commentFormData.body ='';


    }




    return (
        <form onSubmit={submitCOmmentFormDataHandler} className='form-to-submit-comment'>
            <fieldset className='form-to-submit-comment-fieldset'>
                <div className='form-to-submit-comment-input'>
                    <input
                        type='text'
                        name='body'
                        placeholder='write a comment...'
                        value={commentFormData.body}
                        onChange={changeCommentFormDataHandler}
                    />
                </div>
            </fieldset>
        </form>
    );
}

export default FormToSubmitComment;

