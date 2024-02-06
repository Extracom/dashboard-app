import React from 'react';
import PageWrapper from '../components/PageWrapper';
import HomeComponent from '../components/HomeComponent';

const HomePage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={false} showMenu={true} appBarTitle={'WMS Dashboard'}>
            <HomeComponent />
        </PageWrapper>
    );
};

export default HomePage;