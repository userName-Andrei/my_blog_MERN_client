import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography} from '@mui/material';
import React from 'react';
import UserData from './UserData';

const SkeletonComment = () => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Skeleton variant='circular' width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Skeleton width='40%' height={15} />
                    }
                    secondary={
                        <>
                            <Skeleton width='20%' height={10} style={{ marginBottom: 6 }}/>
                            <Skeleton width='100%' height={10} />
                            <Skeleton width='100%' height={10} />
                            <Skeleton width='80%' height={10} />
                        </>
                        
                    }
                />
            </ListItem>
        </>
    )
}

const CommentItem = ({text, author, date, isLoading}) => {

    if (isLoading) {
        return (
            <SkeletonComment />
        );
    }

    return (
        <UserData user={author} postDate={date}>{text}</UserData>
    );
};

export default CommentItem;