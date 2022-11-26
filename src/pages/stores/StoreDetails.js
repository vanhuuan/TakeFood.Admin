import { Box, Button, Container, Divider, Grid, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Location from '../../components/location';
import PendingStatus from '../../components/stores/PendingStatus'
import Dropzone from 'react-dropzone';
import theme from '../../theme';
import UploadImage from '../../components/stores/UploadImage';
import { storeServices } from '../../services/stores.services';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StoreDetail = () => {
    const ownerId = localStorage.getItem("UserId")
    const token = localStorage.getItem("AccessToken")
    const [helperText, setHelperText] = useState('')
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()
    const { state } = useLocation();
    const { id } = state;

    const getStoreDetails = async (stoerId, token) => {
        const storeDetails = await storeServices.getStoreDetail(stoerId, token)
        if (storeDetails.data) {
            setDetails(storeDetails.data)
            console.log(storeDetails.data)
            setLoading(true);
        }
    }
    useEffect(() => {
        setLoading(false);
        getStoreDetails(id, token)
    }, [])

    const handleActive = () => {
        if (window.confirm(`Bạn có chắc muốn kích hoạt cửa hàng ${details.name}`)) {
            storeServices.activeStore(id, token)
            window.location.reload();
        }
    };

    const handleDeActive = () => {
        if (window.confirm(`Bạn có chắc muốn hủy kích hoạt cửa hàng ${details.name}`)) {
            storeServices.deactiveStore(id, token)
            window.location.reload();
        }
    };

    return (
        <div>
            {loading ? (
                <Box
                    display="flex"
                    justifyContent={"center"}
                    flexDirection={'column'}
                    paddingY={4}
                    paddingX={7}
                    marginY={3}
                    marginX={13}
                    sx={{ backgroundColor: 'white' }}
                >
                    <Typography align='center' variant='h6'
                        sx={{ fontWeight: "bold" }}
                        color={theme.palette.primary.main}>
                        THÔNG TIN ĐĂNG KÝ CỬA HÀNG TRÊN FOORDER
                    </Typography>
                    <Typography mt={2}>
                        Tên cửa hàng <span style={{ color: "#E25B45" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth required
                        size='small' margin="dense" type={'text'}
                        defaultValue={details.name}
                        disable={true}
                    >
                    </TextField>
                    <Typography mt={2}>
                        Số điện thoại cửa hàng <span style={{ color: "#E25B45" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        size='small' margin="dense" type={'text'}
                        defaultValue={details.phone}
                        disabled={true}
                    >
                    </TextField>
                    <Typography mt={2}>
                        Loại cửa hàng <span style={{ color: "#E25B45" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        size='small' margin="dense" type={'text'}
                        defaultValue={details.Categories}
                        disabled={true}
                    ></TextField>

                    <Typography mt={2}>
                        Mã số thuế <span style={{ color: "#E25B45" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        size='small' margin="dense" type={'text'}
                        defaultValue={details.TaxID}
                        disabled={true}
                    >
                    </TextField>
                    <Typography mt={2}>
                        Địa chỉ <span style={{ color: "#E25B45" }}>*</span>
                    </Typography>

                    <TextField
                        fullWidth
                        size='small' margin="dense" type={'text'}
                        placeholder="Số nhà, đường"
                        defaultValue={details.address.Stress}
                        disabled={true}
                    >
                    </TextField>
                    <Divider sx={{ marginY: 2 }} />
                    {/* hinh mat tien cua hang */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>
                                Hình ảnh mặt tiền của cửa hàng <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Hình ảnh mặt tiền của cửa hàng"
                                src={details.urlStoreImage}
                            />
                        </Grid>
                        {/* Hình ảnh bếp, khu vực chế biến * */}
                        <Grid item xs={6}>
                            <Typography>
                                Hình ảnh bếp, khu vực chế biến <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Hình ảnh bếp, khu vực chế biến"
                                src={details.urlKitchenImage}
                            />
                        </Grid>
                        {/* Hình ảnh thực đơn */}
                        <Grid item xs={6}>
                            <Typography>
                                Hình ảnh thực đơn <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Hình ảnh thực đơn "
                                src={details.urlMenuImage}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ marginY: 2 }} />
                    <Typography>
                        Thông tin chủ sở hữu <span style={{ color: "#E25B45" }}>*</span>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                size='small' fullWidth margin="dense" type={'text'}
                                placeholder='Tên chủ sở hữu'
                                defaultValue={details.nameOwner}
                                disabled={true}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                size='small' fullWidth margin="dense" type={'text'}
                                placeholder='Số CMND/CCCD'
                                defaultValue={details.cmnd}
                                disabled={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                (Mặt trước CMND/CCCD) <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Hình ảnh mặt trước CMND "
                                src={details.urlFontCmndImage}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                (Mặt sau CMND/CCCD) <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Hình ảnh mặt sau CMND "
                                src={details.urlBackCmndImage}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                Giấy phép kinh doanh <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Giấy phép kinh doanh"
                                src={details.urlLicenseImage}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginY: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>
                                Tên chủ tài khoản ngân hàng <span style={{ color: "#E25B45" }}>*</span> (viết hoa không dấu)
                            </Typography>
                            <TextField
                                size='small' fullWidth margin="dense" type={'text'}
                                defaultValue={details.nameSTKOwner}
                                disabled={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                Số tài khoản <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                            <TextField
                                size='small' fullWidth margin="dense" type={'text'}
                                defaultValue={details.STK}
                                disabled={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                Tên ngân hàng <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                            <TextField
                                size='small' fullWidth margin="dense" type={'text'}
                                defaultValue={details.NameBank}
                                disabled={true}>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                Chi nhánh <span style={{ color: "#E25B45" }}>*</span>
                            </Typography>
                            <TextField
                                size='small' fullWidth margin="dense" type={'text'}
                                defaultValue={details.BankBranch}
                                disabled={true}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginY: 2 }} />
                    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                        {details.State == "DeActive" ? <Button variant="contained" size="large"
                            onClick={handleActive}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                width: 'fit-content'
                            }}
                        >Xác nhận cửa hàng</Button> : 
                        <Button variant="contained" size="large"
                            onClick={handleDeActive}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                width: 'fit-content'
                            }}
                        >Ẩn cửa hàng</Button>}


                    </Container>
                </Box >) : <PendingStatus />}
        </div >
    )
}

export default StoreDetail
