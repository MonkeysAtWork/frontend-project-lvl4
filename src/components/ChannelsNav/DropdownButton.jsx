// @ts-check

import React from 'react';
import { connect } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import SimpleButton from './SimpleButton';

import { actions } from '../../slices';

const mapStateToProps = ({ currentChannelId }) => (
  { currentChannelId }
);

const actionCreators = {
  openModal: actions.openModal,
};

const DropdownButton = (props) => {
  const { openModal, currentChannelId, item } = props;
  const isActive = item.id === currentChannelId;

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <SimpleButton item={item} />
      <Dropdown.Toggle
        split
        variant={isActive ? 'primary' : 'light'}
      />

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => openModal({ type: 'rename', item })}
        >
          Rename
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => openModal({ type: 'delete', item })}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(mapStateToProps, actionCreators)(DropdownButton);
