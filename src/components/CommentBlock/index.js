import { Divider, List, Typography } from '@mui/material';
import React from 'react';
import CommentItem from '../CommentItem';
import dateFixer from '../../utils/dateFixer'

const CommentBlock = ({comments, isLoading}) => {

    if (comments.message) {
        return (
            <>
                <Typography variant='h5' gutterBottom >Комментарии:</Typography>
                <Typography variant='body1' ml={2} mb={2} >{comments.message}</Typography>
            </>
        )
    }
    
    return (
        <>
            <Typography variant='h5' gutterBottom>Комментарии:</Typography>
            <List>
                {(isLoading ? [...Array(5)] : comments).map((comment, i, arr) => (
                    isLoading ? (
                        <CommentItem key={i} isLoading />
                    ) : (
                        <div key={i}>
                            <CommentItem 
                                text={comment.text} 
                                author={comment.author} 
                                date={dateFixer(comment.createdAt)}
                            />
                            {arr[i+1] && <Divider variant="inset" component='li' />}
                        </div>
                    )
                ))}
            </List>
        </>
    );
};

export default CommentBlock;