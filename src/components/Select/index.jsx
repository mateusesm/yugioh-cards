import './style.css'

export const Select = ({ type, values }) => {
    return (
        <select name={type} className='select'>
            <option selected readOnly value="default">{type}</option>
            {values.map(value => {
                return (
                    <option key={value} value={value}>{value}</option>
                )
            })}
        </select>
    )
}