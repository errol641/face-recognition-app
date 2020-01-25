import React from 'react';
import './FaceRecognition.css';

const RaceRecogniton = ({ imageUrl, box }) => {
    return (
        <div className='center pa3'>
            <div className='absolute mt0'>
                <img id='inputImage' alt='' src={imageUrl} height='400px' width='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )
}
export default RaceRecogniton;