import { 
    Button,
    Grid,
    Skeleton, 
    Stack, 
    Typography 
} from '@mui/material';
import TagIcon from "@mui/icons-material/Tag";
import React, {memo} from 'react';
import { Link } from 'react-router-dom';

const TagBlock = ({tags, isLoading}) => {
    
    return (
        <>
            <Typography variant='h5' gutterBottom>Последние теги:</Typography>
            <Grid container>
                {(isLoading ? [...Array(5)] : tags).map((tag, i) => (
                    <Grid item 
                        xs={6} 
                        md={12}
                        key={i}
                    >
                        <Stack
                            direction='row'
                            alignItems='center'
                            ml={2}
                        >
                            <TagIcon />
                            {isLoading ? (
                                <Skeleton width={100} />
                            ) : (
                                <Link to={`/posts/tags/${tag}`}><Button variant='text' color='secondary'>{tag}</Button></Link>
                            )}
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default memo(TagBlock);