import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components'

const Input = styled.input.attrs(props => ({
    type: 'text',
    size: props.small ? 5 : undefined,
}))`
    border-radius: 3px;
    border: 1px solid palevioletred;
    display: block;
    margin: 0 0 1em;
    padding: ${props => props.padding};
    padding-left:3px;
    height:27px;
    width:150px;
    margin-right:3px;  
    margin-left:3px;  
    ::placeholder {
      color: palevioletred;
    }
    &:focus{
        border: 2px solid palevioletred;
    }
  `
export function SearchInput({ name, placeholder, val, onInputChange }) {
    const [inputVal, setInputVal] = useState(val);

    const func = (value) => {
        const args = {
            name, value
        }
        onInputChange(args)
    }

    const [debouncedFunction] = useDebouncedCallback(func, 1000);

    const inputhandler = (e) => {
        setInputVal(e.target.value)
        debouncedFunction(e.target.value)
    }
    return (
        <Input small
            name={name}
            value={inputVal}
            placeholder={placeholder}
            onChange={inputhandler}
        />
    );
}

function useDebouncedCallback(callback, delay) {
    const d = callback;
    const callbackfunc = useCallback(debounce(d, delay), []);
    return [callbackfunc]
}

