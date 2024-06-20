import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: '',
  });

  const validate = (formData) => {
    let validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) {
      validationErrors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (formData.position === 'Developer' || formData.position === 'Designer') {
      if (!formData.relevantExperience) {
        validationErrors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0) {
        validationErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
      }
    }
    if (formData.position === 'Designer') {
      if (!formData.portfolioURL) {
        validationErrors.portfolioURL = 'Portfolio URL is required';
      } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL)) {
        validationErrors.portfolioURL = 'Portfolio URL is invalid';
      }
    }
    if (formData.position === 'Manager' && !formData.managementExperience) {
      validationErrors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(formData.additionalSkills).includes(true)) {
      validationErrors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formData.preferredInterviewTime) {
      validationErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    }
    return validationErrors;
  };

  const { errors, handleValidation } = useFormValidation(validate);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        additionalSkills: {
          ...prevData.additionalSkills,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = handleValidation(formData);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div>
        <h1>Application Summary</h1>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Position:</strong> {formData.position}</p>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
        )}
        {formData.position === 'Designer' && (
          <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
        )}
        {formData.position === 'Manager' && (
          <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
        )}
        <p><strong>Additional Skills:</strong> {Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]).join(', ')}</p>
        <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>Applying for Position:</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">Select a position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {(formData.position === 'Developer' || formData.position === 'Designer') && (
        <div>
          <label>Relevant Experience (years):</label>
          <input
            type="number"
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleChange}
          />
          {errors.relevantExperience && <p style={{ color: 'red' }}>{errors.relevantExperience}</p>}
        </div>
      )}
      {formData.position === 'Designer' && (
        <div>
          <label>Portfolio URL:</label>
          <input
            type="text"
            name="portfolioURL"
            value={formData.portfolioURL}
            onChange={handleChange}
          />
          {errors.portfolioURL && <p style={{ color: 'red' }}>{errors.portfolioURL}</p>}
        </div>
      )}
      {formData.position === 'Manager' && (
        <div>
          <label>Management Experience:</label>
          <input
            type="text"
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && <p style={{ color: 'red' }}>{errors.managementExperience}</p>}
        </div>
      )}
      <div>
        <label>Additional Skills:</label>
        <div>
          <input
            type="checkbox"
            name="JavaScript"
            checked={formData.additionalSkills.JavaScript}
            onChange={handleChange}
          />
          <label>JavaScript</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="CSS"
            checked={formData.additionalSkills.CSS}
            onChange={handleChange}
          />
          <label>CSS</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="Python"
            checked={formData.additionalSkills.Python}
            onChange={handleChange}
          />
          <label>Python</label>
        </div>
        {errors.additionalSkills && <p style={{ color: 'red' }}>{errors.additionalSkills}</p>}
      </div>
      <div>
        <label>Preferred Interview Time:</label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={formData.preferredInterviewTime}
          onChange={handleChange}
        />
        {errors.preferredInterviewTime && <p style={{ color: 'red' }}>{errors.preferredInterviewTime}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
