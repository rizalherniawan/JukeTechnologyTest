import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useEffect, useState } from 'react'

export default function MainPage(){
    const [bios,setBio] = useState([])
    const [filterName,setName] = useState('')
    const [filterPosition,setPosition] = useState('')

    const getData = async() => {
        try {
            const url = `http://localhost:4000/bio`
            const res = await (await fetch(url, {
                method: 'GET',
            })).json()
            console.log(res.data)
            setBio(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getID = (id) => {
        let url = `http://localhost:4000/bio/view/${id}`
        window.open(url, '_blank')
    }

    const DeleteByID = async(id) => {
        try {
            const url= `http://localhost:4000/bio/${id}`
            await fetch(url, {
                method: 'DELETE',
            })
            const newData = [...bios]
            const index = bios.findIndex((data) => data.id === id)
            newData.splice(index, 1)
            setBio(newData)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    return(
        <>
        <div style = {{marginTop:'50px', marginLeft: '275px'}}><input type = "text" placeholder='Filter by name' onChange={(e) => {
            setName(e.target.value)
        }}/></div>
        <div style = {{marginTop:'25px', marginLeft: '275px'}}><input type = "text" placeholder='Filter by position' onChange={(e) => {
            setPosition(e.target.value)
        }}/></div>
        <TableContainer component={Paper} sx = {{width: 1000, mx: "auto", mt: 4}}>
            <Table sx={{ minWidth: 900, mt: 3 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">DOB</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Current Position</TableCell>
                    <TableCell align="center">View ID</TableCell>
                    <TableCell align="center">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {bios.filter((val) => {
                    if(filterPosition === '') {
                        return val
                    } else if(val.position.toLowerCase().includes(filterPosition.toLowerCase())) {
                        return val
                    }})
                    .filter((val) => {
                        if(filterName === '') {
                            return val
                        } else if(val.firstName.toLowerCase().includes(filterName.toLowerCase())) {
                            return val
                    }}).map((bio) => (
                    <TableRow>
                    <TableCell align="center">{bio.firstName + ' ' + bio.lastName}</TableCell>
                    <TableCell align="center">{bio.phoneNumber}</TableCell>
                    <TableCell align="center">{bio.dob}</TableCell>
                    <TableCell align="center">{bio.streetAddress}</TableCell>
                    <TableCell align="center">{bio.position}</TableCell>
                    <TableCell align="center"><IconButton onClick = {() => getID(bio.id)}><FileOpenIcon/></IconButton></TableCell>
                    <TableCell align="center"><IconButton onClick = {() => DeleteByID(bio.id)}><DeleteIcon/></IconButton></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
    </TableContainer>
    </>
    )
}