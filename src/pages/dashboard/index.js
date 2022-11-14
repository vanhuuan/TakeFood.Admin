import { PersonPinCircleOutlined } from '@mui/icons-material';
import { Card } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import Income from '../../components/chart/income'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Dashboard = () => {
    let navigate = useNavigate()
    const [chartData, setChartData] = useState({})
    const [turnover, setTurnover] = useState(0)
    const [newUser, setNewUser] = useState({})

    useEffect(() => {
        const fetchStatic = async () => {
            //   const res = await fetch("API")
            //   const data = await res.json()
            //   console.log(data.data)
            //   setData({  
            //     /* Set data for char, for turnover */         
            //   });
            setTurnover(10000);
            setChartData(null);
        };
        fetchStatic()
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <h2>Doang thu tháng này</h2>
                        <h3>1000</h3>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    {/* <Income chartData={chartData}/> */}
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonPinCircleOutlined />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Lê Văn Kha" />
                            </ListItem>
                        </List>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                navigate("/user")
                            }}
                        >
                            Xem tất cả
                        </Link>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard