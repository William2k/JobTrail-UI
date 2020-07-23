import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import styled from "styled-components";

import useForm from "../../hooks/useForm";
import { Spinner } from "../../miniComponents";
import { SignUp } from "../../../../global/models/user-models";
import useNotification, { NotificationType } from "../../hooks/useNotification";


interface Props {
  showModal: boolean;
  toggle: () => void;
  userSubmited: () => void;
}

const SignUpModalStyle = styled(Modal)`
  color: #004e97;

  .error-message {
    color: rgb(134, 0, 0);
  }
`;

const SignUpModal = (props: Props) => {
  const { notify } = useNotification();
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signupSubmit = async () => {
    setErrorMessage("");

    if (!values.username) {
      setErrorMessage("Username is required");

      return;
    }

    const payload = { ...values };

    if (payload.password !== payload.confirmPassword) {
      setErrorMessage("Passwords do not match");
      // will add a validator function to validate the password for complexity
      return;
    }

    delete payload.confirmPassword;

    setIsPosting(true);

    try {
      await axios.post("account/signup", payload);

      props.userSubmited();

      notify(
        "Sign Up Success",
        "User has been added sucessfully",
        NotificationType.Default
      );
    } catch (error) {
      setErrorMessage("Failed to add user");

      notify("Sign Up Failed", "Adding user failed", NotificationType.Danger);
    } finally {
      setIsPosting(false);
    }
  };

  const clearForm = () => {
    setErrorMessage("");
    resetValues();
  };

  const toggle = () => {
    props.toggle();
    clearForm();
  };

  const { values, handleChange, handleSubmit, resetValues } = useForm(
    {
      username: "",
      emailAddress: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      settings: {},
    } as SignUp,
    signupSubmit
  );

  return (
    <SignUpModalStyle isOpen={props.showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sign up</ModalHeader>
      <ModalBody>
        <form id="signup-form" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="username">
              Username:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="username"
                className="form-control"
                name="username"
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="email">
              Email:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="email"
                name="emailAddress"
                type="text"
                placeholder="Email"
                value={values.emailAddress}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="firstname">
              First Name:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="firstname"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="lastname">
              Last Name:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="lastname"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="password">
              Password:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="password"
                name="password"
                type="Password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label
              className="control-label col-md-3"
              htmlFor="confirm-password"
            >
              Confirm Password:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                className="form-control"
                id="confirm-password"
                name="confirmPassword"
                type="Password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="error-message">{errorMessage}</div>
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
        <Button color="secondary" onClick={clearForm}>
          Reset
        </Button>
        <Button
          disabled={isPosting}
          form="signup-form"
          color="primary"
          type="submit"
        >
          SignUp
          {isPosting && <Spinner />}
        </Button>
      </ModalFooter>
    </SignUpModalStyle>
  );
};

export default SignUpModal;
