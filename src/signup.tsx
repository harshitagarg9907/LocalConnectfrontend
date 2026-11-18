
import { useState } from "react";
import axios from "axios";
import "./signup.css";
//const API_URL=import.meta.env.VITE_API_URL
//const backend = "http://localhost:2010";//addn backend in place of import.meta.env.VITE_API_URL if i want to run this locally


function Signup() {

    const [emailid, setEmailid] = useState("");
    const [password, setPassword] = useState("");
    const [utype, setUtype] = useState("");
    const [msg, setMsg] = useState("");



    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup/signup-process`,
                {
                    emailid,
                    password,
                    utype
                })
            ;

            setMsg(result.data.msg);
 
            if (result.data.status) {
                setEmailid("");
                setPassword("");
                setUtype("");
            }

        }
        catch (err: any) {
            setMsg(
                err.response?.data?.msg || "Signup failed"
            );
        }
    }

    return (
        <div className="signup-container">

            {/* LEFT IMAGE SECTION */}

            <div className="signup-left">

                <div className="signup-brand">
                    <h2>LocalConnect.</h2>
                </div>

                <div className="signup-overlay">
                    <span className="welcome-tag">
                        YOUR LOCAL BUSINESS NETWORK
                    </span>

                    <h1>
                        Discover Local.
                        <br />
                        Connect Better.
                        <br />
                        Grow Together.
                    </h1>

                    <p>
                        Find trusted businesses, explore services
                        around you and connect with the people
                        who make your community special.
                    </p>
                </div>

                <div className="left-footer">
                    Bringing customers and businesses together.
                </div>

            </div>


            {/* RIGHT SIGNUP SECTION */}

            <div className="signup-right">

                <div className="signup-box">

                    <div className="signup-heading">
                        <span className="signup-icon">✦</span>

                        <h2>Create Account</h2>

                        <p>
                            Join our community today!
                        </p>
                    </div>


                    <form onSubmit={handleSignup}>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            minLength={8}
                            required
                        />


                        <label>I want to join as</label>

                        <select
                            value={utype}
                            onChange={(e) =>
                                setUtype(e.target.value)
                            }
                            required
                        >
                            <option value="" disabled>
                                Select your account type
                            </option>

                            <option value="vendor">
                                Vendor
                            </option>

                            <option value="customer">
                                Customer
                            </option>

                        </select>


                        <button type="submit">
                            Sign Up Now
                            <span> →</span>
                        </button>

                    </form>


                    {msg && (
                        <p className="signup-msg">
                            {msg}
                        </p>
                    )}


                   

                </div>

            </div>

        </div>
    );
}

export default Signup;
