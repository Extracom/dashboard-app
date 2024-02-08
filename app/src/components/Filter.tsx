import React, { useState } from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';
//import theme from '../styles/theme'; // Import the custom theme
import { DashboardFilter } from '../interfaces/interfaces';

interface ComponentProps {
    wide?: boolean;
    noRatio?: boolean;
    filter: DashboardFilter;
    setFilter: (filter: DashboardFilter) => void;
}



const Component: React.FC<ComponentProps> = ({ filter, setFilter }) => {
    const [fromDate, setFromDate] = useState(filter.fromDate);
    const [toDate, setToDate] = useState(filter.toDate);
    const [isChanged, setIsChanged] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(new Date(e.target.value));
        setIsChanged(true);
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(new Date(e.target.value));
        setIsChanged(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fromDate >= toDate) {
            setIsError(true);
            setErrorMessage('From Date must be less than To Date');
            return;
        }
        setFilter({ ...filter, fromDate, toDate });
        setIsChanged(false);
        setIsError(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item>
                    <TextField
                        id="fromdate"
                        label="From Date"
                        type="date"
                        value={fromDate ? fromDate.toISOString().substring(0, 10) : ''}
                        onChange={handleFromDateChange}
                        onBlur={handleSubmit}
                        InputProps={{
                            sx: { height: '2.6em' },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={isError}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="date2"
                        label="To Date"
                        type="date"
                        value={toDate ? toDate.toISOString().substring(0, 10) : ''}
                        onChange={handleToDateChange}
                        onBlur={handleSubmit}
                        InputProps={{
                            sx: { height: '2.6em' },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={isError}
                    />
                </Grid>

                <Grid item>
                    {isChanged && <Button onClick={handleSubmit}>Apply</Button>}
                </Grid>
            </Grid>
            {isError && <Typography color="error" sx={{ fontSize: '0.75rem', mt: 0.75 }}>{errorMessage}</Typography>}
        </form>
    );
};

export default Component;

