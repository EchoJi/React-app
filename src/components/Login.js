import React, {useState, useRef, createRef} from 'react'
import InputField from './InputField'
import axios from 'axios';

function Login() {
    const inputRefs = useRef([
        createRef(), createRef()
    ]);

    const [customerSignUp, setCustomerSignUp] = useState(
        { email: '', password: ''}
    );

    const handleChange = (name, value) => {
        setCustomerSignUp(prev => ({...prev, [name]: value}))
        console.log(customerSignUp)
    }

    const submitForm = (e) => {
        e.preventDefault()
        axios.post('http://t.ztest.org/api/teacher/login', customerSignUp)
            .then(function (response) {
                console.log(response)
                if (response.data.code === 0)
                    console.log("Login successful")
                else    
                    console.log("Password is incorrect")
            })
            .catch(function (error) {
                console.log(error)
            })

        let isValid = true;

        for (let i = 0; i< inputRefs.current.length; i++) {
            const valid = inputRefs.current[i].current.validate()
            if (!valid) {
                isValid = false
            }
            
            if (!isValid) {
                return
            }
        }
    }

    console.log(inputRefs);

    return (
        <div>
            <form onSubmit={submitForm}>
                <InputField 
                    type="email"
                    ref={inputRefs.current[0]}
                    name="email"
                    label="Email*:"
                    onChange={handleChange}
                    validation={"required"}
                    value={customerSignUp.email}
                />
                <InputField 
                    type="password"
                    ref={inputRefs.current[1]}
                    name="password"
                    label="Password*:"
                    onChange={handleChange}
                    value={customerSignUp.password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login
