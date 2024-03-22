import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal_Component";
import OtpInput from "react-otp-input";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [model, setModel] = useState(false);
  const [typeOtp, setTypeOtp] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("token")
    if (storedData && storedData.length > 0) {
      history.push("/admin/dashboard");
    }
  }, []);

  const verifyOTP = async () => {
    if (typeOtp === "") {
      alert("Please enter OTP");
      return;
    }
    if (typeOtp.length < 4) {
      alert("Please enter valid OTP");
      return;
    }
    if (userData && typeof userData.contact === "string") {
      const lastFourDigits = userData.contact.slice(-4);
      if (typeOtp === lastFourDigits) {
        setModel(false);
        history.push("/admin/dashboard");
      } else {
        alert("Incorrect OTP. Please try again.");
        setTypeOtp("");
      }
    } else {
      alert("User data not available or invalid to verify OTP.");
    }
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      console.log("Response from login API:", response.data);

      if (response.data && response.data.findUser) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        setUserData(response.data.findUser);
        console.log("User logged in successfully");
        setModel(true);
      } else {
        alert(`User Not Exist !! Try To SignUp First.`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <main className="d-flex w-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1 className="h2">Welcome back!</h1>
                  <p className="lead">Sign in to your account to continue</p>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-3">
                      <form onSubmit={loginHandle}>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                          />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                          <button className="btn btn-lg btn-primary">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-3">
                  Don't have an account?<Link to="/signup">Sign up </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={model === true}
        handleClose={() => setModel(false)}
        backdrop="static"
        size="sm"
        title="Verify OTP"
        btn_name="Verify"
        btn_name1="Verify1"
        Submit_Function={verifyOTP}
      >
        <form onSubmit={verifyOTP}>
          <OtpInput
            containerStyle="otp-div"
            value={typeOtp}
            onChange={setTypeOtp}
            numInputs={4}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
          />
        </form>
      </Modal>
    </>
  );
}

export default Login;
