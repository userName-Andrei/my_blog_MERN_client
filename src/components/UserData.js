import { Avatar, List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import React from 'react';

const UserData = (props) => {
    const {user, postDate} = props;
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user.name} src={user.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                primary={user.name}
                secondary={postDate}
                />
            </ListItem>
        </List>
    );
};

export default UserData;