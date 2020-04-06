import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

export function SearchInput({ name, val, onInputChange }) {
    const [inputVal, setInputVal] = useState(val);

    const func = (value) => {
        onInputChange(value)
    }

    const [debouncedFunction] = useDebouncedCallback(func, 1000);

    const inputhandler = (e) => {
        setInputVal(e.target.value)
        debouncedFunction(e.target.value)
    }
    return (
        <div>
            <input
                name={name}
                value={inputVal}
                onChange={inputhandler}
            />
        </div>
    );
}

function useDebouncedCallback(callback, delay) {

    const d = callback;

    const callbackfunc = useCallback(debounce(d, delay), []);

    return [callbackfunc]
}

