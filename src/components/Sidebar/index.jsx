// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';

import Nav from 'react-bootstrap/Nav';

import SimpleButton from './SimpleButton';
import DropdownButton from './DropdownButton';
import NavCategory from './NavCategory';

const renderChannelButton = (item) => {
  const ChannelButton = item.removable ? DropdownButton : SimpleButton;

  return (
    <Nav.Item key={item.id} as="li" className="mb-2">
      <ChannelButton item={item} />
    </Nav.Item>
  );
};

const ChannelsNav = (props) => {
  const { className } = props;
  // @ts-ignore
  const { channels } = useSelector((state) => state.channelsInfo);

  return (
    <div className={className}>
      <div className="h-100 overflow-auto">
        <NavCategory name="Channels" />
        <Nav variant="pills" as="ul" className="flex-column" fill>
          {channels.map(renderChannelButton)}
        </Nav>
      </div>
    </div>
  );
};

export default ChannelsNav;
