import React, {useState} from 'react'
import Add from '../img/add.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate,Link } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        // console.log(password);

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
        } catch {
            setErr(true);
        }

    }
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Pro Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='email' />
                    <input type="password" placeholder='password' />
                    <button>Sign In</button>
                </form>
                {err && <span>Somthing went wrong</span>}
                <p>You don't have account? <span><Link to='/register'>Register</Link></span></p>
            </div>
        </div>
    )
}

export default Login