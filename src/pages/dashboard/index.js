import { PersonPinCircleOutlined } from '@mui/icons-material';
import { Card, Typography, CircularProgress } from '@mui/material';
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
import { userServices } from '../../services/users.services';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => {
    let navigate = useNavigate()
    const token = localStorage.getItem("AccessToken")
    const [chartData, setChartData] = useState({})
    const [turnover, setTurnover] = useState(0)
    const [newUser, setNewUser] = useState()
    const [isLoading, setLoading] = useState(true)
    
    const fetchStatic = async () => {
        const newUsers = await userServices.getNewUsser()
        if (newUsers.data) {
            setNewUser(newUsers.data)
        }
        const chartsData = await userServices.getRevenue(2022)
        if(chartsData.data){
            setChartData(chartsData.data);
            setTurnover(chartsData.data[11].revenue);        
        } 
        setLoading(false)
    };

    useEffect(() => {
        fetchStatic()
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <Typography variant='h6'>Doang thu tháng này</Typography>
                        <Typography variant='h5' sx={{ marginY: 2, fontWeight: 'bold' }}>{turnover}</Typography>
                    </Item>
                </Grid>
                {isLoading ? <></> :
                    <Grid item xs={8}>
                        {isLoading?<CircularProgress sx={{ alignSelf: 'center' }} />:<Income chartsData={chartData}/>}
                    </Grid>
                }
                {isLoading ? <></> :
                    <Grid item xs={4}>
                        <Card>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                                {newUser.map((s) => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonPinCircleOutlined />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={s.name} />
                                    </ListItem>
                                ))}

                            </List>
                        </Card>
                    </Grid>
                }
            </Grid>
        </Box>
    )
}

export default Dashboard