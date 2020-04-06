import React from 'react';
import styled from 'styled-components'
import { SearchInput } from './search-input'
const Container = styled.div`
    border:1px solid lightgray;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    padding:10px 20px;
`;

export function Search({ onSearch }) {
    const [title, setTitle] = React.useState('')
    const [author, setAuthor] = React.useState('')

    const onTitleChange = (v) => {
        setTitle(v)
        onSearch(v, author)
    }
    const onAuthorChange = (v) => {
        setAuthor(v)
        onSearch(title, v)
    }
    return (
        <Container>
            <div>Search</div>
            <div>
                <label>Title</label>
                <SearchInput name="title" val={title} onInputChange={onTitleChange} />
            </div>
            <div>
                <label>Author</label>
                <SearchInput name="author" val={author} onInputChange={onAuthorChange} />
            </div>
        </Container>
    )
}