import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
    Tabs,
    TabList,
    Card,
    CardActions,
    CardOverflow,
    TabPanel,
    Grid,
    Autocomplete
} from '@mui/joy';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { useParams, useNavigate } from 'react-router-dom';
import configServ from '../services/config';
import ItemImageUpload from './ItemImageUpload';


import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';


export default function ItemDetails() {

    const { itemId } = useParams()
    const [formData, setFormData] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setFormData((state) => ({
            ...state,
            [name]: value
        }))
    }

    const handleOnchangeSelect = (name, value) => {
        handleOnchange({ target: { name: name, value: value } })
    }


    useEffect(() => {
        const fetchItem = async (id) => {
            try {
                const result = await configServ.getItemById(id)
                // console.log(result)
                setFormData(result)
            } catch (err) {
                console.log(err)
            }
        }
        if (itemId) {
            fetchItem(itemId)
            setIsEdit(true)
        }
    }, [itemId])

    const cleaner = () => {
        setFormData({})
    }


    const handleSubmit = async () => {
        console.log(formData)
        if (!isEdit) {
            try {
                const result = await configServ.addtems(formData)
                console.log('Successfully added')
                cleaner()
                navigate('/item')
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const result = await configServ.updateItem(formData)
                console.log('Successfully Updated')
                cleaner()
                navigate('/item')
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        {isEdit ? formData.name : 'Add Item'}
                    </Typography>
                </Box>
                <Tabs
                    defaultValue={0}
                    sx={{
                        bgcolor: 'transparent',
                    }}
                >
                    <TabList
                        tabFlex={1}
                        size="sm"
                        sx={{
                            pl: { xs: 0, md: 4 },
                            justifyContent: 'left',
                            [`&& .${tabClasses.root}`]: {
                                fontWeight: '600',
                                flex: 'initial',
                                color: 'text.tertiary',
                                [`&.${tabClasses.selected}`]: {
                                    bgcolor: 'transparent',
                                    color: 'text.primary',
                                    '&::after': {
                                        height: '2px',
                                        bgcolor: 'primary.500',
                                    },
                                },
                            },
                        }}
                    >
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                            Item
                        </Tab>
                        {isEdit && (
                            <>
                                <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                                    Image
                                </Tab>
                            </>
                        )}
                    </TabList>
                    <TabPanel value={0}>
                        <Card>
                            <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                                <Grid xs={12} sm={8}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Name</FormLabel>
                                        <Input size="sm"
                                            name='name'
                                            value={formData.name || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                            size="sm"
                                            type='number'
                                            startDecorator={<PhoneIcon />}
                                            name='mobile'
                                            value={formData.mobile || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            size="sm"
                                            type="email"
                                            startDecorator={<EmailRoundedIcon />}
                                            sx={{ flexGrow: 1 }}
                                            name='email'
                                            value={formData.email || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl sx={{ flexGrow: 1 }} >
                                        <FormLabel>Longitude</FormLabel>
                                        <Input
                                            size="sm"
                                            type='number'
                                            startDecorator={<PinDropIcon />}
                                            name='longitude'
                                            value={formData.longitude || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Latitude</FormLabel>
                                        <Input
                                            type='number'
                                            size="sm"
                                            startDecorator={<PinDropIcon />}
                                            name='latitude'
                                            value={formData.latitude || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl sx={{ flexGrow: 1 }} >
                                        <FormLabel>Address Line 1</FormLabel>
                                        <Input
                                            size="sm"
                                            name='addressLine1'
                                            value={formData.addressLine1 || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Address Line 2</FormLabel>
                                        <Input
                                            size="sm"
                                            name='addressLine2'
                                            value={formData.addressLine2 || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={4}>
                                    <FormControl sx={{ flexGrow: 1 }} >
                                        <FormLabel>State</FormLabel>
                                        <Input
                                            size="sm"
                                            name='state'
                                            value={formData.state || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={4}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>City</FormLabel>
                                        <Input
                                            size="sm"
                                            name='city'
                                            value={formData.city || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={4}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Pin</FormLabel>
                                        <Input
                                            size="sm"
                                            type='number'
                                            name='pin'
                                            value={formData.pin || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={8}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Keyword</FormLabel>
                                        <Autocomplete
                                            placeholder='You can type multiple keywords'
                                            options={[]}
                                            freeSolo
                                            multiple
                                            value={formData.keyword || []}
                                            onChange={(e, value) => { handleOnchangeSelect('keyword', value) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="outlined" color="neutral">
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        onClick={handleSubmit}
                                    >
                                        {isEdit ? 'Save' : 'Add'}
                                    </Button>
                                </CardActions>
                            </CardOverflow>
                        </Card>
                    </TabPanel>
                    <TabPanel value={1}>
                        <ItemImageUpload id={itemId} />
                    </TabPanel>
                </Tabs>
            </Box >
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >


            </Stack>
        </Box >
    );
}
