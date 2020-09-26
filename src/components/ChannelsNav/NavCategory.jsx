// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../../slices';

const actionCreators = {
  openModal: actions.openModal,
};

const NavCategory = (props) => {
  const { openModal, name } = props;

  return (
    <div className="d-flex mb-2">
      <span className="align-self-center">{name}</span>
      <div
        role="button"
        className="btn btn-link p-0 ml-auto"
        tabIndex={-1}
        onClick={() => openModal({ type: 'add' })}
        onKeyDown={() => { }}
      >
        <big>
          +
        </big>
      </div>
    </div>
  );
};

export default connect(null, actionCreators)(NavCategory);
