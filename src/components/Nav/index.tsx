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
import styles from "./index.module.scss";
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

enum NavModals {
  None,
  Signin,
  Signup,
}

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const user = useSelector(getUserSelector);

  const [modal, setModal] = useState(NavModals.None);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(currentUserActions.signOutUser());
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setModal(NavModals.None);
    }
  }, [currentUser.isLoggedIn]);

  const handleCloseModal = () => {
    setModal(NavModals.None);
  };

  const handleSignUpUserSubmmit = () => {
    setModal(NavModals.Signin);
  };

  return (
    <Navigation className="navbar navbar-expand-lg navbar-dark position-fixed">
      <NavLink to="/" className="navbar-brand">
        JobTrail
      </NavLink>

      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {currentUser.isLoggedIn ? (
            <NavItem>
              <NavLink to="/account" className="nav-link">
                Account
              </NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <span
                  className={`${styles.modalLink} nav-link`}
                  onClick={() => setModal(NavModals.Signin)}
                >
                  Signin
                </span>
              </NavItem>
              <NavItem>
                <span
                  className={`${styles.modalLink} nav-link`}
                  onClick={() => setModal(NavModals.Signup)}
                >
                  Signup
                </span>
              </NavItem>

              {modal === NavModals.Signin && (
                <SignInModal showModal={true} toggle={handleCloseModal} />
              )}
              {modal === NavModals.Signup && (
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