import React, { useEffect, useState } from 'react'

import {
    Box,
    ImageList,
    ImageListItem,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export default function ImageCard({ data }) {

    const [open, setOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState('');

    // useEffect(() => {
    //     console.log(data)
    // }, [])

    const handleChange = (e) => {
        setSelectedImg(e.target.src);
        setOpen((prev) => !prev);
    };

    return (
        <>
            <ImageList
                sx={{
                    width: '100%',
                    height: 'auto',
                }}
                cols={3}
                rowHeight={164}>
                {data.map((item, index) => (
                    <ImageListItem
                        key={index}
                        onClick={handleChange}
                        sx={{
                            border: '1px solid #33333333',
                            borderRadius: 10,
                            cursor: 'pointer',
                            "&:hover": {
                                transform: 'scale(1.01)',
                                transition: 'transform 0.2s ease',
                                zIndex: 10
                            }
                        }}
                    >
                        <img
                            src={item}
                            alt={index}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            {open && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 11,
                        animation: 'fadeIn 0.1s ease-out',
                        '@keyframes fadeIn': {
                            from: { opacity: 0, transform: 'scale(0.9)' },
                            to: { opacity: 1, transform: 'scale(1)' },
                        },
                    }}
                >
                    <Box
                        component={'button'}
                        onClick={handleChange}
                        sx={{
                            position: 'fixed',
                            top: '10%',
                            right: '5%',
                            color: 'white',
                            zIndex: 11,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderRadius: 10,
                            border: 'none'
                        }}
                    >
                        <CloseIcon color='primary' />
                    </Box>
                    <img
                        src={selectedImg}
                        alt={'selected'}
                        loading="lazy"
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            borderRadius: 10,
                        }}
                    />
                </Box>)}

        </>
    )
}