import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import React from 'react';

const UserData = (props) => {
    const {user, postDate, children} = props;
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user.name} src={user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                primary={user.name}
                secondary={
                    <>
                        {postDate}
                        {children && 
                            <Box 
                                mt={1}
                                overflow='hidden'
                            >
                                <Typography 
                                    variant='body2' 
                                    color='text.primary'
                                    component='p'
                                >
                                    {children}
                                </Typography>
                            </Box>
                        }
                    </>
                }
                />
            </ListItem>
        </List>
    );
};

export default UserData;