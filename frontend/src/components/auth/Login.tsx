import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { loginUser } from '../../features/userSlice';
import Spinner from '../../spinner/Spinner';
import store from '../../store/store';
import { clearUserData } from '../../features/adminSlice';


const Login: React.FC = () => {
  const backgroundImages = {
		backgroundImage: 'url("/background-students.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
	};
	const navigate = useNavigate();
	const { message, status, isAuthenticated, loading } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);
	const storedToken = localStorage.getItem("user");

  useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
		if (status === "success") {
			notifySuccess("User signed in successfully");
		} else if (status === "rejected") {
			notifyError("Invalid username or password")
		}
		if (!storedToken) {
      store.dispatch(clearUserData())
    }
	}, [isAuthenticated, navigate, message, status, storedToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // check if all fields are filled
    if (!username || !password ) {
      notifyError("None of the fields must be empty")
      return;
  	}

    try {
      const userCredentials = {
      	username, password
			};
			dispatch(loginUser(userCredentials));
			//navigate('/get-user-profile');
			if (status === "success") {
				return <Navigate to='/' />
			}
    } catch (error) {
	  	notifyError(message);
    }
  }

  return (
    <div style={backgroundImages}>
      <div className='container'>
		<h3>Login page</h3>
		<Spinner loading={loading} />
		<form onSubmit={handleSubmit}>
			<div className="form-floating mb-3">
				<input
					type="text"
					className="form-control"
					id="floatingUsername" 
					placeholder="Enter your username"
					name='username'
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<label htmlFor="floatingUsername">Username</label>
			</div>

			<div className="form-floating mb-3">
				<input
					type="password" 
					className="form-control" 
					id="floatingPassword" 
					placeholder="Enter Password" 
					required
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label htmlFor="floatingPassword">Password</label>
			</div>

			<div className="col-12">
				<button type='submit' className="btn btn-primary">Login</button>
			</div>

			<div>
				Don't have an account?
				<Link to="/signup">Sign Up</Link>
			</div>
		</form>
      </div>
    </div>
  )
}

export default Login;