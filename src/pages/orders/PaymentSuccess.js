import * as React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { orderService } from '../../services/order.services';
const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId')
    useEffect(() => {
        orderService.notifySuccess(orderId);
    }, []);
    return (
        <>
            <Alert severity="success">
                <AlertTitle><strong>Thanh toán thành công</strong></AlertTitle>
                Hãy quay lại ứng dụng!
            </Alert>
        </>
    )
}

export default PaymentSuccess