import React, { useEffect, useState } from 'react'
import {
    Button,
    Box,
    Typography,
    Stack,
    Grid,
    Divider,
    CircularProgress
} from '@mui/joy';
import configServ from '../services/config';
import ImageCard from './ImageList';


export default function ItemImageUpload({ id }) {

    const [files, setFiles] = useState([]);
    const [itemImg, setItemImg] = useState([]);
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(Array.from(selectedFiles));
    };

    const handleUpload = async () => {
        if (files) {
            console.log('Uploading files:', files);
            let dataToSend = new FormData()
            files.forEach((item) => {
                dataToSend.append('itemImage', item)
            })
            dataToSend.append('itemId', id)
            dataToSend.append('alt', id)
            try {
                await configServ.addImage(dataToSend)
                console.log('Upload Successfully')
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('Select atleast one image')
        }
    };

    const fetchImage = async () => {
        try {
            setProcessing(true)
            const result = await configServ.getImageByItemId(id)
            console.log(result)
            setItemImg(result)
            setProcessing(false)
        } catch (err) {
            console.log(err)
            setProcessing(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchImage()
        }
    }, [id])

    return (
        <Stack>
            <Box>
                {processing && <CircularProgress size='sm'/>}
                <ImageCard data={itemImg} />
            </Box>
            <Divider/>
            <Box>
                <Typography variant="h5">Upload Image(s)</Typography>
                <Box
                    component={'input'}
                    accept="image/*"
                    type='file'
                    multiple
                    label="Choose Image"
                    onChange={handleFileChange}
                    sx={{
                        border: '1px solid #33333355',
                        borderRadius: 10,
                        padding: 1,
                        cursor: 'pointer'
                    }}
                />
            </Box>
            <Grid
                container
                spacing={1}
                sx={{
                    padding: 2
                }}
            >
                {files.map((file, index) => {
                    const obj = URL.createObjectURL(file)
                    return (
                        <Grid key={index} xs={4} sm={1}>
                            <Box
                                component={'img'}
                                src={obj || null}
                                alt='abc'
                                width={'100%'}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            {files.length > 0 && (<Button
                variant="solid"
                onClick={handleUpload}
                sx={{
                    maxWidth: {
                        xs: '100%',
                        sm: '15em'
                    }
                }}
            >
                Upload
            </Button>)}
        </Stack>
    )
}
