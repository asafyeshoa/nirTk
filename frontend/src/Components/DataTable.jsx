import React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useModal} from "../context/modal-context";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function DataTable() {
    const [employees, setEeployeess] = useState([])
    const {setModal} = useModal()
    console.log(employees)

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3000/getUsers',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {
                setEeployeess(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <Button variant="contained" style={{margin: '10px'}} onClick={() => {
                setModal({action: 'Add'})
            }}>Add</Button>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >First name</StyledTableCell>
                            <StyledTableCell align="right">Last name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="right">Date started</StyledTableCell>
                            <StyledTableCell align="right">Salary</StyledTableCell>
                            <StyledTableCell align="right">Manager</StyledTableCell>
                            <StyledTableCell align="right">Employed type</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees?.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.firstName}
                                </StyledTableCell>
                                <StyledTableCell >{row.lastName}</StyledTableCell>
                                <StyledTableCell align="center" >{row.email}</StyledTableCell>
                                <StyledTableCell >{row.dateStarted}</StyledTableCell>
                                <StyledTableCell >{row.salary}</StyledTableCell>
                                <StyledTableCell >{row.manager}</StyledTableCell>
                                <StyledTableCell >{row.employedType}</StyledTableCell>

                                <StyledTableCell align="right">
                                    <IconButton aria-label="delete" size="large" onClick={() => {
                                        setModal({
                                            action: 'Edit',
                                            row: {
                                                id: row._id,
                                                payload: row
                                            }
                                        })
                                    }}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete" size="large" onClick={() => {
                                        setModal({
                                            action: 'Delete',
                                            row: {
                                                id: row._id
                                            }
                                        })
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>


                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
