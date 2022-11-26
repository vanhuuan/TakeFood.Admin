import React from 'react'
import { Stack, Box } from '@mui/system'
import { useLocation } from 'react-router-dom';
import {
    Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    InputLabel, ListItemText, MenuItem, Select, FormControl, IconButton, Typography, Button, Grid, CircularProgress
} from '@mui/material';
import { AccountCircle, CalendarMonth, LocalShipping, LocationOn } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { storeServices } from '../../services/stores.services';
import { orderService } from '../../services/order.services';


const OrderDetail = () => {
    const { state } = useLocation();
    const { id } = state;
    const token = localStorage.getItem("AccessToken")

    const [detail, setDetail] = useState({})
    const [isLoading, setLoading] = useState(true)

    const getOrderDetail = async (orderId, token) => {
        try {
            const orderDetail = await orderService.getOrderDetail(orderId, token)
            if (orderDetail.data) {
                setDetail(orderDetail.data)
                console.log(orderDetail.data)
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrderDetail(id, token)
        console.log("detail:", detail)
    }, [])

    const mainColor = '#89D5C9'
    // function createData(stt, food, price, quantity, subtotal) {
    //     return { stt, food, price, quantity, subtotal };
    // }

    // const rows = [
    //     createData(1, 'Trà sữa truyền thống', 25000, 1, 25000),
    // ]
    return (
        <>
            <Stack
                spacing={2} sx={{
                    margin: 3,
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 3px grey'
                }}>
                {
                    isLoading ? (
                        <div style={{ alignSelf: 'center' }}>
                            <CircularProgress />
                        </div>
                    ) :
                        (<>
                            <Box
                                sx={{
                                    backgroundColor: mainColor, color: 'white', paddingY: 1, paddingX: 2,
                                    display: 'flex', justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <Typography>
                                        <CalendarMonth />
                                        {detail.orderDate &&
                                            new Intl.DateTimeFormat('vi-VN', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: false,
                                                month: 'numeric',
                                                day: 'numeric',
                                                weekday: 'long',
                                                year: 'numeric',
                                                timeZone: 'Asia/Ho_Chi_Minh',
                                            }).format(Date.parse(detail.orderDate))}
                                    </Typography>
                                    <Typography>
                                        Mã đơn hàng: {detail.orderId}
                                    </Typography>
                                </div>
                            </Box>
                            <Grid container paddingX={2} >
                                <Grid item xs={4}>
                                    <AccountCircle sx={{ color: mainColor }} />
                                    <Typography> {detail.storeName}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <LocalShipping sx={{ color: mainColor }} />
                                    <Typography>{detail.phoneNumber}</Typography>
                                    <Typography>Thanh toán: {detail.paymentMethod}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <LocationOn sx={{ color: mainColor }} />
                                    <Typography> {detail.address}</Typography>
                                </Grid>
                            </Grid>
                            <Box sx={{ paddingX: 10 }}  >
                                <TableContainer component={Paper}
                                    sx={{ [`& .MuiTableCell-root`]: { fontSize: 'inherit' }, }}>
                                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                        <TableHead sx={{ borderBottom: '2px solid black' }}>
                                            <TableRow>
                                                <TableCell align="center">STT</TableCell>
                                                <TableCell align="center">Món ăn</TableCell>
                                                <TableCell align="center">Đơn giá</TableCell>
                                                <TableCell align="center">Số lượng</TableCell>
                                                <TableCell align="center">Thành tiền</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {detail.foods.map((s, i = 0) => (
                                                <>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell align="center">{++i}</TableCell>
                                                    <TableCell align="center">{s.foodName}</TableCell>
                                                    <TableCell align="center">{s.total / s.quantity}</TableCell>
                                                    <TableCell align="center">{s.quantity}</TableCell>
                                                    <TableCell align="center">{s.total}</TableCell>
                                                </TableRow>
                                                {s.toppings.map((topping) => (
                                                    <TableRow sx={{ fontSize: 'smaller' }}>
                                                        <TableCell align="center" colSpan={3} >{topping.toppingName}</TableCell>
                                                        <TableCell align="center" >{topping.quantity}</TableCell>
                                                        <TableCell align="right" >
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                                .format(topping.total)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                </>
                                            ))}


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="subtitle2" mt={1}>Ghi chú: {detail.note}</Typography>

                                <Grid container sx={{ marginY: 2 }}>
                                    <Grid item xs={6} />
                                    <Grid item xs={3}>
                                        <Typography>Tạm tính:</Typography>
                                        <Typography>Giảm giá:</Typography>
                                        <Typography>Phí ship:</Typography>
                                        <Typography>Tổng cộng:</Typography>
                                        <Typography sx={{ marginTop: 2 }}>Trạng thái:</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography sx={{ textAlign: 'right' }}>
                                            {new Intl.NumberFormat('vi-VN',
                                                { style: 'currency', currency: 'VND' })
                                                .format(detail.discount + detail.total)}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'right' }}>
                                            {new Intl.NumberFormat('vi-VN',
                                                { style: 'currency', currency: 'VND' })
                                                .format(detail.discount)}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'right' }}>
                                            {new Intl.NumberFormat('vi-VN',
                                                { style: 'currency', currency: 'VND' })
                                                .format(0)}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                            {new Intl.NumberFormat('vi-VN',
                                                { style: 'currency', currency: 'VND' })
                                                .format(detail.total)}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'right', color: '#FF8357', fontWeight: 'bold', marginTop: 2 }}>{detail.state}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>)
                }
            </Stack>
        </>
    )
}

export default OrderDetail
