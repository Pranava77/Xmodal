import React, { useState } from 'react';
import "./App.css";

const XModal = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        dob: ""
    });
    const [modalON, setModalON] = useState(false);

    const handleSubmit = evt => {
        evt.preventDefault();
        let error = false;

        // Email validation
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert("Invalid email. Please check your email address.");
            error = true;
        }

        // Phone validation
        if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.");
            error = true;
        }

        // Date of birth validation
        if (new Date(formData.dob) > new Date()) {
            alert("Invalid date of birth. Date of birth cannot be in future.");
            error = true;
        }

        if (error) return;

        // Reset form and close modal on successful submission
        setFormData({
            username: "",
            email: "",
            phone: "",
            dob: ""
        });
        setModalON(false);
    }

    const handleChange = evt => {
        const { value, name } = evt.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className='Xmodal'>
            <h1>User Details Modal</h1>
            <button onClick={() => setModalON(true)}>Open Form</button>
            {modalON && (
                <div className="modal" onClick={() => setModalON(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Fill Details</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='username'>Username:</label>
                            <input
                                onChange={handleChange}
                                required
                                value={formData.username}
                                name='username'
                                id='username'
                                type='text'
                            />
                            
                            <label htmlFor='email'>Email Address:</label>
                            <input
                                onChange={handleChange}
                                required
                                value={formData.email}
                                name='email'
                                id='email'
                                type='email'
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            />
                            
                            <label htmlFor='phone'>Phone Number:</label>
                            <input
                                onChange={handleChange}
                                required
                                value={formData.phone}
                                name='phone'
                                id='phone'
                                type='tel'
                                pattern="[0-9]{10}"
                                maxLength="10"
                            />
                            
                            <label htmlFor='dob'>Date of Birth:</label>
                            <input
                                onChange={handleChange}
                                required
                                value={formData.dob}
                                name='dob'
                                id='dob'
                                type='date'
                                max={new Date().toISOString().split('T')[0]}
                            />
                            
                            <button className='submit-button' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default XModal;
