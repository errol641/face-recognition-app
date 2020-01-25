import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Try  it!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>           
                    <input type='text' className='f4 pa2 w-70 center' placeholder='Enter image url...' onChange={onInputChange}/>
                    <button className='br3 grow ml1 w-30 f4 link ph3 pv2 white bg-light-purple' onClick={onImageSubmit}>Detect</button>
                </div> 
            </div>
        </div>
    )
}
export default ImageLinkForm;