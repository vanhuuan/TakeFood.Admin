import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { Label, RemoveRedEye } from '@mui/icons-material';
import { storeServices } from '../../services/stores.services';

const blue = '#89D5C9'
const orange = '#FF8357'

const Stores = () => {

    const navigate = useNavigate()

    const onDetailClick = (e, row) => {
        e.stopPropagation();
        navigate('/storeDetail', { state: { id: row.storeId } });
    };

    const columns = [
        { field: 'stt', headerName: 'STT', width: 50, sortable: false },
        { field: 'name', headerName: 'Tên cửa hàng', width: 200, sortable: false },
        { field: 'ownerName', headerName: 'Chủ cửa hàng', width: 200, sortable: false },
        { field: 'address', headerName: 'Địa chỉ', width: 250, sortable: false },
        {
            field: 'phoneNumber',
            headerName: 'Số điện thoại',
            width: 200,
            sortable: false,
        },
        { field: 'state', headerName: 'Trạng thái', width: 120, sortable: false },
        {
            field: 'Action',
            headerName: 'Action',
            description: 'Xem danh sách đơn hàng.',
            sortable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <span>
                            <IconButton sx={{ color: blue }}
                            onClick={(e) => onDetailClick(e, params.row)}
                            variant="contained">
                                <RemoveRedEye>
                                </RemoveRedEye>
                            </IconButton>
                        </span>
                        {/* <span>
                            <IconButton sx={{ color: blue }}>
                                <EditIcon>
                                </EditIcon>
                            </IconButton>
                        </span>
                        <span>
                            <IconButton sx={{ color: orange }}>
                                <DeleteIcon>
                                </DeleteIcon>
                            </IconButton>
                        </span> */}
                    </div>)
            }
        },
    ];

    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    const [queryString, setQueryString] = useState("All")
    const [queryType, setQueryType] = useState("All")
    const [sortType, setSortType] = useState("Asc")
    const [sortBy, setSortBy] = useState("Name")
    const token = localStorage.getItem("AccessToken")

    const fetchData = async () => {
        setPageState(old => ({ ...old, isLoading: true }))
        var response = "";
        if (queryString == null || queryString == "") {
            setQueryString("All");
        }
        if (queryType.toString() == "All") {
            response = await await storeServices.getStorePaging(pageState.page, pageState.pageSize, queryType, "All", sortBy, sortType, token)
        } else if (queryString) {
            response = await await storeServices.getStorePaging(pageState.page, pageState.pageSize, queryType, queryString, sortBy, sortType, token)
            if (response.data) {
                const json = response.data
                console.log(json)
                setPageState(old => ({ ...old, isLoading: false, data: json.cards, total: json.total }))
            }
        } else {
            alert("Query string cannot be null or empty")
            return;
        }
        if (response.data) {
            const json = response.data
            console.log(json)
            setPageState(old => ({ ...old, isLoading: false, data: json.cards, total: json.total }))
        }
    }
    useEffect(() => {
        fetchData()
    }, [pageState.page, pageState.pageSize])
    return (
        <div>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Card>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Text to search"
                                    inputProps={{ 'aria-label': 'Text To Search' }}
                                    value={queryString}
                                    onChange={e => { setQueryString(e.target.value) }}
                                />
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={queryType}
                                    label="Search feld"
                                    onChange={e => { setQueryType(e.target.value) }}
                                >
                                    <MenuItem value={"All"}>Tất cả</MenuItem>
                                    <MenuItem value={"Name"}>Tên cửa hàng</MenuItem>
                                    <MenuItem value={"PhoneNumber"}>Số điện thoại</MenuItem>
                                </Select>
                            </Paper>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={sortBy}
                                label="Sort field"
                                onChange={e => { setSortBy(e.target.value) }}
                            >
                                <MenuItem value={"Name"}>Tên cửa hàng</MenuItem>
                                <MenuItem value={"OwnerName"}>Tên chủ cửa hàng</MenuItem>
                                <MenuItem value={"PhoneNumber"}>Số điện thoại</MenuItem>
                            </Select>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={sortType}
                                label="Sort type"
                                onChange={e => { setSortType(e.target.value); }}
                            >
                                <MenuItem value={"Asc"}>Tăng dần</MenuItem>
                                <MenuItem value={"Desc"}>Giảm dần</MenuItem>
                            </Select>
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={fetchData}>
                                <SearchIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        autoHeight
                        rows={pageState.data}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        rowsPerPageOptions={[10, 30, 50, 70, 100]}
                        pagination
                        page={pageState.page - 1}
                        pageSize={pageState.pageSize}
                        paginationMode="server"
                        onPageChange={(newPage) => {
                            setPageState(old => ({ ...old, page: newPage + 1 }))
                        }}
                        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                        columns={columns}
                    />
                </div>
            </Box>
        </div >
    );
}

export default Stores