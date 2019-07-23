import React, { Fragment } from 'react';
import { string, node, func } from 'prop-types';

/**
 * @method Modal
 * @description Modal component
 * @returns {JSX} JSX Markup
 */
const Modal = ({
  children, title, classname, close
}) => (
  <Fragment>
    <div className="modal-toggle modal-open" />
    <div className={classname}>
      <div className="modal-header">
        <header>
          <h3>{title}</h3>
          <button type="button" onClick={close}>X</button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </Fragment>
);

Modal.propTypes = {
  title: string.isRequired,
  classname: string.isRequired,
  children: node.isRequired,
  close: func.isRequired
};

export default Modal;
