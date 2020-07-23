import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { maxHeightExpand } from "../_Shared/animations";
import { currentUserActions } from "../../store/currentUser/actions";
import {
  getUserSelector,
  getCurrentUserSelector,
} from "../../store/currentUser/selectors";
import SignInModal from "../_Shared/modals/signin";
import SignUpModal from "../_Shared/modals/signup";

const Navigation = styled.nav`
  z-index: 1000;
  color: white;
  background: rgba(0, 0, 0, 0.1);
  font-weight: bolder;
  width: 100%;
  transition: 0.6s;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
  .navbar-brand {
    transition: 1s;
    color: #26d0d0;
  }
  .nav-link {
    transition: 0.6s;
  }
`;

const LoggedIn = styled.ul`
  margin: 0;
  a {
    color: #26d0d0;
  }
`;

const DropDownMenuElem = styled(DropdownMenu)`
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 5px;
  transition: 0.6s;
  .logout-btn {
    float: right;
  }
  &.show {
    max-height: 0;
    animation: ${maxHeightExpand()} 13s;
    overflow: hidden;
  }
`;

enum NavModal {
  None,
  Signin,
  Signup,
}

const Nav = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const user = useSelector(getUserSelector);

  const [modal, setModal] = useState(NavModal.None);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(currentUserActions.signOutUser());
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setModal(NavModal.None);
    }
  }, [currentUser.isLoggedIn]);

  const handleCloseModal = () => {
    setModal(NavModal.None);
  };

  const handleSignUpUserSubmmit = () => {
    setModal(NavModal.Signin);
  };

  return (
    <Navigation className="navbar navbar-expand-lg navbar-dark position-fixed">
      <NavLink to="/" className="navbar-brand">
        JobTrail
      </NavLink>

      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {currentUser.isLoggedIn ? (
            <>
              <NavItem>
                <NavLink to="/jobs" className="nav-link">
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/zones" className="nav-link">
                  Zones
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/account" className="nav-link">
                  Account
                </NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <span
                  className="nav-link"
                  role="button"
                  onClick={() => setModal(NavModal.Signin)}
                >
                  Signin
                </span>
              </NavItem>
              <NavItem>
                <span
                  className="nav-link"
                  role="button"
                  onClick={() => setModal(NavModal.Signup)}
                >
                  Signup
                </span>
              </NavItem>

              {modal === NavModal.Signin && (
                <SignInModal showModal={true} toggle={handleCloseModal} />
              )}
              {modal === NavModal.Signup && (
                <SignUpModal
                  showModal={true}
                  toggle={handleCloseModal}
                  userSubmited={handleSignUpUserSubmmit}
                />
              )}
            </>
          )}
        </ul>
        {currentUser.isLoggedIn && (
          <LoggedIn className="list-unstyled">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Logged in as {user.username}
              </DropdownToggle>
              <DropDownMenuElem right>
                <DropdownItem>
                  <Link to="/account"> Account </Link>
                </DropdownItem>

                <button className="logout-btn btn btn-warning" onClick={logout}>
                  Logout
                </button>
              </DropDownMenuElem>
            </UncontrolledDropdown>
          </LoggedIn>
        )}
      </div>
    </Navigation>
  );
};

export default Nav;
