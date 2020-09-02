// @ts-check

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import cn from 'classnames';

export default (props) => {
  const { channels, current } = props;

  return (
    <Nav variant="pills" as="ul" className="flex-column" fill>
      {channels.map(({ id, name }) => (
        <Nav.Item key={id} as="li">
          <Nav.Link as="button" className={cn('btn btn-block', { active: id === current })}>
            {name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};
