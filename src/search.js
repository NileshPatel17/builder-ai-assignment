import React from 'react';
import styled from 'styled-components'
import { useDebounce } from 'use-debounce';

const Container = styled.div`
    border:1px solid lightgray;
    display:flex;
    flex-direction:row;
    // justify-content:space-evenly;
    padding:10px 20px;
    margin-bottom:10px;
`;

const Select = styled.select`
    height:32px;
    width:100px;
    margin-right:10px;
    &:focus{
        border: 2px solid palevioletred;
    }
`;
const Header = styled.div`
    margin-right:5px;
`;

const Input = styled.input.attrs(props => ({
    type: 'text'
}))`
    border-radius: 3px;
    border: 1px solid palevioletred;
    display: block;
    margin: 0 0 1em;
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


export function Search({ onSearch }) {
    const [value, setValue] = React.useState('')
    const [searchField, setSearchField] = React.useState('url')
    const [debouncedValue] = useDebounce(value, 500);
    React.useEffect(() => {
        // do search stuff
        onSearch({ searchBy: searchField, value:debouncedValue })
    }, [debouncedValue]);

    const onChange = (event) => {
        setValue("")
        setSearchField(event.target.value)
    }
    return (
        <Container>
            <Header>Search</Header>
            <Select value={searchField} onChange={onChange}>
                <option value="title">By Title</option>
                <option value="author">By Author</option>
                <option value="url">By Url</option>
            </Select>
            <Input value={value} onChange={(event) => setValue(event.target.value)} />
        </Container>
    )
}