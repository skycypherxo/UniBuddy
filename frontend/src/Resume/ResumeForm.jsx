import React, { useState } from 'react';

function ResumeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    phone: '',
    skills: [],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', fieldOfStudy: '', graduationDate: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      const skillsArray = value.split(',').map(skill => skill.trim());
      setFormData({ ...formData, skills: skillsArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData({ ...formData, experience: newExperience });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', degree: '', fieldOfStudy: '', graduationDate: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.sectionTitle}>Personal Information</h2>
      <input
        style={styles.input}
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        style={styles.input}
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        style={styles.input}
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        style={styles.input}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        style={styles.input}
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        style={styles.input}
        name="skills"
        value={formData.skills.join(', ')}
        onChange={handleChange}
        placeholder="Skills (comma-separated)"
        required
      />

      <h2 style={styles.sectionTitle}>Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} style={styles.experienceSection}>
          <input
            style={styles.input}
            value={exp.company}
            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            placeholder="Company"
            required
          />
          <input
            style={styles.input}
            value={exp.position}
            onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
            placeholder="Position"
            required
          />
          <input
            style={styles.input}
            type="date"
            value={exp.startDate}
            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
            placeholder="Start Date"
            required
          />
          <input
            style={styles.input}
            type="date"
            value={exp.endDate}
            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
            placeholder="End Date"
          />
          <textarea
            style={styles.textarea}
            value={exp.description}
            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
            placeholder="Job Description"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addExperience} style={styles.addButton}>Add Experience</button>

      <h2 style={styles.sectionTitle}>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} style={styles.educationSection}>
          <input
            style={styles.input}
            value={edu.institution}
            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
            placeholder="Institution"
            required
          />
          <input
            style={styles.input}
            value={edu.degree}
            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
            placeholder="Degree"
            required
          />
          <input
            style={styles.input}
            value={edu.fieldOfStudy}
            onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
            placeholder="Field of Study"
            required
          />
          <input
            style={styles.input}
            type="date"
            value={edu.graduationDate}
            onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
            placeholder="Graduation Date"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addEducation} style={styles.addButton}>Add Education</button>

      <button type="submit" style={styles.submitButton}>Create Resume</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#2c3e50',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '100px',
  },
  experienceSection: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  educationSection: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.05)',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px',
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',
    width: '100%',
  },
};

export default ResumeForm;