/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import { string, bool, func, } from 'prop-types';

/**
 * @method InputField
 * @description InputField component
 * @param {object} props React props object
 * @returns {JSX} JSX Markup
 */
const InputField = (props) => {
  const {
    required,
    fieldType,
    fieldId,
    fieldName,
    placeHolder,
    classname,
    label,
    forAttribute,
    value,
    inputChangeHandler,
  } = props;
  return (
    <Fragment>
      <label htmlFor={forAttribute}>
        {label}
        {' '}
        <span>{required && '*'}</span>
      </label>
      <input
        type={fieldType}
        id={fieldId}
        name={fieldName}
        className={classname}
        placeholder={placeHolder}
        onChange={inputChangeHandler}
        required={required}
        value={value}
      />
    </Fragment>
  );
};

InputField.propTypes = {
  fieldType: string.isRequired,
  required: bool,
  fieldId: string.isRequired,
  fieldName: string.isRequired,
  placeHolder: string.isRequired,
  inputChangeHandler: func.isRequired,
  value: string.isRequired,
  label: string.isRequired,
  forAttribute: string.isRequired,
  classname: string.isRequired,
};

InputField.defaultProps = {
  required: false
};


export { InputField };
