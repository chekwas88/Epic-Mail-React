/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import { string, bool, func, } from 'prop-types';

/**
 * @method InputField
 * @description InputField component
 * @param {object} props React props object
 * @returns {JSX} JSX Markup
 */
const InputField = (
  {
    required,
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
      required={required}
    />
  </Fragment>
);

InputField.propTypes = {
  type: string,
  required: bool,
  fieldId: string.isRequired,
  name: string.isRequired,
  placeHolder: string.isRequired,
  inputChangeHandler: func.isRequired,
};

InputField.defaultProps = {
  required: false,
  type: 'text',
};

export { InputField };
