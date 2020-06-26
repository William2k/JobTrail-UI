import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../../_Shared/hooks/useForm";
import styles from "./index.module.scss";
import { Spinner } from "../../_Shared/miniComponents";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";
import { AddZone } from "../../../global/models/zone-models";
import { userZonesActions } from "../../../store/zones/actions";
import { getUserZonesSelector } from "../../../store/zones/selectors";

interface Props {
  showModal: boolean;
  toggle: () => void;
}

const AddZoneModal: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const userZones = useSelector(getUserZonesSelector);
  const currentUser = useSelector(getCurrentUserSelector);
  const [errorMessage, setErrorMessage] = useState("");

  const toggle = () => {
    props.toggle();
    clearForm();
  };

  useEffect(() => {
    if (!values.name) {
      return;
    }

    toggle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userZones.lastPost]);

  const addZoneSubmit = async () => {
    setErrorMessage("");

    if (!values.name) {
      setErrorMessage("Name is required");

      return;
    }

    dispatch(userZonesActions.addZone(values));
  };

  const clearForm = () => {
    setErrorMessage("");
    resetValues();
  };

  const { values, handleChange, handleSubmit, resetValues } = useForm(
    {
      name: "",
      description: "",
      managerId: currentUser.user.id,
      parentZoneId: null,
    } as AddZone,
    addZoneSubmit
  );

  return (
    <Modal className={styles.addZone} isOpen={props.showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Zones</ModalHeader>
      <ModalBody>
        <form id="add-zone-form" onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="Name">
              Name:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="Name"
                className="form-control"
                name="name"
                type="text"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="Description">
              Description:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="Description"
                className="form-control"
                name="description"
                type="Description"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className={styles.errorMessage}>{errorMessage}</div>
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
        <Button color="secondary" onClick={clearForm}>
          Reset
        </Button>
        <Button
          disabled={userZones.isPosting}
          form="add-zone-form"
          color="primary"
          type="submit"
        >
          Add Zone
          {userZones.isPosting && <Spinner />}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddZoneModal;
