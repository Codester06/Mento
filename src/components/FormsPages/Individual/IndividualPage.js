import React from 'react';
import FormsBanner from '../FormsBanner';
import IndividualForm from './IndividualForm';


const IndividualPage = () => {
    return (
        <div className='therapyFrom-container'>
            <FormsBanner FormTitle="Individual Therapy" />
            <IndividualForm />
        </div>
    );
};

export default IndividualPage;