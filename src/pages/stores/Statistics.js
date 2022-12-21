import { CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import PaymentStatistic from '../../components/stores/PaymentStatistic'
import { useLocation } from 'react-router-dom';
const Statistics = () => {

    const { state } = useLocation();
    const { id } = state;

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={2} >
                <Grid item xs={12} component={Paper} sx={{ margin: 2 }}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Chi tiết doanh thu</Typography>
                    <Stack sx={{ paddingLeft: 1, paddingRight: 3, paddingY: 3 }}>
                        <Divider sx={{ marginY: 3 }} />
                        <PaymentStatistic payment={'All'} storeId={id} />
                        <Divider variant="middle" />
                        <PaymentStatistic payment={'Tien mat'} storeId={id} />
                        <Divider variant="middle" />
                        <PaymentStatistic payment={'Paypal - Thanh toán thành công'} storeId={id}/>
                        <Divider variant="middle" />
                        <PaymentStatistic payment={'Paypal - Thanh toán không thành công'} storeId={id} />
                        <Divider variant="middle" />
                        <PaymentStatistic payment={'Paypal - Chưa thanh toán'} storeId={id} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Statistics
