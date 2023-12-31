import React from 'react'

const FormRowSelect = ({ name, value, labelText, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className='form-label'>{labelText || name}</label>
      <select
        name={name}
        value={value}
        id={name}
        className='form-select'
        onChange={handleChange}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>{itemValue}</option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect