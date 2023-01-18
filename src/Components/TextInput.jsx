
export default function TextInput(
    {type = 'text', name, id, value, className, autoComplete, required, isFocused, onChange}
) {


    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            className={
                `border-gray-300 focus:border-whal3s-500 focus:ring-whal3s-500 shadow-sm ` +
                className
            }
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => onChange(e)}
        />
    );
};
