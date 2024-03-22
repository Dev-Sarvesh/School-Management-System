import React from 'react';
import {useHistory} from "react-router-dom"


const User = () => {
  const history=useHistory();

  const LogoutButton=()=>{
    history.push("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div 
        onClick={LogoutButton}
        className='btn btn-info btn-sm mx-2'>Logout</div>
      </nav>

      <div className="container mt-5">
        <h1>Welcome to the User Dashboard</h1>
        <p>This is a simple dashboard.</p>
      </div>
    </div>
  );
}

export default User;
