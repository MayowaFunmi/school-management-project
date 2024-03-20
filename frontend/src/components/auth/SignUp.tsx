import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config/Config';
import { Role, RoleData } from '../../models/userModel';

const SignUp: React.FC = () => {
  const backgroundImages = {
		backgroundImage: 'url("/background-students.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
	};

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const navigate = useNavigate();

  useEffect(() => {
    const getRoles = async () => {
      try {
        const res = await axios.get<Role>(`${baseUrl}/api/role/get-selected-roles`)
        const response = res.data
        if (response.status === "OK") {
          setRoles(response.data)
        }
      } catch (error) {
        console.log(`Error fetching data: ${error}`)
      }
    }
    getRoles();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // check if all fields are filled
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword || !role) {
      notifyError("None of the fields must be empty")
      return;
    }

    if (!emailRegex.test(email)) {
      notifyError("Email is invalid");
      return;
    }

    if (password !== confirmPassword) {
      notifyError("Passwords do not match")
      return;
    }

    try {
      const result = await axios.post(`${baseUrl}/api/auth/signup`, {
        username, firstName, lastName, email, phoneNumber, password, role
      })
      if (result.status === 200) {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber('');
        setPassword("");
        setConfirmPassword("");
        notifySuccess(result.data.message);
        navigate('/login');
      } else if (result.status === 500) {
        notifyError(result.data.message)
      }
    } catch (error) {
      console.log("error = ", error)
    }
  }
  return (
    <div style={backgroundImages}>
      <div className='container'>
        <h3>Sign up page</h3>
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
              type="text"
              className="form-control" 
              id="floatingFirstName" 
              placeholder="Enter your first Name" 
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingLastName" 
              placeholder="Enter Your Last Name" 
              required 
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>

          <div className="form-floating mb-3">
            <input 
              type="email" 
              className="form-control" 
              id="floatingEmail" 
              placeholder="Enter email address" 
              required 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="floatingPhoneNumber" 
              placeholder="Enter your phone number" 
              required 
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <label htmlFor="floatingPhoneNumber">Phone Number</label>
          </div>

          <div className="mb-3">
            <label htmlFor="userRoles" className="form-label">
              I am a
            </label>
            <select
              className="form-select"
              id="userRoles"
              name="roleName"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
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

          <div className="form-floating mb-3">
          <input
              type="password" 
              className="form-control" 
              id="floatingPassword2" 
              placeholder="Enter Password Again" 
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword2">Confirm Password</label>
          </div>

          <div className="col-12">
            <button type='submit' className="btn btn-primary">Register</button>
          </div>

          <div>
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp