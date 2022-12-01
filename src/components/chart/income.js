import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
import { storeServices } from '../../services/stores.services'

export default function Income({ chartData }) {
  // const state = {
  //     labels: ['January', 'February', 'March',
  //              'April', 'May'],
  //     datasets: [
  //       {
  //         label: 'Rainfall',
  //         backgroundColor: 'rgba(75,192,192,1)',
  //         borderColor: 'rgba(0,0,0,1)',
  //         borderWidth: 2,
  //         data: [65, 59, 80, 81, 56]
  //       }
  //     ]
  //   }

  const [isLoading, setLoading] = useState(false)

  const revenueList = [65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 22, 22] //call api, set state
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const c = {
    series: [{
      name: 'Doanh thu',
      data: revenueList
    },],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: monthList,
      },
      yaxis: {
        title: {
          text: '(VND)'
        },
        labels: {
          formatter: function (value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
              .format(value);
          }
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
              .format(val)             //format gia tien
          }
        }
      }
    },
  }
  return (
    <Box display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
      <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>Thống kê doanh thu cả năm</Typography>

      {
        isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
          <ReactApexChart options={c.options} series={c.series} type="bar" />
      }
    </Box>
  );
}