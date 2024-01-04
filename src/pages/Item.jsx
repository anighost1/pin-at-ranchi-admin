import React, { useEffect, useState } from 'react';
import OrderList from '../components/OrderList';
import OrderTable from '../components/OrderTable';
import configServ from '../services/config';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import AddIcon from '@mui/icons-material/Add';

export default function Item() {

    const [items, setItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItems = async () => {
            const data = await configServ.getItems()
            setItems(data)
            // console.log(data)
        }
        fetchItems()
    }, [])

    const head = [
        {
            name: 'Name',
            row: 'name',
            position: 'main'
        },
        {
            name: 'Address',
            row: 'addressLine1',
            position: 'levelxs'
        },
        {
            name: 'Category',
            row: 'category.name',
            position: 'bullet'
        },
        {
            name: 'Status',
            row: 'status',
            position: 'right'
        },
    ]


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', px: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Typography level="h2" component="h1">
                    Item
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<AddIcon />}
                    size="sm"
                    onClick={()=>{navigate('details')}}
                >
                    Add Item
                </Button>
            </Box>
            <OrderTable rows={items} head={head} />
            <OrderList rows={items} head={head} />
        </Box>
    );
}
