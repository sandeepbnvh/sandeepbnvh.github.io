import { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  MapPin,
  Menu,
  X,
  Send,
  Check,
  FileText,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import AvatarPlaceholder from './components/AvatarPlaceholder';
import './App.css';

// Formspree Integration Configuration
// Replace "YOUR_FORMSPREE_FORM_ID" with your actual Formspree ID to enable email receipt!
const FORMSPREE_FORM_ID: string = "xeewvgdk";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Inline SVG Icon Components for Brand Logos to prevent version dependency errors
const LinkedinIcon = ({ size = 24, ...props }: CustomIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24, ...props }: CustomIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom Intersection Observer Hook for Scroll Reveal
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current = elementRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [elementRef, isVisible] as const;
}

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

function RevealSection({ children, className = '', id, style }: RevealSectionProps) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      id={id}
      style={style}
      className={`reveal ${isVisible ? 'active' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sap' | 'web'>('all');
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  
  // Form State
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Experience timeline data
  const experiences = [
    {
      role: 'SAP Technical Consultant',
      company: 'Infosys LTD',
      date: 'Mar 2022 - Present',
      location: 'Bengaluru, India',
      client: 'Hitachi Energy Ltd',
      description: 'Global technology leader in sustainable energy solutions.',
      highlights: [
        'Supported SAP ECC to S/4HANA transformation across 64+ countries, ensuring successful go-live in multiple phases.',
        'Developed end-to-end Freestyle SAP UI5 applications, debugging and enhancing existing Fiori applications based on business needs.',
        'Designed and deployed applications using SAP Business Application Studio (BAS) and VS Code.',
        'Configured and customized SAP Fiori Launchpad tiles, target mapping, catalog structure, and dynamic tile updates.',
        'Activated and managed OData services for seamless SAP UI5 and backend communication.',
        'Gained hands-on experience by developing a basic POC using SAP CAP, including CDS modelling and service definitions.',
        'Implemented server-side PDF generation within a CAP application using jsPDF.'
      ]
    },
    {
      role: 'SAP Technical Consultant',
      company: 'Tata Consultancy Services',
      date: 'Jan 2020 - Mar 2022',
      location: 'Bengaluru, India',
      client: 'GlaxoSmithKline (GSK)',
      description: 'Global Pharmaceutical Leader.',
      highlights: [
        'Created an end-to-end Freestyle Custom SAP UI5 application for Physical Inventory Count Management.',
        'Debugged and enhanced SAP Fiori applications, resolving performance bottlenecks and UI issues.',
        'Activated and optimized OData services in SAP Frontend Server to enhance data communication and retrieval.',
        'Worked on CRUD operations, ensuring data consistency between Fiori UI and SAP backend systems.'
      ]
    },
    {
      role: 'Machine Learning Intern',
      company: 'C-Quad Computers',
      date: '2019',
      location: 'Belagavi, India',
      client: 'Internal Project',
      description: 'Computer training and consultancy center.',
      highlights: [
        'Gained exposure to different machine learning libraries and data pipelines.',
        'Understood and implemented basic Machine Learning algorithms to solve real-world problems.'
      ]
    }
  ];

  // Education data (percentages removed)
  const education = [
    {
      degree: 'Bachelor of Engineering (B.E.), Computer Science',
      institution: 'KLS Gogte Institute of Technology',
      date: '2015 - 2019',
      location: 'Belagavi, Karnataka'
    },
    {
      degree: 'Pre-University (12th), Science',
      institution: 'Alvas College',
      date: '2013 - 2015',
      location: 'Moodbidri, Karnataka'
    },
    {
      degree: 'Secondary School (10th), General',
      institution: 'Vishwa Chetana School',
      date: '2012 - 2013',
      location: 'Davanagere, Karnataka'
    }
  ];

  // Skills categorized (Core Java, React.js, and TypeScript removed)
  const skillCategories = [
    {
      title: 'SAP UI5 & Fiori',
      type: 'sap',
      skills: [
        { name: 'SAP UI5 (Freestyle)', level: 85 },
        { name: 'SAP Fiori Elements', level: 80 },
        { name: 'Smart Controls', level: 75 },
        { name: 'Fiori Launchpad Configuration', level: 85 }
      ]
    },
    {
      title: 'Backend & Integration',
      type: 'sap',
      skills: [
        { name: 'SAP OData services', level: 80 },
        { name: 'SAP Gateway integration', level: 80 },
        { name: 'SAP CAP Model (Node.js)', level: 65 },
        { name: 'SAP BTP & Cloud Foundry', level: 70 }
      ]
    },
    {
      title: 'Web Technologies',
      type: 'web',
      skills: [
        { name: 'JavaScript (ES6+)', level: 80 },
        { name: 'HTML5 & CSS3', level: 85 }
      ]
    },
    {
      title: 'Development Tools',
      type: 'web',
      skills: [
        { name: 'Business Application Studio (BAS)', level: 85 },
        { name: 'VS Code & Git', level: 80 },
        { name: 'JIRA & Scrum methodology', level: 75 }
      ]
    }
  ];

  const filteredSkillCategories = activeTab === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.type === activeTab);

  // Form submit handler with Formspree integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formState.name.trim()) errors.name = 'Name is required';
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formState.subject.trim()) errors.subject = 'Subject is required';
    if (!formState.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);

    if (FORMSPREE_FORM_ID && FORMSPREE_FORM_ID !== "YOUR_FORMSPREE_FORM_ID") {
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            subject: formState.subject,
            message: formState.message
          })
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setFormState({ name: '', email: '', subject: '', message: '' });
        } else {
          alert("Oops! There was a problem submitting your form. Please check your Formspree ID.");
        }
      } catch (error) {
        alert("Oops! There was a connection problem submitting your form.");
      } finally {
        setFormSubmitted(false);
      }
    } else {
      // Fallback simulated submission for visual feedback
      setTimeout(() => {
        setSubmitSuccess(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
        setFormSubmitted(false);
      }, 1500);
    }
  };

  // Close mobile menu on nav click
  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Dynamic Glow Gradients in Background */}
      <div className="accent-glow-1" />
      <div className="accent-glow-2" />

      {/* Navigation Header */}
      <header
        className="glass-panel"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderRadius: 0,
          borderInline: 'none',
          borderTop: 'none',
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--glass-bg)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>Sandeep</span>
            <span style={{ fontWeight: 400 }}>A N</span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', fontSize: '15px', fontWeight: 500 }}>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
              </li>
              <li>
                <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>Experience</a>
              </li>
              <li>
                <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
              </li>
            </ul>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Action */}
          <div className="mobile-nav-toggle" style={{ display: 'none', alignItems: 'center', gap: '16px' }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-drawer glass-panel"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            zIndex: 99,
            borderRadius: `0 0 var(--border-radius-md) var(--border-radius-md)`,
            borderInline: 'none',
            padding: '24px',
            background: 'var(--glass-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', fontSize: '16px', fontWeight: 600 }}>
            <li>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>Experience</a>
            </li>
            <li>
              <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
            </li>
          </ul>
        </div>
      )}

      {/* Hero Section */}
      <section id="about" className="section container" style={{ display: 'flex', alignItems: 'center', minHeight: 'calc(80vh - var(--header-height))', padding: '60px 24px' }}>
        <div className="hero-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center', width: '100%' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                color: 'var(--accent)',
                padding: '6px 16px',
                borderRadius: '30px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              SAP Technical Consultant
            </span>
            <h1 style={{ fontSize: 'calc(2.5rem + 1.5vw)', lineHeight: '1.1', fontWeight: 800 }}>
              Hi! I am <br />
              <span className="gradient-text">Sandeep A N</span>
            </h1>
            <p style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)' }}>
              Building Modern SAP UX Experiences & Cloud Solutions.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '560px' }}>
              I am an SAP Technical Consultant with over 6 years of experience. I specialize in designing and deploying custom freestyle <strong>SAP UI5</strong> & <strong>Fiori</strong> apps, configuring launchpads, implementing robust <strong>OData Gateway</strong> interfaces, and developing fullstack services utilizing the <strong>SAP Cloud Application Programming Model (CAP)</strong>.
            </p>

            {/* Social profiles & CTA */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', alignItems: 'center' }}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="btn btn-primary">
                Say Hi!
              </a>
              <a href="/resume.pdf" download="Sandeep_A_N_Resume.pdf" className="btn btn-secondary">
                <FileText size={18} />
                Resume
              </a>
              <div style={{ display: 'flex', gap: '12px', marginLeft: '12px' }}>
                <a
                  href="https://linkedin.com/in/sandeepbnvh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="social-icon-btn glass-panel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href="https://github.com/sandeepbnvh"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="social-icon-btn glass-panel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="mailto:sandeep.bnvh@gmail.com"
                  aria-label="Email Sandeep"
                  className="social-icon-btn glass-panel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Photo Placeholder container */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AvatarPlaceholder />
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '100px 0' }}>
        <div className="container">
          <RevealSection style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Work Experience</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              A record of engineering robust web client interfaces and rolling out business solutions at global scale.
            </p>
          </RevealSection>

          <RevealSection className="timeline">
            {experiences.map((exp, index) => {
              const isExpanded = expandedExperience === index;
              return (
                <div className="timeline-item" key={index}>
                  <div className="timeline-icon">
                    <Briefcase size={14} />
                  </div>
                  <div className="timeline-card glass-panel" style={{ cursor: 'pointer' }} onClick={() => setExpandedExperience(isExpanded ? null : index)}>
                    <div className="timeline-header">
                      <div className="timeline-title">
                        <h3>{exp.role}</h3>
                        <div className="timeline-company">{exp.company}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="timeline-date">{exp.date}</span>
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                        <span>•</span>
                        <span>Client: <strong>{exp.client}</strong></span>
                      </div>
                      <p style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '8px' }}>
                        {exp.description}
                      </p>
                    </div>

                    {/* Expandable highlight details */}
                    <div
                      className="timeline-body"
                      style={{
                        maxHeight: isExpanded ? '1000px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height var(--transition-slow)',
                        borderTop: isExpanded ? '1px solid var(--border-color)' : 'none',
                        marginTop: isExpanded ? '16px' : '0px',
                        paddingTop: isExpanded ? '16px' : '0px',
                        textAlign: 'left',
                      }}
                    >
                      <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', color: 'var(--accent)' }}>
                        Key Responsibilities & Contributions:
                      </h4>
                      <ul>
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </RevealSection>
        </div>
      </section>

      {/* Skills Grid Section */}
      <section id="skills" className="section">
        <div className="container">
          <RevealSection style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Skills & Core Competencies</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              My technical expertise balances native SAP systems development with core modern web technologies.
            </p>

            {/* Filter tab buttons */}
            <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--border-color)', padding: '4px', borderRadius: '30px', marginTop: '24px' }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  border: 'none',
                  background: activeTab === 'all' ? 'var(--bg-secondary)' : 'transparent',
                  color: activeTab === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'all' ? 'var(--shadow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                All Skills
              </button>
              <button
                onClick={() => setActiveTab('sap')}
                style={{
                  border: 'none',
                  background: activeTab === 'sap' ? 'var(--bg-secondary)' : 'transparent',
                  color: activeTab === 'sap' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'sap' ? 'var(--shadow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                SAP Ecosystem
              </button>
              <button
                onClick={() => setActiveTab('web')}
                style={{
                  border: 'none',
                  background: activeTab === 'web' ? 'var(--bg-secondary)' : 'transparent',
                  color: activeTab === 'web' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'web' ? 'var(--shadow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Modern Web
              </button>
            </div>
          </RevealSection>

          <RevealSection className="skills-grid">
            {filteredSkillCategories.map((category, catIndex) => (
              <div className="skill-category glass-panel" key={catIndex}>
                <div className="skill-category-title">
                  <Code size={18} style={{ color: 'var(--accent)' }} />
                  <h3>{category.title}</h3>
                </div>
                <div className="skill-list">
                  {category.skills.map((skill, sIndex) => (
                    <div className="skill-item" key={sIndex}>
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percent">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div
                          className="skill-bar-progress"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* Education Summary Section */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)', borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(var(--accent-rgb), 0.01)' }}>
        <div className="container">
          <RevealSection style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Education</h2>
            <p>Academic profile and credentials.</p>
          </RevealSection>

          <div
            className="education-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {education.map((edu, index) => (
              <RevealSection className="glass-panel" style={{ padding: '24px', textAlign: 'left' }} key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <GraduationCap size={20} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', backgroundColor: 'var(--border-color)', borderRadius: '20px' }}>
                    {edu.date}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{edu.degree}</h3>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {edu.institution}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Location: {edu.location}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section container">
        <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '60px', alignItems: 'start' }}>
          
          {/* Contact Details */}
          <RevealSection style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div>
              <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Let's Collaborate</h2>
              <p>
                Interested in building clean enterprise interfaces or collaborating on web projects? Let's discuss over coffee or connect virtually.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Email</div>
                  <a href="mailto:sandeep.bnvh@gmail.com" style={{ fontWeight: 500 }}>sandeep.bnvh@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Location</div>
                  <span style={{ fontWeight: 500 }}>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Form panel */}
          <RevealSection className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '24px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '350px' }}>
                  Thank you for reaching out! Your message was sent successfully. Sandeep will get back to you shortly.
                </p>
                <button onClick={() => setSubmitSuccess(false)} className="btn btn-secondary" style={{ marginTop: '12px' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="name" style={{ fontSize: '13px', fontWeight: 600 }}>Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={{
                        padding: '12px',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    {formErrors.name && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.name}</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="email" style={{ fontSize: '13px', fontWeight: 600 }}>Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={{
                        padding: '12px',
                        borderRadius: 'var(--border-radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    {formErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</span>}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="subject" style={{ fontSize: '13px', fontWeight: 600 }}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  {formErrors.subject && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.subject}</span>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="message" style={{ fontSize: '13px', fontWeight: 600 }}>Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      resize: 'vertical',
                    }}
                  />
                  {formErrors.message && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.message}</span>}
                </div>

                <button type="submit" disabled={formSubmitted} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }}>
                  <Send size={16} />
                  {formSubmitted ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </RevealSection>
        </div>
      </section>

      {/* Footer Section */}
      <footer
        className="glass-panel"
        style={{
          marginTop: 'auto',
          borderRadius: 0,
          borderInline: 'none',
          borderBottom: 'none',
          padding: '40px 0',
          background: 'var(--glass-bg)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Made with ❤️ in India.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <a href="https://linkedin.com/in/sandeepbnvh" target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent)' }}>
              LinkedIn
            </a>
            <span>•</span>
            <a href="https://github.com/sandeepbnvh" target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent)' }}>
              GitHub
            </a>
            <span>•</span>
            <a href="mailto:sandeep.bnvh@gmail.com" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent)' }}>
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
