import { 
    Grid,
    ListItemButton,
    Skeleton, 
    Typography 
} from '@mui/material';
import TagIcon from "@mui/icons-material/Tag";
import React from 'react';

const TagBlock = ({tags, isLoading}) => {
    
    return (
        <>
            <Typography variant='h4' gutterBottom>Последние теги:</Typography>
            <Grid container>
                {(isLoading ? [...Array(5)] : tags).map((tag, i) => (
                    <Grid item 
                        xs={6} 
                        md={12}
                        key={i}
                    >
                        <ListItemButton>
                            <TagIcon />
                            {isLoading ? (
                                <Skeleton width={100} />
                            ) : (
                                <Typography variant='body1'>{tag}</Typography>
                            )}
                        </ListItemButton>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default TagBlock;