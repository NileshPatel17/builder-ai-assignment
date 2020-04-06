import React from 'react';
import styled from 'styled-components'
const Table = styled.table`
    border-spacing: 0;
    width:99vw;
    overflow-x:none
`;

const Th=styled.th`
    margin: 0;
    padding: 0.5rem;
    background-color:#19d9b4;
    text-align:left;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
`;

const Td = styled.td`
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    &last-child{
        border-right: 0;
    }
`;

export function Posts({ data }) {
    const columns = [
        {
            header: 'Title'
        },
        {
            header: 'Author'
        },
        {
            header: 'Created'
        }
    ]
    return (
        <Table>
            <thead>
                <tr>
                    {
                        columns.map((col, index) => (
                            <Th key={index}>{col.header}</Th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map((item, index) => (
                        <tr key={index}>
                            <Td><a href={item.url}>{item.title}</a></Td>
                            <Td>{item.author}</Td>
                            <Td>{item.created_at}</Td>
                        </tr>
                    ))
                }

            </tbody>
        </Table>
    )
}