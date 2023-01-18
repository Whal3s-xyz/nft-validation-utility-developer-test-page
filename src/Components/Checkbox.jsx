export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-whal3s-600 shadow-sm focus:ring-whal3s-500"
            onChange={(e) => handleChange(e)}
        />
    );
}
