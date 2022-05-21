import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
        value={value}
        onChange={e => onChange(e.target.value)}>
            <option disabled value="">{defaultValue}</option>
            {options.map(el => <option value={el.value} key={el.value}>{el.name}</option>)}
        </select>
    );
};

export default MySelect;