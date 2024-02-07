import React, { Key, useState } from 'react';
import useFetchDashboardData from '../hooks/useFetchDashboardData';
import { Box, LinearProgress } from '@mui/material';
import ResponsiveGrid from '../components/ResponsiveGrid';
import Filter from '../components/Filter';
import MutationsBarChart from '../charts/MutationsBarChart';
import MutationsGaugeChart from '../charts/MutationsGaugeChart';
import MutationsHeatmapChart from '../charts/MutationsHeatmapChart';
import { DashboardFilter } from '../interfaces/interfaces';


// interface ComponentState {
//     quotes: Quote[];
//     todaysFocus: TodaysFocus[];
//     isLoading: boolean;
// }

const HomeComponent: React.FC = () => {

    const [filter, setFilter] = useState<DashboardFilter>({
        fromDate: new Date("2023-09-01"),
        toDate: new Date()
    });

    const { data, error, loading } = useFetchDashboardData(filter);
    // const { data: quotesData, error: quotesError, loading: quotesLoading } = useFetc));
    // const { data: todaysFocusData, error: todaysFocusError, loading: todaysFocusLoading } = useFetchData(`/Todays Focus`, `todaysFocus`);



    return (
        <>
            {loading && <LinearProgress />}
            <ResponsiveGrid>
                <Filter wide={true} noRatio={true} filter={filter} setFilter={setFilter} />
                {data && data.users && data.users.length > 0 && data.users.map((user: string, index: Key) =>
                    <MutationsGaugeChart key={index} data={data ? data : null} user={user} />
                )}
                <MutationsHeatmapChart wide={true} data={data ? data : null} />
                <MutationsBarChart wide={true} data={data ? data : null} />
                {error && <Box>{error}</Box>}
            </ResponsiveGrid>


            {/* <Container component="main" maxWidth="md" sx={{ mt: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6}>
                        <Card sx={{ borderRadius: '24px', boxShadow: 1 }} >
                            <CardContent>
                                <Box style={{ aspectRatio: '1/1', width: '100%' }}>
                                    <MutationsBarChart data={data && data.data ? data.data : null} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <Card sx={{ borderRadius: '24px', boxShadow: 1 }} >
                            <CardContent>
                                <Box style={{ aspectRatio: '1/1', width: '100%' }}>
                                    <MutationsBarChart data={data && data.data ? data.data : null} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container> */}

            {/* <Box
                m={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Center vertically
                    maxWidth: 'xs',
                    height: '70dvh', // Set a fixed height to center vertically
                }}
            > */}


            {/* <Box
                    component="img"
                    src={largeLogoImage}
                    sx={{
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                    }}
                    alt="Bus App Logo" // Optional alt text for accessibility
                    loading="lazy" // Optional loading attribute for lazy loading images
                    decoding="async" // Optional decoding attribute for async loading images
                    draggable="false" // Optional draggable attribute for disabling image dragging
                    style={{ pointerEvents: 'none' }} // Disable pointer events on the image to prevent accidental clicks
                    data-testid="logo-image" // Optional data-testid attribute for testing purposes
                    data-test-id="logo-image" // Optional data-testid attribute for testing purposes
                    data-test="logo-image" // Optional data-test attribute for testing purposes
                    data-test-test="logo-image" // Optional data-test attribute for testing purposes
                />
                <Box>
                    <Box m={3}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Today's teaching opportunity:
                        </Typography>
                        <Typography variant="body1" component="div">
                            {state.todaysFocus[0] && state.todaysFocus[0].Focus}
                        </Typography>
                    </Box>
                    <Box m={3}>
                        <Typography variant="h6" component="div" gutterBottom>
                            Quote for the day:
                        </Typography>
                        <Typography variant="body1" component="div">
                            {state.quotes[0] && state.quotes[0].Quote}
                        </Typography>
                    </Box>
                </Box> */}




        </>
    );
};

export default HomeComponent;

