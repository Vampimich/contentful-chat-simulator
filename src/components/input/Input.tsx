import { ChangeEvent, FC } from "react";

interface InputProps {
    label: string;
    value: string | number;
    placeholder: string;
    error: boolean;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
    label,
    value,
    placeholder,
    error,
    disabled,
    onChange,
}) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={label} tabIndex={0}>
                {label}
            </label>
            <input
                id={label}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                tabIndex={0}
            />
            {error && (
                <p className="error" tabIndex={0}>
                    Messager can't be empty!
                </p>
            )}
        </div>
    );
};

export default Input;
