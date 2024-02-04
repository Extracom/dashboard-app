import React from 'react';
import { Container, Grid, Card, CardContent, Box } from '@mui/material';

interface ComponentProps {
    children: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ children }) => {
    // Convert children to an array
    const childrenArray = React.Children.toArray(children);

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={2}>
                {childrenArray.map((child, index) => (
                    <Grid item xs={12} md={6} sm={6} key={index}>
                        <Card sx={{ borderRadius: '24px', boxShadow: 1 }}>
                            <CardContent>
                                <Box style={{ aspectRatio: '1/1', width: '100%' }}>
                                    {child}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Component;
