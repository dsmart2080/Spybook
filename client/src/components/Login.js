import {useState} from 'react';
import {useHistory} from 'react-router-dom';


function Login({setUser}){
    
    const history = useHistory();

    const [loginFormData, setLoginFormData] = useState({
        email:'',
        password:''
    });


    //Form data
    function changeLoginFormDataHandler(event){
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        });
    }


    //Transporting and sending the form data.
    function submitLoginFormDataHandler(event){
        event.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFormData)
        })
        .then(response => {
            if(response.ok){
                response.json().then(jsonData => {
                    setUser(jsonData);
                    history.push('/home_feed');
                });
            }
        });
    }



    //Demonstration User Login
    function submitDemoUserLoginFormDataHandler(event){
        event.preventDefault();

        //API call for demonstration user.
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'musk@fb.com',
                password: 'password'
            })
        })
        .then(response => {
            if (response.ok){
                response.json().then(jsonData => {
                    setUser(jsonData);
                    history.push('/home_feed');
                });
            }
        });
    }


    return (
        <div className='login'>
            <form onSubmit={submitLoginFormDataHandler} className='login-form'>
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        value={loginFormData.email}
                        onChange={changeLoginFormDataHandler}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={loginFormData.password}
                        onChange={changeLoginFormDataHandler}
                    />
                </div>
                <button>Login</button>
            </form>

            <form onSubmit={submitDemoUserLoginFormDataHandler} className='login-form-demo-user'>
                <button>Demo User</button>
            </form>

        </div>
    );



}


export default Login;

