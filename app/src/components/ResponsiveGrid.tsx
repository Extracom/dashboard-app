import React from 'react';
import { Container, Grid, Card, Box } from '@mui/material';
import theme from '../styles/theme'; // Import the custom theme

interface ComponentProps {
    children: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ children }) => {
    // Convert children to an array
    const childrenArray = React.Children.toArray(children);

    const narrowGridProps = { xs: 12, sm: 6, md: 3, lg: 2, xl: 1.5 };
    const wideGridProps = { xs: 12, sm: 12, md: 12, lg: 12 };

    const wideBoxRatios = {
        width: '100%',
        '@media (max-width:600px)': {
            aspectRatio: '1/1',
        },
        '@media (min-width:600px) and (max-width:900px)': {
            aspectRatio: '2/1',
        },
        '@media (min-width:900px) and (max-width:1200px)': {
            aspectRatio: '3/1',
        },
        '@media (min-width:1200px)': {
            aspectRatio: '4/1',
        },
    };

    const narrowBoxRatios = {
        aspectRatio: '1/1',
        width: '100%',

    };

    const noBoxRatios = {
        width: '100%'
    };

    return (
        <Container maxWidth={false} sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
                {childrenArray.map((child, index) => {
                    const wide = (child as React.ReactElement<{ wide?: boolean }>).props.wide;
                    const noRatio = (child as React.ReactElement<{ noRatio?: boolean }>).props.noRatio;
                    return (
                        <Grid item {...(wide ? wideGridProps : narrowGridProps)} key={index}>
                            <Card sx={{ ...(wide ? theme.cards.primary : theme.cards.square) }}>
                                {/* <CardContent  > */}
                                <Box sx={(noRatio ? noBoxRatios : (wide ? wideBoxRatios : narrowBoxRatios))}>
                                    {child}
                                </Box>
                                {/* </CardContent> */}
                            </Card>
                        </Grid>
                    );
                })}

                {/* {childrenArray.map((child, index) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                        <Card sx={{ borderRadius: '24px', boxShadow: 1 }}>
                            <CardContent>
                                <Box style={{ aspectRatio: '2/1', width: '100%' }}>
                                    {child}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))} */}
            </Grid>
        </Container>
    );
};

export default Component;
