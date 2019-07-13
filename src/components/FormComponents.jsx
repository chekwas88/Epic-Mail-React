/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import { string, func, } from 'prop-types';

/**
 * @method InputField
 * @description InputField component
 * @param {object} props React props object
 * @returns {JSX} JSX Markup
 */
const InputField = (
  {
    type,
    fieldId,
    name,
    placeHolder,
    inputChangeHandler,
  }
) => (
  <Fragment>
    <input
      type={type}
      id={fieldId}
      name={name}
      placeholder={placeHolder}
      onChange={inputChangeHandler}
    />
  </Fragment>
);

InputField.propTypes = {
  type: string,
  fieldId: string.isRequired,
  name: string.isRequired,
  placeHolder: string.isRequired,
  inputChangeHandler: func.isRequired,
};

InputField.defaultProps = {
  type: 'text',
};

export { InputField };
