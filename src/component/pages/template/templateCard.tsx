import React, { useRef } from "react";
import "./templateCard.css";

interface SocialLink {
  platform: string;
  username: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  shadowColor: string;
}

interface TemplateCardProps {
  id: number;
  name: string;
  profession: string;
  description: string;
  profileImage: string;
  socialLinks: SocialLink[];
  design?: string;
  color?: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  profession,
  description,
  profileImage,
  socialLinks,
  design = "modern",
  color = "gradient-purple"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSocialClick = (platform: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Clicked ${platform}`);
  };

  const getNavCards = () => {
    const navItems = [
      { title: "About", icon: "fas fa-user", color: "blue" },
      { title: "Portfolio", icon: "fas fa-briefcase", color: "purple" },
      { title: "Services", icon: "fas fa-cogs", color: "green" },
      { title: "Contact", icon: "fas fa-envelope", color: "orange" },
    ];
    return navItems.map((item, index) => (
      <div key={index} className={`nav-card nav-card-${item.color}`}>
        <div className="nav-card-icon">
          <i className={item.icon}></i>
        </div>
        <span className="nav-card-title">{item.title}</span>
      </div>
    ));
  };

  // 1. Modern Design (Default)
  const renderModernDesign = () => (
    <div className="hydra-dashboard modern-design">
      <div className="floating-bg floating-bg-1"></div>
      <div className="floating-bg floating-bg-2"></div>
      <div className="floating-bg floating-bg-3"></div>
      
      <div className="main-container" ref={containerRef}>
        <div className="animated-bg-pattern"></div>
        
        <div className="header-section">
          <div className="logo-container">
            <div className="logo-box">
              <img src={profileImage} alt={name} className="profile-image" />
            </div>
            <div className="logo-glow"></div>
          </div>
          <h1 className="main-title">{name.split(' ')[0].toUpperCase()}</h1>
          <p className="subtitle">{profession}</p>
          <p className="description">{description}</p>
        </div>
        
        <div className="navigation-grid">
          {getNavCards()}
        </div>
        
        <div className="social-section">
          <div className="social-icons">
            {socialLinks.slice(0, 4).map((link, index) => (
              <div
                key={index}
                className={`social-icon ${link.platform}-icon`}
                onClick={(e) => handleSocialClick(link.platform, e)}
              >
                <i className={link.icon}></i>
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <p className="copyright">© 2024 {name.toUpperCase()}</p>
          <p className="tagline">Crafted with BioForge ✨</p>
        </div>
      </div>
    </div>
  );

  // 2. Minimal Design
  const renderMinimalDesign = () => (
    <div className="hydra-dashboard minimal-design">
      <div className="main-container minimal-container" ref={containerRef}>
        <div className="minimal-header">
          <div className="minimal-avatar">
            <img src={profileImage} alt={name} className="minimal-profile-image" />
          </div>
          <h2 className="minimal-name">{name}</h2>
          <p className="minimal-profession">{profession}</p>
        </div>
        
        <div className="minimal-description">
          <p>{description}</p>
        </div>
        
        <div className="minimal-links">
          {getNavCards()}
        </div>
        
        <div className="minimal-social">
          {socialLinks.slice(0, 3).map((link, index) => (
            <div
              key={index}
              className="minimal-social-item"
              onClick={(e) => handleSocialClick(link.platform, e)}
            >
              <i className={link.icon}></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Elegant Design
  const renderElegantDesign = () => (
    <div className="hydra-dashboard elegant-design">
      <div className="elegant-bg-pattern"></div>
      
      <div className="main-container elegant-container" ref={containerRef}>
        <div className="elegant-header">
          <div className="elegant-profile-section">
            <div className="elegant-image-wrapper">
              <img src={profileImage} alt={name} className="elegant-profile-image" />
              <div className="elegant-image-border"></div>
            </div>
            <div className="elegant-text-section">
              <h1 className="elegant-name">{name}</h1>
              <p className="elegant-profession">{profession}</p>
              <p className="elegant-description">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="elegant-navigation">
          <div className="elegant-nav-grid">
            {getNavCards()}
          </div>
        </div>
        
        <div className="elegant-footer">
          <div className="elegant-social-row">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className={`elegant-social-btn ${link.platform}`}
                onClick={(e) => handleSocialClick(link.platform, e)}
              >
                <i className={link.icon}></i>
                <span>{link.platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Bold Design
  const renderBoldDesign = () => (
    <div className="hydra-dashboard bold-design">
      <div className="bold-bg-shapes">
        <div className="bold-shape-1"></div>
        <div className="bold-shape-2"></div>
        <div className="bold-shape-3"></div>
      </div>
      
      <div className="main-container bold-container" ref={containerRef}>
        <div className="bold-hero">
          <div className="bold-profile-circle">
            <img src={profileImage} alt={name} className="bold-profile-image" />
          </div>
          <h1 className="bold-name">{name.toUpperCase()}</h1>
          <div className="bold-profession-tag">
            <span>{profession.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="bold-description-box">
          <p>{description}</p>
        </div>
        
        <div className="bold-action-grid">
          {getNavCards()}
        </div>
        
        <div className="bold-social-bar">
          {socialLinks.slice(0, 4).map((link, index) => (
            <div
              key={index}
              className={`bold-social-item ${link.platform}`}
              onClick={(e) => handleSocialClick(link.platform, e)}
            >
              <i className={link.icon}></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 5. Creative Design
  const renderCreativeDesign = () => (
    <div className="hydra-dashboard creative-design">
      <div className="creative-bg-elements">
        <div className="creative-blob-1"></div>
        <div className="creative-blob-2"></div>
        <div className="creative-blob-3"></div>
      </div>
      
      <div className="main-container creative-container" ref={containerRef}>
        <div className="creative-layout">
          <div className="creative-sidebar">
            <div className="creative-profile-section">
              <div className="creative-image-frame">
                <img src={profileImage} alt={name} className="creative-profile-image" />
              </div>
              <h2 className="creative-name">{name}</h2>
              <p className="creative-profession">{profession}</p>
            </div>
            
            <div className="creative-social-vertical">
              {socialLinks.slice(0, 4).map((link, index) => (
                <div
                  key={index}
                  className={`creative-social-item ${link.platform}`}
                  onClick={(e) => handleSocialClick(link.platform, e)}
                >
                  <i className={link.icon}></i>
                </div>
              ))}
            </div>
          </div>
          
          <div className="creative-main-content">
            <div className="creative-description-card">
              <h3>About Me</h3>
              <p>{description}</p>
            </div>
            
            <div className="creative-nav-cards">
              {getNavCards()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Tech Design
  const renderTechDesign = () => (
    <div className="hydra-dashboard tech-design">
      <div className="tech-grid-bg"></div>
      <div className="tech-particles"></div>
      
      <div className="main-container tech-container" ref={containerRef}>
        <div className="tech-terminal-header">
          <div className="tech-terminal-controls">
            <span className="tech-control red"></span>
            <span className="tech-control yellow"></span>
            <span className="tech-control green"></span>
          </div>
          <span className="tech-terminal-title">bio_profile.exe</span>
        </div>
        
        <div className="tech-content">
          <div className="tech-profile-section">
            <div className="tech-avatar-container">
              <img src={profileImage} alt={name} className="tech-profile-image" />
              <div className="tech-scan-line"></div>
            </div>
            
            <div className="tech-info">
              <h1 className="tech-name">
                <span className="tech-prompt">$</span> {name}
              </h1>
              <p className="tech-profession">
                <span className="tech-comment"># {profession}</span>
              </p>
              <div className="tech-description">
                <span className="tech-string">"{description}"</span>
              </div>
            </div>
          </div>
          
          <div className="tech-commands">
            {getNavCards()}
          </div>
          
          <div className="tech-footer">
            <div className="tech-social-links">
              {socialLinks.slice(0, 3).map((link, index) => (
                <div
                  key={index}
                  className={`tech-social-link ${link.platform}`}
                  onClick={(e) => handleSocialClick(link.platform, e)}
                >
                  <span className="tech-prompt"></span>
                  <i className={link.icon}></i>
                  <span>{link.platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 7. Glassmorphism Design
  const renderGlassmorphismDesign = () => (
    <div className="hydra-dashboard glassmorphism-design">
      <div className="glass-bg-shapes">
        <div className="glass-shape-1"></div>
        <div className="glass-shape-2"></div>
        <div className="glass-shape-3"></div>
        <div className="glass-shape-4"></div>
      </div>
      
      <div className="main-container glass-container" ref={containerRef}>
        <div className="glass-card main-glass-card">
          <div className="glass-header">
            <div className="glass-avatar-wrapper">
              <div className="glass-avatar-ring">
                <img src={profileImage} alt={name} className="glass-profile-image" />
              </div>
            </div>
            <h1 className="glass-name">{name}</h1>
            <p className="glass-profession">{profession}</p>
          </div>
          
          <div className="glass-description">
            <p>{description}</p>
          </div>
          
          <div className="glass-nav-grid">
            {getNavCards()}
          </div>
          
          <div className="glass-social-section">
            <div className="glass-social-grid">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className={`glass-social-item ${link.platform}`}
                  onClick={(e) => handleSocialClick(link.platform, e)}
                >
                  <i className={link.icon}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 8. Neon Design
  const renderNeonDesign = () => (
    <div className="hydra-dashboard neon-design">
      <div className="neon-bg-grid"></div>
      <div className="neon-particles"></div>
      
      <div className="main-container neon-container" ref={containerRef}>
        <div className="neon-frame">
          <div className="neon-corner neon-corner-tl"></div>
          <div className="neon-corner neon-corner-tr"></div>
          <div className="neon-corner neon-corner-bl"></div>
          <div className="neon-corner neon-corner-br"></div>
          
          <div className="neon-content">
            <div className="neon-header">
              <div className="neon-avatar-container">
                <div className="neon-avatar-glow">
                  <img src={profileImage} alt={name} className="neon-profile-image" />
                </div>
              </div>
              <h1 className="neon-name">{name}</h1>
              <p className="neon-profession">{profession}</p>
            </div>
            
            <div className="neon-description-box">
              <div className="neon-text-glow">
                <p>{description}</p>
              </div>
            </div>
            
            <div className="neon-nav-section">
              {getNavCards()}
            </div>
            
            <div className="neon-social-bar">
              {socialLinks.slice(0, 4).map((link, index) => (
                <div
                  key={index}
                  className={`neon-social-btn ${link.platform}`}
                  onClick={(e) => handleSocialClick(link.platform, e)}
                >
                  <i className={link.icon}></i>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 9. Retro Design
  const renderRetroDesign = () => (
    <div className="hydra-dashboard retro-design">
      <div className="retro-bg-pattern"></div>
      <div className="retro-scanlines"></div>
      
      <div className="main-container retro-container" ref={containerRef}>
        <div className="retro-crt-frame">
          <div className="retro-screen">
            <div className="retro-header">
              <div className="retro-profile-section">
                <div className="retro-avatar-frame">
                  <img src={profileImage} alt={name} className="retro-profile-image" />
                  <div className="retro-pixel-border"></div>
                </div>
                <div className="retro-text-section">
                  <h1 className="retro-name">{name.toUpperCase()}</h1>
                  <p className="retro-profession">{profession.toUpperCase()}</p>
                </div>
              </div>
            </div>
            
            <div className="retro-description-panel">
              <div className="retro-panel-header">ABOUT.TXT</div>
              <div className="retro-panel-content">
                <p>{description}</p>
              </div>
            </div>
            
            <div className="retro-menu-system">
              <div className="retro-menu-title">MAIN MENU</div>
              <div className="retro-menu-items">
                {getNavCards()}
              </div>
            </div>
            
            <div className="retro-social-terminal">
              <div className="retro-terminal-header">SOCIAL_LINKS.EXE</div>
              <div className="retro-terminal-content">
                {socialLinks.slice(0, 4).map((link, index) => (
                  <div
                    key={index}
                    className={`retro-social-line ${link.platform}`}
                    onClick={(e) => handleSocialClick(link.platform, e)}
                  >
                    <span className="retro-prompt">C:\</span>
                    <i className={link.icon}></i>
                    <span className="retro-command">{link.platform.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 10. Card Stack Design
  const renderCardStackDesign = () => (
    <div className="hydra-dashboard cardstack-design">
      <div className="cardstack-bg-dots"></div>
      
      <div className="main-container cardstack-container" ref={containerRef}>
        <div className="cardstack-layout">
          {/* Main Profile Card */}
          <div className="cardstack-main-card">
            <div className="cardstack-profile-header">
              <div className="cardstack-avatar-section">
                <img src={profileImage} alt={name} className="cardstack-profile-image" />
              </div>
              <div className="cardstack-info-section">
                <h1 className="cardstack-name">{name}</h1>
                <p className="cardstack-profession">{profession}</p>
                <p className="cardstack-description">{description}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Cards */}
          <div className="cardstack-nav-cards">
            {getNavCards()}
          </div>
          
          {/* Social Cards */}
          <div className="cardstack-social-cards">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className={`cardstack-social-card ${link.platform}`}
                onClick={(e) => handleSocialClick(link.platform, e)}
              >
                <div className="cardstack-social-icon">
                  <i className={link.icon}></i>
                </div>
                <div className="cardstack-social-info">
                  <h3>{link.platform}</h3>
                  <p>{link.username}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer Card */}
          <div className="cardstack-footer-card">
            <p>Powered by BioForge</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 11. Magazine Layout Design
  const renderMagazineDesign = () => (
    <div className="hydra-dashboard magazine-design">
      <div className="magazine-bg-texture"></div>
      
      <div className="main-container magazine-container" ref={containerRef}>
        <div className="magazine-layout">
          {/* Header Section */}
          <div className="magazine-header">
            <div className="magazine-masthead">
              <h1 className="magazine-title">PROFILE</h1>
              <p className="magazine-subtitle">Digital Portfolio Magazine</p>
            </div>
          </div>
          
          {/* Feature Article */}
          <div className="magazine-feature-article">
            <div className="magazine-feature-image">
              <img src={profileImage} alt={name} className="magazine-profile-image" />
            </div>
            <div className="magazine-feature-content">
              <h2 className="magazine-feature-title">{name}</h2>
              <p className="magazine-feature-subtitle">{profession}</p>
              <div className="magazine-feature-text">
                <p>{description}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Section */}
          <div className="magazine-nav-section">
            <h3 className="magazine-section-title">SECTIONS</h3>
            <div className="magazine-nav-grid">
              {getNavCards()}
            </div>
          </div>
          
          {/* Social Media Section */}
          <div className="magazine-social-section">
            <h3 className="magazine-section-title">CONNECT</h3>
            <div className="magazine-social-grid">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className={`magazine-social-item ${link.platform}`}
                  onClick={(e) => handleSocialClick(link.platform, e)}
                >
                  <i className={link.icon}></i>
                  <span>{link.platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 12. Mobile App Design
  const renderMobileAppDesign = () => (
    <div className="hydra-dashboard mobileapp-design">
      <div className="mobileapp-bg-gradient"></div>
      
      <div className="main-container mobileapp-container" ref={containerRef}>
        <div className="mobileapp-phone-frame">
          <div className="mobileapp-screen">
            {/* Status Bar */}
            <div className="mobileapp-status-bar">
              <span className="mobileapp-time">9:41</span>
              <div className="mobileapp-status-icons">
                <i className="fas fa-signal"></i>
                <i className="fas fa-wifi"></i>
                <i className="fas fa-battery-full"></i>
              </div>
            </div>
            
            {/* App Header */}
            <div className="mobileapp-header">
              <div className="mobileapp-profile-section">
                <div className="mobileapp-avatar">
                  <img src={profileImage} alt={name} className="mobileapp-profile-image" />
                  <div className="mobileapp-online-indicator"></div>
                </div>
                <div className="mobileapp-user-info">
                  <h2 className="mobileapp-name">{name}</h2>
                  <p className="mobileapp-profession">{profession}</p>
                </div>
              </div>
            </div>
            
            {/* Bio Section */}
            <div className="mobileapp-bio-section">
              <p className="mobileapp-bio-text">{description}</p>
            </div>
            
            {/* Quick Actions */}
            <div className="mobileapp-quick-actions">
              {getNavCards()}
            </div>
            
            {/* Social Links */}
            <div className="mobileapp-social-section">
              <h3 className="mobileapp-section-title">Social Links</h3>
              <div className="mobileapp-social-list">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`mobileapp-social-item ${link.platform}`}
                    onClick={(e) => handleSocialClick(link.platform, e)}
                  >
                    <div className="mobileapp-social-icon">
                      <i className={link.icon}></i>
                    </div>
                    <div className="mobileapp-social-info">
                      <span className="mobileapp-social-platform">{link.platform}</span>
                      <span className="mobileapp-social-username">{link.username}</span>
                    </div>
                    <i className="fas fa-chevron-right mobileapp-social-arrow"></i>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom Navigation */}
            <div className="mobileapp-bottom-nav">
              <div className="mobileapp-nav-item active">
                <i className="fas fa-home"></i>
                <span>Home</span>
              </div>
              <div className="mobileapp-nav-item">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </div>
              <div className="mobileapp-nav-item">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on design type
  const renderDesign = () => {
    switch (design) {
      case "minimal":
        return renderMinimalDesign();
      case "elegant":
        return renderElegantDesign();
      case "bold":
        return renderBoldDesign();
      case "creative":
        return renderCreativeDesign();
      case "tech":
        return renderTechDesign();
      case "glassmorphism":
        return renderGlassmorphismDesign();
      case "neon":
        return renderNeonDesign();
      case "retro":
        return renderRetroDesign();
      case "cardstack":
        return renderCardStackDesign();
      case "magazine":
        return renderMagazineDesign();
      case "mobileapp":
        return renderMobileAppDesign();
      default:
        return renderModernDesign();
    }
  };

  return (
    <div className={`template-card-wrapper ${design}-wrapper ${color}`}>
      {renderDesign()}
    </div>
  );
};

export default TemplateCard;
