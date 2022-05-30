import {useState} from 'react';
import {Link} from 'react-router-dom';
import blankProfilePicture from '../images/blank_profile_picture.png';

function FormToSubmitPost({user, setFriendsAuthoredPostsWrapperToAddNewAuthoredPost, setArbitraryUserWrapperToAddNewWallPost, arbitraryUser}){
    const [postFormData, setPostFormData] = useState({
        author_id: user.id,
        body: ''
    });



    function changePostFormDataHandler(event){
        setPostFormData({
            ...postFormData,
            [event.target.name]: event.target.value
        });
    }



    function submitPostFormDataHandler(event){
        event.preventDefault();


        const postFormDataWithImage = new FormData();
        postFormDataWithImage.append('author_id', postFormData.author_id);
        postFormDataWithImage.append('body', postFormData.body);
        postFormDataWithImage.append('recipient_id', (!arbitraryUser ? user.id : arbitraryUser.id));

        if( event.traget.post_photo.files.length > 0){
            postFormDataWithImage.append('post_photo', event.target.post_photo.files[0], event.target.post_photo.value);

        }

        fetch('/api/posts', {
            method: 'POST',
            body: postFormDataWithImage
        })
        .then(response => response.json())
        .then(post =>{
            if ( !setArbitraryUserWrapperToAddNewWallPost){
                setFriendsAuthoredPostsWrapperToAddNewAuthoredPost(post);
            } else {
                setArbitraryUserWrapperToAddNewWallPost(post);
            }
        });

        postFormData.body = '';

    }



    function cancelPostFormDataHandler(){
        setPostFormData({
            ...postFormData,
            body: ''
        });
    }



    return (
        <form onSubmit={submitPostFormDataHandler} className='form-to-submit-post'>
            <Link to ={`/users/${user.id}`} title={user.first_name} className='thumb'>
                <img
                    src={!user.profile_picture_url ? blankProfilePicture : user.profile_picture_url}
                    alt=''
                />
            </Link>

            <fieldset className='form-to-submit-post-fieldset'>
                <div className='form-to_submit-post-input'>
                    <input
                        type='text'
                        name='body'
                        placeholder={
                            setFriendsAuthoredPostsWrapperToAddNewAuthoredPost !== undefined ?
                            `what's on your mind, ${user.first_name}?`
                            : (arbitraryUser.id === user.id ? `What's on your mind?` :  `Write something to ${arbitraryUser.first_name}...`)
                        }
                        value={postFormData.body}
                        onChange={changePostFormDataHandler}
                    />

                </div>
                { /* file input is currently not controlled properly*/}
                <input type='file' name='post_photo'/>
                        <div className='form-to-submit-post-sumbit'>
                            <button>Post to Wall</button>
                            <span className='btn-alternative'>or <strong onClick={cancelPostFormDataHandler}>Cancel</strong></span>
                        </div>
                </fieldset>
        </form>
    );
}


export default FormToSubmitPost;

