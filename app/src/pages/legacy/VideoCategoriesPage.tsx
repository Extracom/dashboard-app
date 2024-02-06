import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import VideoCategories from '../../components/legacy/VideoCategories';

const VideoCategoriesPage: React.FC = () => {
    return (
        <PageWrapper showHeader={true} showFooter={true} showMenu={true} appBarTitle={'Videos'}>
            <VideoCategories />
        </PageWrapper>
    );
};

export default VideoCategoriesPage;