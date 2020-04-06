import styled from 'styled-components'

export const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: .25em;
  padding: 0.25em 1em;
  border: 1px solid palevioletred;
  border-radius: 3px;
  &:hover{
    cursor:pointer;
    background-color:palevioletred;
    color:white;
  }
`;