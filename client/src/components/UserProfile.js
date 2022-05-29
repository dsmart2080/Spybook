import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Post from './Post';
import FormToSubmitPost from './FormToSubmitPost';
import blankCoverPhoto from '../images/blank_cover_photo.png';
import blankProfilePicture from '../images/blank_profile_picture';


function UserProfile({user, setUser}){

    const [arbitaryUser, setArbitraryUser] = useState(null);
    const params = useParams();


    useEffect(() => {
        fetch(`/api/users/${params.id}`)
        .then(response => response.json())
        .then(user => setArbitraryUser(user));


        //Scroll to top of user's page after user's name is clicked
        window.scrollTo(0,0);
    }, [params.id]);


    //need this if-statement for `TypeError: cannot read properties of null`
    if (!arbitraryUser){
        return(
            <main className='content'>
                <section className='content-main' sytle={{margin: '0 auto', textAlign:'center'}}>
                    Loading....
                </section>
            </main>
        );
    }


    //Using this component to delete wall post using a UserWrapper.
    function setArbitraryUserWrapperToRemoveWallPost(deletedWallPost){
        setArbitraryUser({
            ...arbitraryUser,
            wall_posts: arbitraryUser.wall_posts.filter(wallPost => wallPost.id !== deletedWallPost.id)
            //Winnow out the deleted wall post
        });
    }






    function setArbitraryUserWrapperToUpdateWallPost(updatedWallPost){
        setArbitraryUser({
            ...arbitraryUser,
            wall_posts: arbitraryUser.wall_posts.map(wallPost =>{
                if(wallPost.id === updatedWallPost.id){
                    return updatedWallPost;
                } else{
                    return wallPost;
                }
            })
        });
    }



    //
    const arbitraryUsersWallPostsArrJSX = [...arbitraryUser.wall_posts].reverse().map(
        arbitraryUsersWallPost => {
            return(
                <Post
                    key={arbitraryUsersWallPost.id}
                    post={arbitraryUsersWallPost}
                    user={user}
                    setArbitraryUserWrapperToRemoveWallPost={setArbitraryUserWrapperToRemoveWallPost}
                    setArbitraryUserWrapperToUpdateWallPost={setArbitraryUserWrapperToUpdateWallPost}
                />
            );
        }
    );


    function setArbitraryUserWrapperToAddNewWallPost(newWallPost){
        setArbitraryUser({
            ...arbitraryUser,
            wall_posts: [
                ...arbitraryUser.wall_posts,
                newWallPost
                //Update the newly submitted wall post
            ]
        });
    }




    const arbitraryUsersFriendsArrJSX = arbitraryUser.assertive_friendships.map(
        assertiveFriendship => {
            return (
                <li key={assertiveFriendship.friend.id}>
                    <Link to={`/users/${assertiveFriendship.friend.id}`} title={assertiveFriendship.friend.first_name} className='thumb'>
                        <img 
                            src={!assertiveFriendship.friend.profile_picture_url ? blankProfilePicture : assertiveFriendship.friend.profile_picture_url}
                            alt=''
                        />
                    </Link>
                </li>
            );
        }
    );




    function addFriendshipHandler(){
        fetch('/api/friendships', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                user_id: user.id,
                friend_id: arbitraryUser.id
            })
        })

        .then(response => {
            if(response.ok){
                response.json().then(newFriendship => setUser({
                    ...user,
                    assertive_friendships: [
                    ...user.assertive_friendships,
                    newFriendship
                    ]
                }));
            }
        });

        fetch('/api/friendships',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: arbitraryUser.id,
                friend_id: user.id
            })
        })
        .then(response => {
            if (response.ok){
                response.json().then(newFriendship => setArbitraryUser({
                    ...arbitraryUser,
                    assertive_friendships: [
                    ...arbitraryUser.assertive_friendships,
                    newFriendship // appends new friendship
                    ]
                }));
            }
        });
    }


    function deleteFriendshipHandler(){
        var friendshipID1;
        for (var friendship of user.assertive_friendships){
            if (friendship.user_id === user.id && friendship.friend_id === arbitraryUser.id){
                friendshipID1 = friendship.id;
            }
        }


        fetch(`/api/friendships/${friendshipID1}`,{
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok){
                response.json().then(deleteFriendship => setUser({
                    ...user,
                    assertive_friendships: user.assertive_friendships.filter(assertiveFriendship => assertiveFriendship.id !== deleteFriendship.id)
                }));
            }
        });


        //Case when a friendship is deleted.
        //If A deletes B, then B deletes A.
        let friendshipID2;
        for (let friendship of arbitraryUser.assertive_friendships){
            if (friendship.user_id === arbitraryUser.id && friendship.friend_id === user.id){
                friendshipID2 = friendship.id;
            }
        }

        fetch(`/api/friendships/${friendshipID2}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok){
                response.json().then(deletedFriendship => setArbitraryUser({
                ...arbitraryUser,
                assertive_friendships: arbitraryUser.assertive_friendships.filter(assertiveFriendship => assertiveFriendship.id !== deletedFriendship.id)
                }));
            }
        });
    }


    function submitProfilePictureHandler(event){
        event.preventDefault();


        const profilePicture = new FormData();
        if (event.target.profile_picture.files.length > 0 ){
            profilePicture.append('profile_picture', event.target.profile_picture.files[0], event.target.profile_picture.value);
        }

        fetch(`/api/users/${arbitraryUser.id}/attach_new_profile_picture`,{
            method:'POST',
            body: profilePicture
        })
        .then(response => response.json())
        .then(user => {
            setArbitraryUser(user);
            setUser(user);
        });
    }


    //SubmitCoverPhotoHandler
    function submitCoverPhotoHandler(event){
        event.preventDefault();

        //Don't nest the key under `user` because strong params is not required in the backend
        const coverPhoto = new FormData();
        if (event.target.cover_photo.files.length > 0){
            coverPhoto.append('cover_photo', event.target.cover_photo.files[0], event.target.cover_photo.value);
        }

        fetch(`/api/users/${arbitraryUser.id}/attach_new_cover_photo`,{
            method: 'POST',
            body: coverPhoto
        })
        .then(response => response.json())
        .then(user => {
            setArbitraryUser(user);
            setUser(user);
        });

    }






    return (
        <main className='content'>
            <header className='content-header' style={{background: `url(${!arbitraryUser.cover_photo_url ? blankCoverPhoto : arbitraryUser.cover_photo_url})`}}>
                <h1>{`${arbitraryUser.first_name} ${arbitraryUser.last_name}`}</h1>
                {arbitraryUser.id === user.id ?
                    <form onSubmit = {submitCoverPhotoHandler}>
                        {/* Image preview */}
                        <input type='file' name='cover_photo'/>
                        <button className='content-header-btn'>Add Cover Photo</button>
                    </form> 
                    : (user.assertive_friendships.map(assertiveFriendship => assertiveFriendship.friend.id).includes(arbitraryUser.id) ? <button onClick = {deleteFriendshipHandler} className = 'content-header-btn'>Friends</button> : <button onClick={addFriendshipHandler}
                    className='content-header-btn'>Add Friend</button>)} {/* ternary nested statement*/}
            </header>

            
            <section className='content-sidebar'>
            <img
                src={!arbitraryUser.profile_picture_url ? blankProfilePicture : arbitraryUser.profile_picture_url}
                alt=''
                className='profile-picture'
            />
            <div className='profile-info'>
                <h2>{arbitraryUser.first_name}</h2>
                <p>
                    Getting to hack people's data for ads and money.
                </p>
            </div>
            <ul className='profile-nav'>
                <li><a href=''>WALL</a></li>
                <li><a href=''>ABOUT</a></li>
                <li><a href=''>FRIENDS</a></li>
                <li><a href=''>PHOTOS</a></li>
            </ul>

            <ul className='profile-friends'>
                {arbitraryUsersFriendsArrJSX}
            </ul>
            </section>

            <section className='content-main'>
                {arbitraryUser.id === user.id? 
                <form onSubmit={submitProfilePictureHandler}>
                
                    <input type='file' name='profile_picture'/>
                    <button>Update Profile Picture</button>
                </form> 
                : null}
                {
                ((arbitraryUser.id !== user.id) && 
                (!arbitraryUser.assertive_friendships.map(assertiveFriendship => assertiveFriendship.friend_id).includes(user.id))) ?  
                null :
                <FormToSubmitPost user={user} setArbitraryUserWrapperToAddNewWallPost = {setArbitraryUserWrapperToAddNewWallPost}
                arbitraryUser={arbitraryUser} />
                }
                <div className='posts'>
                    {arbitraryUsersWallPostsArrJSX}
                </div>
            </section>
        </main>
    );
}

export default UserProfile;