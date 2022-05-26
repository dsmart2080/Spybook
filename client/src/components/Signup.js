import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import worldMap from '../images/world_map.png';


function Signup({setUser}){

    const [signupFormData, setSignupFormData] = useState({
        first_name: '',
        last_name: '',
        email:'',
        password:'',
        gender: '',
        birthdayMonth: '',
        birthdayDay: '',
        birthdayYear:''
    });

    const history = useHistory();

    function changeSignupFormDataHandler(event){
        setSignupFormData({
            ...signupFormData,
            [event.target.name]: event.target.value
        });
    }

    function submitSignupFormDataHandler(event) {
        event.preventDefault();

        fetch('/api/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: signupFormData.first_name,
                last_name: signupFormData.last_name,
                email: signupFormData.email,
                password: signupFormData.password,
                gender: signupFormData.gender,
                birthday: `${signupFormData.birthdayYear} - ${signupFormData.birthdayMonth}-${signupFormData.birthdayDay}`
            })
        })
        .then(response => {
            if(response.ok){
                response.json().then(jsonData => {
                    setUser(jsonData);
                    history.push('/home_feed')
                })
            }
        })


    }




}