import React from "react";

function FormInput({ values, func, type, classNameText, placeholderText }) {
  return (
    <>
      <input
        required={true}
        value={values}
        className={`input ${classNameText}`}
        type={`${type}`}
        name={`${placeholderText}`}
        placeholder={`${placeholderText}`}
        onChange={(e) => func(e.target.value)}
      />
      <label htmlFor={`${placeholderText}`}></label>
    </>
  );
}

export default FormInput;
