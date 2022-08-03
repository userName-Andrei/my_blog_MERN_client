import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import React from 'react';

const UserData = (props) => {
    const {user, postDate, children} = props;
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} disablePadding>
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
                            <div>
                                <Typography 
                                            variant='body2' 
                                            color='text.primary' 
                                            mt={1}
                                            component='span'
                                        >
                                            {children}
                                        </Typography>
                            </div>
                        }
                    </>
                }
                />
            </ListItem>
        </List>
    );
};

export default UserData;