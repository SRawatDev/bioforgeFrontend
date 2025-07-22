import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TemplateCard from './TemplateCard';
import './TemplatePreview.css';

interface SocialLink {
  platform: string;
  username: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  shadowColor: string;
}

interface TemplateData {
  id: number;
  name: string;
  profession: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

const TemplatePreview: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock template data - in real app, this would come from API
  const templateData: TemplateData[] = [
    {
      id: 1,
      name: "Vansh Kushwaha",
      profession: "Creative Designer",
      description: "Passionate about creating stunning visual experiences that inspire and engage audiences worldwide.",
      profileImage: "/assets/108723120.png",
      socialLinks: [
        {
          platform: "instagram",
          username: "@vanshkushwaha",
          icon: "fab fa-instagram",
          gradientFrom: "from-pink-500/20",
          gradientTo: "to-purple-500/20",
          borderColor: "border-pink-500/30",
          shadowColor: "rgba(236,72,153,0.3)"
        },
        {
          platform: "twitter",
          username: "@vanshkushwaha",
          icon: "fab fa-twitter",
          gradientFrom: "from-blue-500/20",
          gradientTo: "to-cyan-500/20",
          borderColor: "border-blue-500/30",
          shadowColor: "rgba(59,130,246,0.3)"
        },
        {
          platform: "youtube",
          username: "@vanshkushwaha",
          icon: "fab fa-youtube",
          gradientFrom: "from-red-500/20",
          gradientTo: "to-orange-500/20",
          borderColor: "border-red-500/30",
          shadowColor: "rgba(239,68,68,0.3)"
        },
        {
          platform: "linkedin",
          username: "Vansh Kushwaha",
          icon: "fab fa-linkedin-in",
          gradientFrom: "from-blue-600/20",
          gradientTo: "to-indigo-600/20",
          borderColor: "border-blue-600/30",
          shadowColor: "rgba(37,99,235,0.3)"
        }
      ]
    },
    {
      id: 2,
      name: "Alex Johnson",
      profession: "Full Stack Developer",
      description: "Building innovative web applications with modern technologies and clean, efficient code.",
      profileImage: "/assets/108723120.png",
      socialLinks: [
        {
          platform: "github",
          username: "@alexjohnson",
          icon: "fab fa-github",
          gradientFrom: "from-gray-700/20",
          gradientTo: "to-gray-900/20",
          borderColor: "border-gray-700/30",
          shadowColor: "rgba(75,85,99,0.3)"
        },
        {
          platform: "linkedin",
          username: "Alex Johnson",
          icon: "fab fa-linkedin-in",
          gradientFrom: "from-blue-600/20",
          gradientTo: "to-indigo-600/20",
          borderColor: "border-blue-600/30",
          shadowColor: "rgba(37,99,235,0.3)"
        },
        {
          platform: "twitter",
          username: "@alexjohnson",
          icon: "fab fa-twitter",
          gradientFrom: "from-blue-500/20",
          gradientTo: "to-cyan-500/20",
          borderColor: "border-blue-500/30",
          shadowColor: "rgba(59,130,246,0.3)"
        },
        {
          platform: "instagram",
          username: "@alexjohnson",
          icon: "fab fa-instagram",
          gradientFrom: "from-pink-500/20",
          gradientTo: "to-purple-500/20",
          borderColor: "border-pink-500/30",
          shadowColor: "rgba(236,72,153,0.3)"
        }
      ]
    },
    {
      id: 3,
      name: "Sarah Chen",
      profession: "UX/UI Designer",
      description: "Crafting user-centered designs that bridge the gap between functionality and beautiful aesthetics.",
      profileImage: "/assets/108723120.png",
      socialLinks: [
        {
          platform: "instagram",
          username: "@sarahchen",
          icon: "fab fa-instagram",
          gradientFrom: "from-pink-500/20",
          gradientTo: "to-purple-500/20",
          borderColor: "border-pink-500/30",
          shadowColor: "rgba(236,72,153,0.3)"
        },
        {
          platform: "linkedin",
          username: "Sarah Chen",
          icon: "fab fa-linkedin-in",
          gradientFrom: "from-blue-600/20",
          gradientTo: "to-indigo-600/20",
          borderColor: "border-blue-600/30",
          shadowColor: "rgba(37,99,235,0.3)"
        },
        {
          platform: "youtube",
          username: "@sarahchen",
          icon: "fab fa-youtube",
          gradientFrom: "from-red-500/20",
          gradientTo: "to-orange-500/20",
          borderColor: "border-red-500/30",
          shadowColor: "rgba(239,68,68,0.3)"
        },
        {
          platform: "facebook",
          username: "Sarah Chen",
          icon: "fab fa-facebook-f",
          gradientFrom: "from-blue-700/20",
          gradientTo: "to-blue-800/20",
          borderColor: "border-blue-700/30",
          shadowColor: "rgba(29,78,216,0.3)"
        }
      ]
    }
  ];

  useEffect(() => {
    const loadTemplate = () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const foundTemplate = templateData.find(t => t.id === parseInt(templateId || '1'));
        setTemplate(foundTemplate || null);
        setLoading(false);
      }, 1000);
    };

    loadTemplate();
  }, [templateId]);

  if (loading) {
    return (
      <div className="template-preview-loading">
        <div className="loading-spinner">
          <img src="/assets/loader.gif" alt="Loading..." />
        </div>
        <p>Loading template preview...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="template-preview-error">
        <h2>Template Not Found</h2>
        <p>The requested template could not be found.</p>
        <button onClick={() => navigate('/templates')} className="back-to-templates-btn">
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <div className="template-preview">
      <div className="preview-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <h1>Template Preview</h1>
        <div className="preview-actions">
          <button 
            onClick={() => navigate('/login')} 
            className="use-template-btn"
          >
            Use This Template
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="preview-frame">
          <TemplateCard
            id={template.id}
            name={template.name}
            profession={template.profession}
            description={template.description}
            profileImage={template.profileImage}
            socialLinks={template.socialLinks}
          />
        </div>
        
        <div className="preview-info">
          <h2>{template.name}</h2>
          <p className="template-profession">{template.profession}</p>
          <p className="template-description">{template.description}</p>
          
          <div className="template-features">
            <h3>Template Features:</h3>
            <ul>
              <li>✨ Responsive design</li>
              <li>🎨 Customizable colors</li>
              <li>🔗 Social media integration</li>
              <li>📱 Mobile-first approach</li>
              <li>⚡ Fast loading</li>
              <li>🎯 SEO optimized</li>
            </ul>
          </div>

          <div className="social-platforms">
            <h3>Supported Platforms:</h3>
            <div className="platform-list">
              {template.socialLinks.map((link, index) => (
                <div key={index} className="platform-item">
                  <i className={link.icon}></i>
                  <span>{link.platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="preview-footer">
        <p>Ready to create your own bio page?</p>
        <button 
          onClick={() => navigate('/login')} 
          className="get-started-btn"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default TemplatePreview;
