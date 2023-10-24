import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

import Input from "../input/Input";

interface ClientNameGetterProps {
    parentCallback: (arg: string) => void;
}

const ClientNameGetter: React.FC<ClientNameGetterProps> = ({
    parentCallback,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);

    const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleClientNameSetter = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setError(true);
        } else {
            setError(false);
            console.log(inputValue);
            setDisabledInput(true);
            parentCallback(inputValue);
        }
    };

    useEffect(() => {}, []);

    return (
        <div className="page-center">
            <form onSubmit={handleClientNameSetter} tabIndex={0}>
                <Input
                    aria-label="Name Input"
                    label="What's your name?"
                    value={inputValue}
                    placeholder="Your name here"
                    onChange={handleInputchange}
                    error={error}
                    disabled={disabledInput}
                ></Input>
                {!disabledInput && (
                    <button
                        aria-label="Confirm name"
                        tabIndex={0}
                        type="submit"
                        className="submit-btn generic-button"
                    >
                        Confirm
                    </button>
                )}
            </form>
        </div>
    );
};

export default ClientNameGetter;
