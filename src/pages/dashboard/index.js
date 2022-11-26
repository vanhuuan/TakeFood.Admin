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
        const newUsers = await userServices.getNewUsser(token)
        if (newUsers.data) {
            console.log(newUsers.data)
            setLoading(false)
            setNewUser(newUsers.data)
        }
        setTurnover(10000);
        setChartData(null);
    };

    useEffect(() => {
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
                {isLoading ? <></> :
                    <Grid item xs={8}>
                        {/* <Income chartData={chartData}/> */}
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
                }
            </Grid>
        </Box>
    )
}

export default Dashboard