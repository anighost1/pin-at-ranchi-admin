/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import get from 'lodash/get';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import { useNavigate } from 'react-router-dom';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


function RowMenu({ id, status, statusChange }) {
    const navigate = useNavigate()
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem onClick={() => { navigate(`details/${id}`) }}>Edit</MenuItem>
                <Divider />
                <MenuItem
                    color={status ? 'danger' : 'success'}
                    onClick={() => { statusChange(id) }}
                >
                    {status ? 'Inactive' : 'Active'}
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}


export default function OrderList({ data, head, pageSwitch, statusChange }) {

    const [listItems, setListItems] = React.useState([]);

    React.useEffect(() => {
        if (data.data) {
            setListItems(data.data)
        }
    }, [data])

    const nextPage = () => {
        if (data.next) {
            pageSwitch(data.next?.page, data.next?.limit)
        }
    }
    const prevPage = () => {
        if (data.prev) {
            pageSwitch(data.prev?.page, data.prev?.limit)
        }
    }


    return (
        <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}>
            {listItems.map((listItem) => (
                <List
                    key={listItem._id}
                    size="sm"
                    sx={{
                        '--ListItem-paddingX': 0,
                    }}
                >
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            mx: 2
                        }}
                    >
                        <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                            <div>
                                {head.map((item, index) => (
                                    <Typography
                                        key={index}
                                        fontWeight={item.position === 'main' ? 600 : undefined}
                                        level={item.position === 'levelxs' || item.position === 'bullet' ? 'body-xs' : undefined}
                                        gutterBottom={item.position === 'bullet' ? false : true}
                                    >
                                        {get(listItem, item.row)}
                                    </Typography>
                                ))}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <RowMenu id={listItem._id} status={listItem.status} statusChange={statusChange} />
                                </Box>
                            </div>
                        </ListItemContent>
                        {listItem.status !== undefined && (<Chip
                            variant="soft"
                            size="sm"
                            startDecorator={listItem.status ? <CheckRoundedIcon /> : <BlockIcon />}
                            color={listItem.status ? 'success' : 'danger'}
                        >
                            {listItem.status ? 'Active' : 'Inactive'}
                        </Chip>)}
                    </ListItem>
                    <ListDivider />
                </List>
            ))}
            <Box
                className="Pagination-mobile"
                sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
            >
                <IconButton
                    aria-label="previous page"
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    onClick={prevPage}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography level="body-sm" mx="auto">
                    {`Page ${data.currentPage} of ${data.totalPage}`}
                </Typography>
                <IconButton
                    aria-label="next page"
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    onClick={nextPage}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
