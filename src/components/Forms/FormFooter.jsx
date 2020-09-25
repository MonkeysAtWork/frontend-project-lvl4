// @ts-check

import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { actions } from '../../slices';

const actionCreators = {
  closeModal: actions.closeModal,
};

const Footer = (props) => {
  const {
    closeModal,
    isDisabled,
    submitName,
    submitVariant = 'primary',
  } = props;
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

export default connect(null, actionCreators)(Footer);
