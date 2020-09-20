// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';

import { actions } from '../slices';
import ChannelActionButton from './ChannelActionButton';

const mapStateToProps = ({ channels, currentChannelId, channelsUIState }) => (
  { channels, currentChannelId, focusedButtonId: channelsUIState.focusedButtonId }
);

const actionCreators = {
  switchChannel: actions.switchChannel,
  showActionButtins: actions.showActionButtins,
  hideActionButtins: actions.hideActionButtins,
};

const renderChannelButton = (props) => (item) => {
  const {
    currentChannelId,
    focusedButtonId,
    switchChannel,
    showActionButtins,
    hideActionButtins,
  } = props;

  const isFocused = item.id === focusedButtonId;
  const isActive = item.id === currentChannelId;

  return (
    <Nav.Item key={item.id} as="li">
      <Nav.Link
        as="button"
        className={cn('btn btn-block', { active: isActive, 'list-group-item-secondary': isFocused && !isActive })}
        onClick={() => switchChannel(item.id)}
        onMouseEnter={() => showActionButtins({ focusedButtonId: item.id })}
        onMouseLeave={() => hideActionButtins()}
      >
        <div className="d-flex align-items-center">
          <div className="mr-auto">
            {item.name}
          </div>
          {isFocused && item.removable && (
            <>
              <ChannelActionButton item={item} type="renaming" className="position-absolute" style={{ right: '45px', fontSize: '110%' }}>
                &#9998;
              </ChannelActionButton>
              <ChannelActionButton item={item} type="deleting" className="position-absolute" style={{ right: '25px', fontSize: '160%' }}>
                &times;
              </ChannelActionButton>
            </>
          )}
        </div>
      </Nav.Link>
    </Nav.Item>
  );
};

const ChannelsNav = (props) => {
  const { channels } = props;

  return (
    <Col xs={3} className="h-100 border-right overflow-auto">
      <div className="d-flex mb-2">
        <span className="align-self-center">Channels</span>
        <ChannelActionButton type="adding" className="btn btn-link p-0 ml-auto" style={{ textDecoration: 'none', fontSize: '130%' }}>
          +
        </ChannelActionButton>
      </div>
      <Nav variant="pills" as="ul" className="flex-column" fill>
        {channels.map(renderChannelButton(props))}
      </Nav>
    </Col>
  );
};

export default connect(mapStateToProps, actionCreators)(ChannelsNav);
