import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import './style.css'; // Import the CSS file

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const userRef = useRef();
    const errRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/${isRegistering ? 'register' : 'login'}`,
                isRegistering ? { name, email, password: pwd } : { email, password: pwd }
            );
            if (response.data) {
                setSuccess(true);
                localStorage.setItem('auth-token', response.data);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <section className="hero is-fullheight login-con" style={{ backgroundColor: "#F4F1EA", position: "relative" }}>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-8-tablet is-6-desktop is-5-widescreen">
                            <div className="box" style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", padding: "3rem" }}>
                                <div className="has-text-centered">
                                    <h1 className="title sage">BrandName</h1>
                                </div>
                                {!isRegistering ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="field">
                                            <label className="label sage">Email</label>
                                            <div className="control has-icons-left">
                                                <input
                                                    type="email"
                                                    placeholder="e.g. bobsmith@gmail.com"
                                                    className="input"
                                                    style={{ backgroundColor: "#FFFFFF" }}
                                                    required
                                                    ref={userRef}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope sage"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label sage">Password</label>
                                            <div className="control has-icons-left">
                                                <input
                                                    type="password"
                                                    placeholder="*******"
                                                    className="input"
                                                    style={{ backgroundColor: "#FFFFFF" }}
                                                    required
                                                    value={pwd}
                                                    onChange={(e) => setPwd(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock sage"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="checkbox sage">
                                                <input type="checkbox" style={{ margin: 0 }} /> Remember me
                                            </label>
                                        </div>
                                        <div className="">
                                            <button className="button sage-button" style={{ color: "white", borderRadius: "6px", width: "100%" }}>Login</button>
                                        </div>
                                        <p className="has-text-centered" style={{ color: "#6D9773", cursor: "pointer" }} onClick={() => setIsRegistering(true)}>
                                            Don't have an account? Sign up
                                        </p>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="field">
                                            <label className="label sage">Name</label>
                                            <div className="control has-icons-left">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. John Doe"
                                                    className="input"
                                                    style={{ backgroundColor: "#FFFFFF" }}
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-user sage"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label sage">Email</label>
                                            <div className="control has-icons-left">
                                                <input
                                                    type="email"
                                                    placeholder="e.g. bobsmith@gmail.com"
                                                    className="input"
                                                    style={{ backgroundColor: "#FFFFFF" }}
                                                    required
                                                    ref={userRef}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope sage"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label sage">Password</label>
                                            <div className="control has-icons-left">
                                                <input
                                                    type="password"
                                                    placeholder="*******"
                                                    className="input"
                                                    style={{ backgroundColor: "#FFFFFF" }}
                                                    required
                                                    value={pwd}
                                                    onChange={(e) => setPwd(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock sage"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <button className="button sage-button" style={{ color: "white", borderRadius: "6px", width: "100%" }}>Sign Up</button>
                                        </div>
                                        <p className="has-text-centered sage" style={{ cursor: "pointer" }} onClick={() => setIsRegistering(false)}>
                                            Already have an account? Log in
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;