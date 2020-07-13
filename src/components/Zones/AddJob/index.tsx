import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../../_Shared/hooks/useForm";
import styles from "./index.module.scss";
import { Spinner } from "../../_Shared/miniComponents";
import { getCurrentUserSelector } from "../../../store/currentUser/selectors";
import { AddJob } from "../../../global/models/job-models";
import { Priority } from "../../../global/enums";
import { jobActions } from "../../../store/jobs/actions";
import { getJobsSelector } from "../../../store/jobs/selectors";

interface Props {
  showModal: boolean;
  zoneId: string;
  toggle: () => void;
  defaultDate?: Date;
}

const getCalendarDateString = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).substring(
      ("00" + (date.getMonth() + 1)).length - 2
    ) +
    "-" +
    ("00" + date.getDate()).substring(("00" + date.getDate()).length - 2) +
    "T" +
    ("00" + date.getHours()).substring(("00" + date.getHours()).length - 2) +
    ":" +
    ("00" + date.getMinutes()).substring(("00" + date.getMinutes()).length - 2)
  );
};

const AddJobModal = (props: Props) => {
  const dispatch = useDispatch();
  const jobs = useSelector(getJobsSelector);
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
  }, [jobs.lastPost]);

  const addJobSubmit = async () => {
    setErrorMessage("");

    if (!values.name) {
      setErrorMessage("Name is required");

      return;
    }

    if (!values.dueDate || new Date(values.dueDate) < new Date()) {
      setErrorMessage("Due date is not valid");

      return;
    }

    dispatch(jobActions.addJob(values));
  };

  const clearForm = () => {
    setErrorMessage("");
    resetValues();
  };

  const { values, handleChange, handleSubmit, resetValues } = useForm(
    {
      name: "",
      description: "",
      isRecurring: false,
      priority: Priority.Normal,
      managerId: currentUser.user.id,
      dueDate: props.defaultDate
        ? getCalendarDateString(props.defaultDate)
        : "",
      zoneId: props.zoneId,
      assignedUserId: null,
      parentJobId: null,
    } as AddJob,
    addJobSubmit
  );

  return (
    <Modal className={styles.addJob} isOpen={props.showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Job</ModalHeader>
      <ModalBody>
        <form id="add-job-form" onSubmit={handleSubmit}>
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
                type="text"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="Priority">
              Priority:
            </label>
            <div className="col-md-9 d-inline-block">
              <select
                id="Priority"
                className="form-control"
                name="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <option>{Priority.Low}</option>
                <option>{Priority.Normal}</option>
                <option>{Priority.High}</option>
              </select>
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="IsRecurring">
              Is Recurring:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="IsRecurring"
                className="form-control"
                name="isRecurring"
                type="checkbox"
                placeholder="Is Recurring"
                value={values.isRecurring.toString()}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <label className="control-label col-md-3" htmlFor="DueDate">
              Due Date:
            </label>
            <div className="col-md-9 d-inline-block">
              <input
                id="DueDate"
                className="form-control"
                name="dueDate"
                type="datetime-local"
                placeholder="Due Date"
                value={values.dueDate}
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
          disabled={jobs.isPosting}
          form="add-job-form"
          color="primary"
          type="submit"
        >
          Add Job
          {jobs.isPosting && <Spinner />}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddJobModal;
