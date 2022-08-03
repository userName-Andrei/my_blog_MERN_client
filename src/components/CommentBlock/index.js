import { Divider, List, Typography } from '@mui/material';
import React from 'react';
import CommentItem from '../CommentItem';

const CommentBlock = ({comments, isLoading}) => {

    return (
        <>
            <Typography variant='h5'>Комментарии:</Typography>
            <List>
                {(isLoading ? [...Array(5)] : comments).map((comment, i, arr) => (
                    isLoading ? (
                        <CommentItem key={i} isLoading />
                    ) : (
                        <div key={i}>
                            <CommentItem 
                                text={comment.text} 
                                author={comment.author} 
                                date={comment.createAt}
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