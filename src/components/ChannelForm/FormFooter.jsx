// @ts-check

import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

import { actions } from '../../slices';

const Footer = (props) => {
  const {
    isDisabled,
    submitName,
    submitVariant = 'primary',
  } = props;

  const dispatch = useDispatch();
  const closeModal = () => dispatch(actions.closeModal());

  return (
    <div className="d-flex justify-content-end mt-3">
      <Button
        className="mr-2"
        variant="secondary"
        onClick={() => closeModal()}
        disabled={isDisabled}
      >
        Close
      </Button>
      <Button
        variant={submitVariant}
        type="submit"
        disabled={isDisabled}
      >
        {isDisabled && <span className="spinner-border spinner-border-sm mr-1" />}
        {submitName}
      </Button>
    </div>
  );
};

export default Footer;
