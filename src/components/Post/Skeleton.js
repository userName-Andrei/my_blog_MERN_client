import { Card, CardContent, CardHeader, Skeleton, Stack } from '@mui/material';
import React from 'react';

import classes from './Post.module.scss';

const SkeletonPost = () => {
    return (
        <Card 
            className={classes.skeleton}
            variant='outlined'
        >
            <CardHeader
                avatar={
                    <Skeleton 
                        variant="circular" 
                        width={40} 
                        height={40} 
                    />
                }
                title={
                      <Skeleton
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                  }
                  subheader={
                      <Skeleton height={10} width="40%" />
                  }
            />
            <Skeleton width='100%' height={200} variant="rectangular"/>
            <CardContent>
                <Skeleton height={10} style={{ marginBottom: 6 }} />
                <Skeleton height={10} style={{ marginBottom: 6 }} />
                <Skeleton height={10} width="80%" />
            </CardContent>
        </Card>
    );
};

export default SkeletonPost;