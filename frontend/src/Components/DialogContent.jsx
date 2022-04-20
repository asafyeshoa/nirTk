import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const style = {
    dialogContentContainer: {
        display: "grid", gridTemplateColumns: 'auto '
    }, deleteWarningContainer: {
        display: 'flex', justifyContent: 'flex-end',
    }, inputContainer: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'
    }
}


export default function DialogContent(props) {
    const [employed, setEmployed] = useState(props?.employed?.row?.payload || null)
    const [managers, setManagers] = useState(null)

    useEffect(() => {

        const config = {
            method: 'get',
            url: 'http://localhost:3000/getManagers',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {
                setManagers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });


    }, [])

    async function handleDelete(answer) {
        if (answer === 'Yes') {

            const data = JSON.stringify({_id: props.employed.row.id});

            const config = {
                method: 'post',
                url: 'http://localhost:3000/deleteUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    props.unSetModal()
                })
                .catch(function (error) {
                    console.log(error);
                });


        } else if (answer === 'No') {
            props.unSetModal()
        }
    }

    if (props?.employed?.action === 'Delete') {

        return (<Box>
            <h2>Delete employed:</h2>
            <h2>You sure you want delete this product?</h2>
            <div style={style.deleteWarningContainer}>
                <Button variant="contained" color='success' style={{marginRight: '20px'}}
                        onClick={() => handleDelete("Yes")}>Yes</Button>
                <Button variant="contained" color='error' onClick={() => handleDelete("No")}>No</Button>
            </div>
        </Box>)
    }

    async function handleAddEdit() {
        if (props?.employed?.action === 'Edit') {
            const data = JSON.stringify({_id: `${employed._id}`, data: employed});

            const config = {
                method: 'post',
                url: 'http://localhost:3000/updateUser',
                Accept: '*/*',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    props.unSetModal()
                })
                .catch(function (error) {
                    console.log(error);
                });


        } else {
            const data = JSON.stringify(employed)
            const config = {
                method: 'post',
                url: 'http://localhost:3000/setUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                    props.unSetModal()
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    function handleChange(e) {
        let {name, value} = e.target
        if (name === "salary") value = parseInt(value)
        setEmployed({...employed, [`${name}`]: value})
    }


    return (<Box style={style.dialogContentContainer}>
        <h2>{`${props?.employed?.action} employed:`}</h2>
        <div style={style.inputContainer}>
            <p>First name:</p>
            <TextField
                name="firstName"
                onChange={handleChange}
                defaultValue={employed?.firstName}
                style={{width: "500px", margin: '10px'}}
            />
        </div>
        <div style={style.inputContainer}>
            <p>Last name:</p>
            <TextField
                name="lastName"
                onChange={handleChange}
                defaultValue={employed?.lastName}
                style={{width: "500px", margin: '10px'}}
            />
        </div>
        <div style={style.inputContainer}>
            <p>Email:</p>
            <TextField
                name="email"
                onChange={handleChange}
                defaultValue={employed?.email}
                style={{width: "500px", margin: '10px'}}
            />
        </div>

        <div style={style.inputContainer}>
            <p>Salary:</p>
            <TextField
                name="salary"
                type="number"
                onChange={handleChange}
                defaultValue={employed?.salary}
                style={{width: "500px", margin: '10px'}}
            />
        </div>

        <div style={style.inputContainer}>
            <p>Employed Type:</p>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Employed Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={employed?.employedType}
                    label="Employed Type"
                    onChange={handleChange}
                    name="employedType"
                    style={{width: "500px", margin: '10px'}}
                >
                    <MenuItem value={"Worker"}>Worker</MenuItem>
                    <MenuItem value={"Driver"}>Driver</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div style={style.inputContainer}>
            <p>Manager name:</p>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Manager name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={employed?.manager}
                    label="Employed Type"
                    onChange={handleChange}
                    name="manager"
                    style={{width: "500px", margin: '10px'}}
                >
                    {managers?.map(manager => (
                        <MenuItem key={manager._id} value={manager._id}>{manager.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>

        <div style={style.inputContainer}>
            <p>Date started:</p>
            <input type="date" id="start" name="dateStarted"
                   value={employed?.dateStarted || ""}
                   style={{width: "500px", margin: '10px', height: '56px'}}
                   onChange={handleChange}
            />
        </div>

        <div></div>
        <Button variant="contained"
                onClick={handleAddEdit}>{props?.employed?.action === 'Edit' ? "Update" : "Add"}</Button>

    </Box>)

}
