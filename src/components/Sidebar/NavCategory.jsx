// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../../slices';

const NavCategory = (props) => {
  const { name } = props;

  const dispatch = useDispatch();
  const openModal = (payload) => () => dispatch(actions.openModal(payload));

  return (
    <div className="d-flex mb-2">
      <span className="align-self-center">{name}</span>
      <div
        role="button"
        className="btn btn-link p-0 ml-auto"
        tabIndex={-1}
        onClick={openModal({ type: 'add' })}
        onKeyDown={() => { }}
      >
        <big>
          +
        </big>
      </div>
    </div>
  );
};

export default NavCategory;
