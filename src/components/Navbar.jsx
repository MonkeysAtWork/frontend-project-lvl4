import React from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../slices';

const NavBar = () => {
  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch(actions.toggleSidebarState());

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-faded">
      <a className="navbar-brand" href="#Chat">Chat</a>
      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        onClick={toggleSidebar}
      >
        <span className="navbar-toggler-icon" />
      </button>
    </nav>
  );
};

export default NavBar;
