import React from 'react';
import styled from 'styled-components'
import { Button } from './components/button'
import { SearchInput } from './components/search-input'
const Container = styled.div`
    border:1px solid lightgray;
    display:flex;
    flex-direction:row;
    // justify-content:space-evenly;
    padding:10px 20px;
    margin-bottom:10px;
`;

export function Search({ onSearch }) {
    const initialVal = { title: '', author: '' };
    const [searchInput, setSearchInput] = React.useState(initialVal)

    const onInputChange = ({ name, value }) => {
        setSearchInput(prevData => {
            return { ...prevData, [name]: value };
        })
    }
    const resetInput = () => {
        setSearchInput(initialVal)
    }
    return (
        <Container>
            <div>Search</div>
            <div>
                <SearchInput name="title" placeholder="Title" val={searchInput.title} onInputChange={onInputChange} />
            </div>
            <div>
                <SearchInput name="author" placeholder="Author" val={searchInput.author} onInputChange={onInputChange} />
            </div>
            <div>
                <Button onClick={() => onSearch(searchInput)}>Search</Button>
                <Button onClick={() => resetInput()}>Reset</Button>
            </div>
        </Container>
    )
}