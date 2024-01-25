import React, { useEffect } from 'react'

import {
    ImageList,
    ImageListItem,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/joy';

export default function ImageCard({ data }) {
    useEffect(()=>{
        console.log(data)
    },[])
    return (
        <ImageList
            sx={{
                width: 500,
                height: 'auto'
            }}
            cols={3}
            rowHeight={164}>
            {data.map((item) => (
                <ImageListItem
                    key={item._id}
                    sx={{
                        border: '1px solid #33333333',
                        borderRadius: 10
                    }}
                >
                    <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                    />
                    <IconButton
                    sx={{
                        position:'absolute',
                        backgroundColor:'#ffffff77'
                    }}
                    >
                        {item.status?<CheckCircleIcon color='success'/>:<CancelIcon color='danger'/>}
                    </IconButton>

                </ImageListItem>
            ))}
        </ImageList>
    )
}
