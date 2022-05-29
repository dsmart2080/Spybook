//HomeFeed

import {useState, useEffect} from 'react';
import Post from './Post';
import FormToSubmitPost from './FormToSubmitPost';


//Enclosure component for logged-in user's friends' authored posts.
function HomeFeed({user}){

    const [friendsAuthoredPosts, setFriendsAuthoredPosts] = useState([]);

    useEffect(()=> {
        fetch('/api/home_feed')
        .then(posts => setFriendsAuthoredPosts(post));
    }, []);

    function setFriendsAuthoredPostsWrapperToRemoveAuthoredPost(deleteAuthoredPost){
        setFriendsAuthoredPosts(friendsAuthoredPost.filter(authorPost => deleteAuthoredPost.id !== deletedAuthoredPost.id));
    }

    function setFriendsAuthoredPostsWrapperToUpdateAuthoredPost(updatedAuthoredPost){
        setFriendsAuthoredPosts(friendsAuthoredPfosts.map(authoredPost => {
            if (authoredPost.id === updatedAuthoredPost.id)
            {
                return updatedAuthoredPost;
            } else {
                return authoredPost;
            }
            //give a replace with the updated authored post.
        }));
    }


    const friendsAuthoredPostsArrJSX = friendAuthoredPosts.map(
        friendsAuthoredPost => {
            return (
            <Post
                key={friendsAuthoredPost.id}
                post={friendsAuthoredPost}
                user={user}
                setFriendsAuthoredPostsWrapperToRemoveAuthoredPost={setFriendsAuthoredPostsWrapperToRemoveAuthoredPost}
                setFriendsAuthoredPostsWrapperToUpdateAuthoredPost={setFriendsAuthoredPostWrapperToUpdateAuthoredPost}
            />
            );
        }
    );



    function setFriendsAuthoredPostsWrapperToAddNewAuthoredPost(newAuthoredPost){
        setFriendsAuthoredPosts([newAuthoredPost, ...friendAuthoredPost]);
    }


    return (
        <main className='content'>
            <section className='content-main home-feed'>
            <FormToSubmitPost user={user} setFriendsAuthoredPostsWrapperToAddNewAuthoredPost={setFriendsAuthoredPostsWrapperToAddNewAuthoredPost}/>
            <div className='posts'>
                {friendsAuthoredPostsArrJSX}
            </div>
            </section>
        </main>
    );
}

export default HomeFeed;
