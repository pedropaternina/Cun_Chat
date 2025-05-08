"use client";

import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const decodeToken = (token: any) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const user = localStorage.getItem("user");

    let userImage = "";
    if (!user) {
        userImage =
            "https://th.bing.com/th/id/OIP.JYja9sPrMkY9BOHMq2IeBAHaJb?rs=1&pid=ImgDetMain";
    } else {
        userImage =
            "https://th.bing.com/th/id/OIP.JYja9sPrMkY9BOHMq2IeBAHaJb?rs=1&pid=ImgDetMain";
    }

    const openUserNav = () => {
        setOpen(!open);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-text-top me-2"
                    />
                    Flowbite
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Register">
                                Register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                a
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Contact
                            </a>
                        </li>
                    </ul>

                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                            type="button"
                            id="userMenu"
                            onClick={openUserNav}
                            aria-expanded={open ? "true" : "false"}
                        >
                            <img
                                src={userImage}
                                alt="User"
                                className="rounded-circle me-2"
                                width="30"
                                height="30"
                            />
                            User
                        </button>

                        {open && (
                            <ul
                                className="dropdown-menu dropdown-menu-end show"
                                aria-labelledby="userMenu"
                                style={{ position: "absolute", top: "100%", right: 0 }}
                            >
                                <li className="px-3 py-2">
                                    <span className="d-block text-dark">User Name</span>
                                    <small className="text-muted">name@flowbite.com</small>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/Register">
                                        Register
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/Login">
                                        Login
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
