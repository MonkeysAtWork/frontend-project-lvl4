// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Row from 'react-bootstrap/Row';

import Chat from './Chat';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Modal from './Modal';

const App = () => {
  // @ts-ignore
  const isSidebarOpen = useSelector((state) => state.sidebarInfo.open);

  return (
    <>
      <Navbar />
      <div className="container-lg h-100 overflow-hidden">
        <Row className="h-100 pb-3">
          <Sidebar className={cn('h-100 border-right col-12 col-sm-4 col-lg-3, d-sm-block', { 'd-none': !isSidebarOpen })} />
          {!isSidebarOpen && <Chat className="h-100 col-12 col-sm-8 col-lg-9" />}
        </Row>
      </div>
      <Modal />
    </>
  );
};

export default App;
