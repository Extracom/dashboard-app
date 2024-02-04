import React from 'react';
//import { useImmer } from 'use-immer';
//import { Quote, TodaysFocus } from '../interfaces/interfaces';
// import { decodeToken } from '../utils/utils';
// import largeLogoImage from '../assets/BusAppHomePageLogo.png';
import useFetchData from '../hooks/useFetchData';
import { Box, LinearProgress } from '@mui/material';
import ResponsiveGrid from '../components/ResponsiveGrid';
import MutationsBarChart from '../charts/MutationsBarChart';
import MutationsGaugeChart from '../charts/MutationsGaugeChart';

// interface ComponentState {
//     quotes: Quote[];
//     todaysFocus: TodaysFocus[];
//     isLoading: boolean;
// }

const HomeComponent: React.FC = () => {
    // const [state, setState] = useImmer<ComponentState>({
    //     quotes: [],
    //     todaysFocus: [],
    //     isLoading: false,
    // });
    //const token = decodeToken();
    const { data, error, loading } = useFetchData(`/stockmutation/list`, { "length": 200 });
    // const { data: todaysFocusData, error: todaysFocusError, loading: todaysFocusLoading } = useFetchData(`/Todays Focus`, `todaysFocus`);

    // useEffect(() => {
    //     if (!token || !token["Email"] || token["Email"].length === 0) {
    //         console.error('No email in token');
    //         return;
    //         //   throw new Error('No email in token');
    //     }
    //     const filteredData = quotesData?.filter((item: Quote) =>
    //         item["Related Users"] && item["Related Users"].includes(token["Email"])
    //     );
    //     setState((draft) => {
    //         draft.quotes = filteredData as Quote[] || [];
    //     });
    // }, [quotesData]);

    // useEffect(() => {
    //     if (!token || !token["Email"] || token["Email"].length === 0) {
    //         console.error('No email in token');
    //         return;
    //         //   throw new Error('No email in token');
    //     }
    //     const filteredData = todaysFocusData?.filter((item: TodaysFocus) =>
    //         item["Related Users"] && item["Related Users"].includes(token["Email"])
    //     );
    //     setState((draft) => {
    //         draft.todaysFocus = filteredData as TodaysFocus[] || [];
    //     });
    // }, [todaysFocusData]);

    // useEffect(() => {
    //     setState((draft) => {
    //         draft.isLoading = quotesLoading || todaysFocusLoading;
    //     });
    // }, [quotesLoading, todaysFocusLoading]);

    // useEffect(() => {
    //     if (quotesError) {
    //         console.error('Error fetching Quotes data:', quotesError);
    //     }
    // }, [quotesError]);

    // useEffect(() => {
    //     if (todaysFocusError) {
    //         console.error('Error fetching Todays Focus data:', todaysFocusError);
    //     }
    // }, [todaysFocusError]);


    return (
        <>
            {loading && <LinearProgress />}

            <ResponsiveGrid>
                <MutationsGaugeChart data={data && data.data ? data.data : null} />
                <MutationsBarChart data={data && data.data ? data.data : null} />
                <MutationsBarChart data={data && data.data ? data.data : null} />
                <MutationsGaugeChart data={data && data.data ? data.data : null} />
                <MutationsBarChart data={data && data.data ? data.data : null} />
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

