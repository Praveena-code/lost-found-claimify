import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import "../../Styles/StudentMenu.css";
import heroTop from "../../assets/hero-top.svg";
import heroMain from "../../assets/hero-main.svg";
import heroBottom from "../../assets/hero-bottom.svg";
import claimifyLogo from "../../claimify-logo.jpg"; // <-- your merged logo

const StudentMenu = () => {
  const navigate = useNavigate();

  // ✅ USER STATE (reactive)
  const [user, setUser] = useState({
    name: "Student User",
    email: "email@example.com",
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ✅ FETCH USER AFTER COMPONENT MOUNTS
  useEffect(() => {
    const storedUser = localStorage.getItem("claimifyUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser.name || "Student User",
          email: parsedUser.email || "email@example.com",
        });
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  const toggleProfile = () => setIsProfileOpen((prev) => !prev);
  const closeProfile = () => setIsProfileOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("claimifyUser");
    navigate("/");
  };

  return (
    <div className="student-page">
      <div className="student-shell">

        {/* Top navbar */}
        <header className="student-header">
          <div className="nav-inner">
            <div className="nav-left">
              <img
                src={claimifyLogo}
                alt="Claimify Logo"
                className="claimify-logo"
              />
            </div>

            <Navbar expand="lg" className="nav-right">
              <Navbar.Toggle aria-controls="student-navbar-nav" />
              <Navbar.Collapse id="student-navbar-nav">
                <Nav className="nav-links ms-auto align-items-center">

                  {/* ✅ ACTUAL LOGGED-IN NAME */}
                  <Nav.Link className="student-name">
                    {user.name}
                  </Nav.Link>

                  <NavDropdown title="Items" id="items-nav-dropdown">
                    <NavDropdown.Item href="/LostItemEntry">
                      Report Lost Item
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/LostItemReport">
                      Lost Item List
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/FoundItemEntry">
                      Report Found Item
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/FoundItemReport">
                      Found Item List
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="/ChatMessage">Chat</Nav.Link>

                  {/* PROFILE */}
                  <div className="profile-wrapper">
                    <button
                      className="profile-btn"
                      type="button"
                      onClick={toggleProfile}
                    >
                      Profile
                    </button>

                    {isProfileOpen && (
                      <>
                        <div
                          className="profile-overlay"
                          onClick={closeProfile}
                        />

                        <div className="profile-card">
                          <div className="profile-card-header">
                            <div className="profile-avatar-circle">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="profile-card-name">
                              {user.name}
                            </div>
                            <div className="profile-card-email">
                              {user.email}
                            </div>
                          </div>

                          <div className="profile-card-body">
                            <button
                              type="button"
                              className="profile-logout-btn"
                              onClick={handleLogout}
                            >
                              Log out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
        {/* Hero */}
        <main className="student-main">
          <h1 className="hero-heading">Find &amp; Recover With Ease</h1>
          <p className="hero-desc">
            Experience effortless recovery with our lost and found service
          </p>

          {/* bottom row: buttons left, images right */}
          <div className="hero-bottom-row">
            <div className="hero-buttons">
              <button
                className="lost-btn"
                onClick={() => navigate("/LostItemEntry")}
              >
                Lost
              </button>
              <button
                className="found-btn"
                onClick={() => navigate("/FoundItemEntry")}
              >
                Found
              </button>
            </div>

<div className="hero-images">
  <img
    src={heroTop}
    className="hero-img hero-img-top"
    alt="hero top"
  />
  <img
    src={heroMain}
    className="hero-img hero-img-main"
    alt="hero main"
  />
  <img
    src={heroBottom}
    className="hero-img hero-img-bottom"
    alt="hero bottom"
  />
</div>

          </div>
        </main>

        {/* Recent activity */}
        <section className="activity-section">
          <div className="activity-card">
            <h2 className="activity-title">Recent Activity</h2>

            <div className="activity-row">
              <span className="dot dot-red" />
              <span className="activity-text">
                You reported: Black Backpack – 20 Dec
              </span>
            </div>

            <div className="activity-row">
              <span className="dot dot-blue" />
              <span className="activity-text">
                New match found for: Physics Book – 21 Dec
              </span>
            </div>

            <div className="activity-row">
              <span className="dot dot-green" />
              <span className="activity-text">
                You returned: ID Card – 18 Dec
              </span>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default StudentMenu;