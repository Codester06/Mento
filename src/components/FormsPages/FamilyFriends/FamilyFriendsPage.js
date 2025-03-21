import React from 'react';
import FormsBanner from '../FormsBanner';
import FamilyTherapyForm from './familyForm';


const FamilyFriendsPage = () => {
    return (
        <div className='therapyFrom-container'>
            <FormsBanner FormTitle="Family & Friends Therapy" />
            <FamilyTherapyForm />
        </div>
    );
};

export default FamilyFriendsPage;