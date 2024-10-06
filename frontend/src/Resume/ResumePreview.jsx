import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumePreview = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownloadPDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div>
      <div ref={componentRef} style={styles.resume}>
        <header style={styles.header}>
          <h1 style={styles.name}>{data.name}</h1>
          <p style={styles.contact}>
            {data.email} | {data.phone} | {data.address}
          </p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.summary}>
            Experienced professional with a strong background in {data.skills.slice(0, 3).join(', ')}.
            Proven track record of {data.experience[0].description.split('.')[0]}.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <ul style={styles.skillsList}>
            {data.skills.map((skill, index) => (
              <li key={index} style={styles.skill}>{skill.trim()}</li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.experienceHeader}>
                <h3 style={styles.jobTitle}>{exp.position}</h3>
                <p style={styles.company}>{exp.company}</p>
              </div>
              <p style={styles.dates}>
                {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
              </p>
              <ul style={styles.jobDescription}>
                {exp.description.split('.').filter(Boolean).map((point, i) => (
                  <li key={i}>{point.trim()}.</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} style={styles.educationItem}>
              <h3 style={styles.degree}>{edu.degree} in {edu.fieldOfStudy}</h3>
              <p style={styles.institution}>{edu.institution}</p>
              <p style={styles.graduationDate}>
                Graduated: {new Date(edu.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          ))}
        </section>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handlePrint} style={styles.button}>Print Resume</button>
        <button onClick={handleDownloadPDF} style={styles.button}>Download PDF</button>
      </div>
    </div>
  );
};

const styles = {
  resume: {
    fontFamily: '"Calibri", "Arial", sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    color: '#333',
    lineHeight: 1.6,
  },
  header: {
    borderBottom: '2px solid #2c3e50',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  name: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '5px',
    textTransform: 'uppercase',
  },
  contact: {
    fontSize: '14px',
    color: '#7f8c8d',
  },
  section: {
    marginBottom: '25px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#2c3e50',
    textTransform: 'uppercase',
    borderBottom: '1px solid #bdc3c7',
    paddingBottom: '5px',
    marginBottom: '15px',
  },
  summary: {
    fontSize: '14px',
    marginBottom: '15px',
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  skill: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '3px',
    margin: '0 10px 10px 0',
    fontSize: '14px',
  },
  experienceItem: {
    marginBottom: '20px',
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  jobTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: 0,
  },
  company: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#7f8c8d',
    margin: 0,
  },
  dates: {
    fontSize: '14px',
    color: '#95a5a6',
    marginBottom: '5px',
    fontStyle: 'italic',
  },
  jobDescription: {
    fontSize: '14px',
    paddingLeft: '20px',
    margin: '10px 0 0 0',
  },
  educationItem: {
    marginBottom: '15px',
  },
  degree: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: 0,
  },
  institution: {
    fontSize: '14px',
    color: '#7f8c8d',
    margin: '5px 0',
  },
  graduationDate: {
    fontSize: '14px',
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '0 10px',
  },
};

export default ResumePreview;