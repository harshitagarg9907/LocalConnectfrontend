   import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
   const navigate = useNavigate();
    const [emailid, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setMsg("");

        try {

            const result = await axios.post(
                "http://localhost:2010/login/login-process",
                {
                    emailid,
                    password
                },

                {headers: {'Content-Type': 'multipart/form-data' }}
              )//Specifically, 'Content-Type': 'multipart/form-data' tells the server:
//"I am sending a request that contains form fields, files, or images (not standard text or plain JSON)."
  
             alert(JSON.stringify(result.data));

        localStorage.setItem("token",result.data.token);


            setMsg(result.data.msg);


            if (result.data.status) {

                // Redirect according to user type
                if (result.data.utype === "vendor") {
                   navigate("/vendor-dashboard");      }


          else if (result.data.utype === "customer") {

    navigate("/citizen-dashboard");
}
                }
                }

        
       catch (err: any) {

    console.log("ERROR:", err);
    console.log("SERVER RESPONSE:", err.response?.data);
    console.log("STATUS CODE:", err.response?.status);

    setMsg(
        err.response?.data?.msg || err.message || "Login failed"
    );

}
    }
        
    return (
        <div className="login-container">

            {/* LEFT IMAGE SECTION */}

            <div className="login-left">

                <div className="login-brand">
                    <h2>LocalConnect.</h2>
                </div>

                <div className="login-overlay">

                    <span className="login-tag">
                        YOUR LOCAL BUSINESS NETWORK
                    </span>

                    <h1>
                        Welcome
                        <br />
                        Back!
                    </h1>

                    <p>
                        Your community is waiting for you.
                        Log in to connect with local businesses,
                        discover services and explore new
                        opportunities.
                    </p>

                </div>

                <div className="login-footer">
                    Bringing customers and businesses together.
                </div>

            </div>


            {/* RIGHT LOGIN SECTION */}

            <div className="login-right">

                <div className="login-box">

                    <div className="login-heading">

                        <span className="login-icon">✦</span>

                        <h2>Welcome Back</h2>

                        <p>Login to continue to LocalConnect</p>

                    </div>


                    <form onSubmit={handleLogin}>

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={emailid}
                            onChange={(e) =>
                                setEmailid(e.target.value)
                            }
                            required
                        />


                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />


                        <button type="submit">
                            Login Now
                            <span> →</span>
                        </button>

                    </form>


                    {msg && (
                        <p className="login-msg">
                            {msg}
                        </p>
                    )}


                    <div className="signup-text">
                        Don't have an account?
                        <a href="/forgotpassword"> Forgot Password</a>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
