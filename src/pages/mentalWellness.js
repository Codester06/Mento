import React from 'react';
import MentalWellnessComponent from '../components/mentalwellness/mentalwellness';
import '../components/mentalwellness/mentalwellness.css';

const MentalWellness = () => {
    return (
        <MentalWellnessComponent>
            <h1 className="form-title">FORM</h1>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message"></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </MentalWellnessComponent>
    );
}

export default MentalWellness;