import {Link} from 'react-router-dom';
import {useState} from 'react';
import FormToEditComment from './FormToEditComment';
import blankProfilePicture from '../images/blank_profile_picture.png';

function Comment({ postsComment, user, setPostsCommentsWrapperToRemoveComment, setPostsCommentsWrapperToUpdateComment}){
    
    
    const [isEditingComment, setIsEditingComment] = useState(false);

    if (isEditingComment){
        return (
            <FormToEditComment
                postsComment={postsComment}
                setPostsCommentsWrapperToUpdateComment = {setPostsCommentsWrapperToUpdateComment}
                setIsEditingComment = {setIsEditingComment}
                editCommentHandler = {editCommentHandler}
            />
        );
    }
}

function deleteCommentHandler(){
    
}