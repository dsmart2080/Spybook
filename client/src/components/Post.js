import Comment from './Comment';
import {Link} from 'react-router-dom';
import FormToSubmitComment from './FormToSumitComment';
import {useState} from 'react';
import FormToEditPost from './FormToEditPost';
import blankProfilePicture from '../images/blank_profile_pciture.png';
import DeleteIcon from '@mui/icons-material/Delete';


function Post({post, user, setArbitraryUserWrapperToRemoveWallPost, setFriendsAuthroedPostsWrapper}){
    
    const [postsComments, setPostsComments] = useState(post.comments);
    const [isEditingPost, setIsEdidtingPost] = useState(false);

    const [postsLikes, setPostsLikes] = useState(post.likes);
    const isPostLiked = postsLikes.map(like => like.liker_id).includes(user.id);


    function setPostsCommentsWrapperToRemoveComment(deletedComment){
        setPostsComments(postsComments.filter(
            comment => comment.id !== deletedComment.id
        ));
    }

    function setPostsCommentsWrapperToUpdateComment(updatedComment){
        setPostsComments(postsComments.map(comment => {
            if(comment.id === updatedComment.id){
                return updatedComment;
            }
            else{
                return comment;
            }
        }));
    }

    const postsCommentsArrJSX = postsComments.map(
        postsComment => {
            return (
                <Comment
                    key={postsComment.id}
                    postsComment={postsComment}
                    user={user}
                    setPostsCommentsWrapperToRemoveComment={setPostsCommentsWrapperToRemoveComment}
                    setPostsCommentsWrapperToUpdateComment={setPostsCommentsWrapperToUpdateComment}
                />
            );
        }
    );



    if (isEditingPost){
        return (
            <FormToEditPost 
                post={post}
                setArbitraryUserWrapperToUpdateWallPost={setArbitraryUserWrapperToUpdateWallPost}
                setIsEditingPost={setIsEditingPost}
                setFriendsAuthoredPostsWrapperToUpdateAuthoredPost = {setFriendsAuthoredPostsWrapperToUpdateAuthoredPost}
                user = {user}
                postsLikes = {postsLikes}
                isPostLiked={isPostLiked}
                toggleLIkePostHandler={toggleLikePostHandler}
                editPostHandler={editPostHandler}
                postsCommentsArrJSX={postsCommentsArrJSX}
                setPostsCommentsWrapperToAddNewCommment = {setPostsCommentsWrapperToAddNewComment}
                />
        );
    }
    

    function setPostsCommentsWrapperToAddNewComment(newComment){
        setPostsComments([...postsComments, newComment]);
    }


    function deletePostHandler(){
        fetch(`/api/posts/${post.id}`,{
            method: 'DELETE'
        })
        .then(response =>{
            if (response.ok){
                response.json().then(post => {
                    if (!setFriendsAuthoredPostsWrapperToRemoveAuthoredPost)
                    {
                        setArbitraryUserWrapperToRemoveWallPost(post);
                    }
                    else {
                        setFriendsAuthoredPostsWrapperToRemoveAuthoredPost(post);
                    }
                });
            }
        });
    }




    function editPostHandler(){
        setIsEditingPost(!isEditingPost);
    }



    

    
}