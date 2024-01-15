import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Select,
    Option,
    Typography,
    Tabs,
    TabList,
    Card,
    CardActions,
    CardOverflow,
    TabPanel,
    Grid,
    Textarea,
    Autocomplete
} from '@mui/joy';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { useParams } from 'react-router-dom';
import configServ from '../services/config';

export default function CategoryDetails() {

    const { id } = useParams()
    const [formData, setFormData] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchCategory = async (id) => {
            try {
                const result = await configServ.getCategoryById(id)
                // console.log(result)
                setFormData(result)
            } catch (err) {
                console.log(err)
            }
        }
        if (id) {
            fetchCategory(id)
            setIsEdit(true)
        }
    }, [id])

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

    const handleSubmit = async () => {
        console.log(formData)
        if (!isEdit) {
            try {
                const result = await configServ.addCategory(formData)
                console.log('Successfully added')
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const result = await configServ.updateCategory(formData)
                console.log('Successfully updated')
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
                        {isEdit ? formData.name : 'Add Category'}
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
                            Category
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                            Team
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                            Plan
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                            Billing
                        </Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <Card>
                            <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                                <Grid xs={12} sm={12}>
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Name</FormLabel>
                                        <Input size="sm"
                                            name='name'
                                            value={formData.name || ''}
                                            onChange={handleOnchange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={12}>
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
                                <Grid xs={12} sm={12}>
                                    <FormControl sx={{ flexGrow: 1 }} >
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            minRows={2}
                                            name='description'
                                            value={formData.description || ''}
                                            onChange={handleOnchange}
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
