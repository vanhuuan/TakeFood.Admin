import { CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import PaymentStatistic from '../../components/stores/PaymentStatistic'
import { useLocation } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';

const Statistics = () => {

    const { state } = useLocation();
    const { id } = state;
    const [sortBy, setSortBy] = useState("Year")
    const [mode, setMode] = useState(true)
    const [ye, setYe] = useState("2022")
    const [startDay, setStartDay] = React.useState(dayjs.unix(1640970001));

    const handleStartDayChange = (newValue) => {
        setStartDay(newValue);
    };
    const [endDay, setEndDay] = React.useState(dayjs.unix(1672505999));

    const handleEndDayChange = (newValue) => {
        setEndDay(newValue);
    };

    const setFilter = (e) => {
        setSortBy(e)
        setMode(!mode)
    }

    const fetchData = async () =>{
        setMode(mode)
        console.log(mode)
    }

    useEffect(() => {
        setMode(mode)
    }, [mode]);

    return (
        <Box sx={{ margin: 1 }}>
            <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={sortBy}
                label="Doanh thu theo năm"
                onChange={e => { setFilter(e.target.value) }}
                className='option'
                size="small"
            >
                <MenuItem value={"Year"}>Thống kê theo năm</MenuItem>
                <MenuItem value={"Day"}>Thống kê theo ngày</MenuItem>
            </Select>
            {(sortBy === "Year")?
                <Select
                id="yearss"
                value={ye}
                label="Năm"
                onChange={e => { setYe(e.target.value) }}
                className='option'
                size="small"
                >
                    <MenuItem value={"2022"}>2022</MenuItem>
                    <MenuItem value={"2023"}>2023</MenuItem>
                </Select>:<>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DesktopDatePicker
                        label="Ngày bắt đầu"
                        value={startDay}
                        onChange={handleStartDayChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Ngày kết thúc"
                        value={endDay}
                        onChange={handleEndDayChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                </>}
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={fetchData}>
                <SearchIcon />
            </IconButton>
            {(mode)?
                <Grid container> 
                <Grid item xs={12} component={Paper} sx={{ padding: 2 }}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Chi tiết doanh thu</Typography>
                    <Stack >
                        <Divider sx={{ marginY: 3 }} />
                        <PaymentStatistic payment={'All'} storeId={id} showText={sortBy} yearNum={ye}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Tien mat'} storeId={id} showText={sortBy} yearNum={ye}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Paypal - Thanh toán thành công'} storeId={id}  showText={sortBy} yearNum={ye}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Paypal - Thanh toán không thành công'} storeId={id} showText={sortBy} yearNum={ye}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Paypal - Chưa thanh toán'} storeId={id} showText={sortBy} yearNum={ye}/>
                    </Stack>
                </Grid>
                </Grid>
                :
                <Grid container> 
                "Hehehe"
                <Grid item xs={12} component={Paper} sx={{ padding: 2 }}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Chi tiết doanh thu</Typography>
                    <Stack >
                        <Divider sx={{ marginY: 3 }} />
                        <PaymentStatistic payment={'All'} storeId={id} dateStart={startDay.toISOString()} dateEnd={endDay.toISOString()} showText={sortBy}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Tien mat'} storeId={id} dateStart={startDay.toISOString()} dateEnd={endDay.toISOString()} showText={sortBy}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Paypal - Thanh toán thành công'} storeId={id} dateStart={startDay.toISOString()} dateEnd={endDay.toISOString()} showText={sortBy}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />
                        <PaymentStatistic payment={'Paypal - Thanh toán không thành công'} storeId={id} dateStart={startDay.toISOString()} dateEnd={endDay.toISOString()} showText={sortBy}/>
                        <Divider variant="middle" sx={{ marginY: 2 }} />dateEnd
                        <PaymentStatistic payment={'Paypal - Chưa thanh toán'} storeId={id} dateStart={startDay.toISOString()} dateEnd={endDay.toISOString()} showText={sortBy}/>
                    </Stack>
                </Grid>
                </Grid>
            } 
        </Box>
    )
}

export default Statistics
