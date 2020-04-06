import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'
import { Button } from './components/button';

const Table = styled.table`
    border-spacing: 0;
    width:97vw;
    overflow-x:none
`;

const Th = styled.th`
    margin: 0;
    padding: 0.5rem;
    background-color:lightgrey;
    color:palevioletred;
    text-align:left;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
`;
const Tr = styled.tr`
&:hover{
    cursor:pointer;
    background-color:lightgreen;
}
`;
const Td = styled.td`
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;;
`;

export function Posts({ data }) {
    const [selRowData, setSelRowData] = React.useState(null)
    const [modalIsOpen, setModalIsOpen] = React.useState(false)
    const customStyles = {
        content: {
            margin: '20px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            //   marginRight           : '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    const columns = [
        {
            header: 'Title'
        },
        {
            header: 'Author'
        },
        {
            header:'Link'
        },
        {
            header: 'Created'
        }
    ]
    const selectRow = (rowData) => {
        setSelRowData(rowData);
        setModalIsOpen(true)
    }
    return (
        <React.Fragment>
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
                            <Tr key={index} onClick={() => selectRow(item)}>
                                <Td>{item.title}</Td>
                                <Td>{item.author}</Td>
                                <Td>{item.url}</Td>
                                <Td>{new Date(item.created_at).toLocaleDateString("en-US")}</Td>
                            </Tr>
                        ))
                    }

                </tbody>
            </Table>
            <Modal
                ariaHideApp={true}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <pre>{JSON.stringify(selRowData, null, 2)}
                </pre>
                <Button onClick={() => setModalIsOpen(false)}>Close</Button>
            </Modal>

        </React.Fragment>)
}