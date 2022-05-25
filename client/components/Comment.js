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
    fetch('/api/comments/${postsComment.id}'), {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            response.json().then(comment => setPostsCommentsWrapperToRemoveComment(comment));
        }
    });
}

function editCommentHandler(){
    setIsEditingComment(!isEditingComment);
}


return (
    <article className='comment'>
        <Link to={`/users/${postsComment.author_id}`} title={postsComment.author.first_name} className='thumb'>
            <img 
            src={!postsComment.author.profile_picture_url ? blankProfilePicture : postsComment.author.profile_picture}
            alt=''
            />
        </Link>
        <div className='comment-body'>
            <h2>
                <Link to={`/users/${postsComment.author.id}`}>
                    {`${postsComment.author.first_name}`}
                </Link>
            </h2>
        </div>
    </article>
)