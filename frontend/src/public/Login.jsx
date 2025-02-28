import React, { useState } from "react";
import './style.css';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <section className="hero is-fullheight login-con" style={{ backgroundColor: "#F4F1EA", position: "relative" }}>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-8-tablet is-6-desktop is-5-widescreen">
                            <div className="box" style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", padding: "3rem" }}>
                                <div className="has-text-centered">
                                    <h1 className="title sage" >BrandName</h1>
                                </div>
                                {!isRegistering ? (
                                    <form>
                                        <div className="field">
                                            <label className="label sage" >Email</label>
                                            <div className="control has-icons-left">
                                                <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" style={{ backgroundColor: "#FFFFFF" }} required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope sage" ></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label sage" >Password</label>
                                            <div className="control has-icons-left">
                                                <input type="password" placeholder="*******" className="input" style={{ backgroundColor: "#FFFFFF" }} required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock sage" ></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="checkbox sage" style={{ color: "#ffffff" }}>
                                                <input type="checkbox" /> Remember me
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
                                    <form>
                                        <div className="field">
                                            <label className="label sage" >Name</label>
                                            <div className="control has-icons-left">
                                                <input type="text" placeholder="e.g. John Doe" className="input" style={{ backgroundColor: "#FFFFFF" }} required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-user sage" ></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label sage" >Email</label>
                                            <div className="control has-icons-left">
                                                <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" style={{ backgroundColor: "#FFFFFF" }} required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope sage" ></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label sage" >Password</label>
                                            <div className="control has-icons-left">
                                                <input type="password" placeholder="*******" className="input" style={{ backgroundColor: "#FFFFFF" }} required />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock sage" ></i>
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