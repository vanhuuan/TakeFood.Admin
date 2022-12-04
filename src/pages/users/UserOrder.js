import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Box, Slider, Typography } from '@mui/material';
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
import { Label } from '@mui/icons-material';
import { userServices } from '../../services/users.services';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const blue = '#89D5C9'
const orange = '#FF8357'

const followersMarks = [
    {
        value: 0,
        scaledValue: 1000,
        label: "1k"
    },
    {
        value: 5000,
        scaledValue: 5000,
        label: "5k"
    },
    {
        value: 10000,
        scaledValue: 10000,
        label: "10k"
    },
    {
        value: 25000,
        scaledValue: 25000,
        label: "25k"
    },
    {
        value: 50000,
        scaledValue: 50000,
        label: "50k"
    },
    {
        value: 100000,
        scaledValue: 100000,
        label: "100k"
    },
    {
        value: 250000,
        scaledValue: 250000,
        label: "250k"
    },
    {
        value: 500000,
        scaledValue: 500000,
        label: "500k"
    },
    {
        value: 1000000,
        scaledValue: 1000000,
        label: "1M"
    }
];

const scaleValues = (valueArray) => {
    return [scale(valueArray[0]), scale(valueArray[1])];
};

const scale = (value) => {
    if (value === undefined) {
        return undefined;
    }
    const previousMarkIndex = Math.floor(value / 25);
    const previousMark = followersMarks[previousMarkIndex];
    const remainder = value % 25;
    if (remainder === 0) {
        return previousMark.scaledValue;
    }
    const nextMark = followersMarks[previousMarkIndex + 1];
    const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
    return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

const UserOrders = (props) => {
    const navigate = useNavigate()

    const onOrderClick = (e, row) => {
        e.stopPropagation();
        navigate('/orderDetail', { state: { id: row.orderId } });
    };
    const columns = [
        { field: 'stt', headerName: 'STT', width: 50, sortable: false },
        { field: 'orderId', headerName: 'Mã đơn hàng', width: 200, sortable: false },
        { field: 'address', headerName: 'Địa chỉ nhận hàng', width: 200, sortable: false },
        { field: 'phoneNumber', headerName: 'SĐT nhận hàng', width: 200, sortable: false },
        {
            field: 'total',
            headerName: 'Thành tiền',
            width: 110,
            sortable: false,
            renderCell: (params) => {
                return <Typography>
                    {
                        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(params.row.total)
                    }
                </Typography>
            }
        },
        {
            field: 'orderDate', headerName: 'Ngày đặt hàng', width: 200, sortable: false,
            renderCell: (params) => {
                return <Typography style={{width: 200}}>
                    {
                        new Intl.DateTimeFormat('vi-VN', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            month: 'numeric',
                            day: 'numeric',
                            weekday: 'long',
                            year: 'numeric',
                            timeZone: 'Asia/Ho_Chi_Minh',
                        }).format(Date.parse(params.row.orderDate))
                    }
                </Typography>
            }
        },
        { field: 'state', headerName: 'Trạng thái', width: 120, sortable: false },
        {
            field: 'Đơn hàng',
            headerName: 'Đơn hàng',
            description: 'Xem chi tiết đơn hàng.',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return <IconButton sx={{ color: blue }}
                    onClick={(e) => onOrderClick(e, params.row)}
                    variant="contained"> <VisibilityIcon></VisibilityIcon>
                </IconButton>
            }
        }
    ];

    const { state } = useLocation();
    const { id } = state;

    const [value, setValue] = React.useState([1, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(value)
    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    const [startDay, setStartDay] = React.useState(dayjs.unix(1318781876));

    const handleStartDayChange = (newValue) => {
        setStartDay(newValue);
    };
    const [endDay, setEndDay] = React.useState(dayjs.unix(1731468338));

    const handleEndDayChange = (newValue) => {
        setEndDay(newValue);
    };

    const [stateType, setStateType] = useState("All")
    const [sortType, setSortType] = useState("Asc")
    const [sortBy, setSortBy] = useState("CreateDate")
    const token = localStorage.getItem("AccessToken")

    const fetchData = async () => {
        setPageState(old => ({ ...old, isLoading: true }))
        var response = await userServices.getUserOrderPaging(pageState.page, pageState.pageSize, value[0], value[1] * 1000, stateType, startDay.toISOString(), endDay.toISOString(), sortBy, sortType, id);
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
                                <Slider
                                    style={{ maxWidth: 500 }}
                                    value={value}
                                    min={0}
                                    step={1}
                                    max={200}
                                    valueLabelFormat={numFormatter}
                                    marks={followersMarks}
                                    scale={scaleValues}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                    disableSwap
                                />
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={stateType}
                                    label="Search feld"
                                    onChange={e => { setStateType(e.target.value) }}
                                >
                                    <MenuItem value={"All"}>Tất cả</MenuItem>
                                    <MenuItem value={"Ordered"}>Đã đặt</MenuItem>
                                    <MenuItem value={"Cofirmed"}>Đã xác nhận</MenuItem>
                                    <MenuItem value={"Canceled"}>Đã hủy</MenuItem>
                                    <MenuItem value={"Preparing"}>Đang chuẩn bị</MenuItem>
                                    <MenuItem value={"Delivering"}>Đang giao</MenuItem>
                                    <MenuItem value={"Received"}>Đã nhận</MenuItem>
                                    <MenuItem value={"Reivewed"}>Đã đánh giá</MenuItem>
                                </Select>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Ngày bắt đầu"
                                        value={startDay}
                                        onChange={handleStartDayChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DateTimePicker
                                        label="Ngày kết thúc"
                                        value={endDay}
                                        onChange={handleEndDayChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
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
                                <MenuItem value={"Total"}>Tổng tiền</MenuItem>
                                <MenuItem value={"CreateDate"}>Ngày đặt hàng</MenuItem>
                                <MenuItem value={"OrderId"}>Mã đơn hàng</MenuItem>
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

export default UserOrders