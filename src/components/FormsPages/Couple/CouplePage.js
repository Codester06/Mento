import React from 'react';
import CouplesTherapyForm from './Coupe_FriendsForm';
import FormsBanner from '../FormsBanner';


const CouplePage = () => {
    return (
        <div className='therapyFrom-container'>
            <FormsBanner FormTitle="Couples Therapy" />
            <CouplesTherapyForm />
        </div>
    );
};

export default CouplePage;