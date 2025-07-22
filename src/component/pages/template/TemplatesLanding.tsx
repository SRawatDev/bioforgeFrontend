import React, { useEffect } from 'react';

const TemplateLanding: React.FC = () => {
  useEffect(() => {
    // Add touch feedback for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
        target.style.opacity = '0.7';
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'IMG') {
        setTimeout(() => {
          target.style.opacity = '1';
        }, 150);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleNavigation = (section: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    target.style.transform = 'scale(0.95)';
    setTimeout(() => {
      target.style.transform = 'translateY(-2px)';
    }, 150);

    switch (section) {
      case 'drinks':
        alert('Navigating to Our Drinks section...');
        break;
      case 'location':
        alert('Opening store locator...');
        break;
      case 'wellbeing':
        alert('Exploring wellness content...');
        break;
      case 'podcast':
        alert('Opening latest podcast...');
        break;
      case 'portfolio':
        alert('Opening portfolio...');
        break;
      case 'blog':
        alert('Opening blog...');
        break;
      case 'contact':
        alert('Opening contact...');
        break;
      case 'shop':
        alert('Opening shop...');
        break;
    }
  };

  const openSocial = (platform: string, event: React.MouseEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.style.transform = 'scale(0.9)';
    setTimeout(() => {
      target.style.transform = 'scale(1.1)';
    }, 150);

    const urls: { [key: string]: string } = {
      tiktok: 'https://tiktok.com/@hydrajuice',
      spotify: 'https://open.spotify.com/show/hydrajuice',
      youtube: 'https://youtube.com/@hydrajuice',
      facebook: 'https://facebook.com/hydrajuice',
      instagram: 'https://instagram.com/hydrajuice'
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.background = 'linear-gradient(135deg, #f28a2e, #ff9f47)';
    target.style.color = 'white';
    target.style.transform = 'translateY(-2px)';
    target.style.boxShadow = '0 6px 20px rgba(242, 138, 46, 0.4)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.background = 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))';
    target.style.color = '#333';
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
  };

  const handleSocialMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.filter = 'invert(0.7) sepia(1) saturate(2) hue-rotate(25deg) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))';
    target.style.transform = 'scale(1.1)';
  };

  const handleSocialMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.filter = 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))';
    target.style.transform = 'scale(1)';
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        backgroundColor: '#7b7b5b',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(375px, 1fr))',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Card 1 */}
      <div
        style={{
          background: `linear-gradient(rgba(123, 123, 91, 0.85), rgba(46, 75, 39, 0.9)), url('https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover`,
          width: '100%',
          maxWidth: '375px',
          minHeight: '812px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 20px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', zIndex: 2 }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e4b27, #4a7c59)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span
              style={{
                color: '#f28a2e',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Card 1
            </span>
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Our Drinks
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '14px',
              margin: '5px 0 0',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Refreshing beverages for you
          </p>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '40px 0',
            flexGrow: 1,
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => handleNavigation('drinks', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            🥤 Our drinks
          </button>
          <button
            onClick={(e) => handleNavigation('drinks', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            🥤 instagram
          </button>
          <button
            onClick={(e) => handleNavigation('drinks', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            🥤 facebook
          </button>
          <button
            onClick={(e) => handleNavigation('drinks', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            🥤 linkedIn
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
              alt="TikTok"
              onClick={(e) => openSocial('tiktok', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
              alt="Spotify"
              onClick={(e) => openSocial('spotify', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              onClick={(e) => openSocial('youtube', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              onClick={(e) => openSocial('facebook', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              onClick={(e) => openSocial('instagram', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
          </div>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: '10px 0 5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            © 2024 Card 1. All rights reserved.
          </p>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Follow us for daily health tips!
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div 
  style={{
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  }}
>
  <div 
    style={{
      position: 'absolute',
      top: '80px',
      left: '40px',
      width: '8px',
      height: '8px',
      backgroundColor: 'white',
      borderRadius: '50%',
      opacity: 0.6,
      animation: 'pulse 3s ease-in-out infinite'
    }}
  ></div>
  <div 
    style={{
      position: 'absolute',
      top: '160px',
      right: '80px',
      width: '4px',
      height: '4px',
      backgroundColor: '#d8b4fe',
      borderRadius: '50%',
      opacity: 0.4,
      animation: 'bounce 2s ease-in-out infinite'
    }}
  ></div>
  <div 
    style={{
      position: 'absolute',
      bottom: '128px',
      left: '25%',
      width: '6px',
      height: '6px',
      backgroundColor: '#93c5fd',
      borderRadius: '50%',
      opacity: 0.5,
      animation: 'pulse 2s ease-in-out infinite'
    }}
  ></div>
  <div 
    style={{
      position: 'absolute',
      top: '33.333333%',
      right: '33.333333%',
      width: '4px',
      height: '4px',
      backgroundColor: '#a5b4fc',
      borderRadius: '50%',
      opacity: 0.3,
      animation: 'bounce 1s ease-in-out infinite'
    }}
  ></div>
  <div 
    style={{
      position: 'absolute',
      bottom: '80px',
      right: '40px',
      width: '8px',
      height: '8px',
      backgroundColor: '#f9a8d4',
      borderRadius: '50%',
      opacity: 0.4,
      animation: 'pulse 3s ease-in-out infinite'
    }}
  ></div>
</div>

<div 
  style={{
    width: '100%',
    maxWidth: '420px',
    minHeight: '750px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(40px)',
    borderRadius: '35px',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '45px',
    paddingBottom: '45px',
    paddingLeft: '35px',
    paddingRight: '35px',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }}
>
  <div 
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), transparent, rgba(59, 130, 246, 0.1))',
      borderRadius: '35px'
    }}
  ></div>

  <div 
    style={{
      textAlign: 'center',
      marginBottom: '45px',
      position: 'relative',
      zIndex: 10
    }}
  >
    <div 
      style={{
        position: 'relative',
        display: 'inline-block',
        marginBottom: '30px'
      }}
    >
      <div 
        style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '0 auto',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          border: '4px solid transparent',
          background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
          animation: 'floatUp 3s ease-in-out infinite'
        }}
      >
        <img 
          src="../../../../public/assets/108723120.png" 
          alt="" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          borderRadius: '50%',
          border: '2px solid #a855f7',
          animation: 'spin 8s linear infinite'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          bottom: '8px',
          left: '8px',
          borderRadius: '50%',
          border: '1px solid #3b82f6',
          animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}
      ></div>
    </div>
    <h1 
      style={{
        color: 'white',
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0 0 12px 0',
        background: 'linear-gradient(to right, #d8b4fe, #bfdbfe)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      VANSH KUSWAHA
    </h1>
    <p 
      style={{
        color: '#d8b4fe',
        fontSize: '17px',
        fontWeight: '500',
        margin: '0 0 16px 0'
      }}
    >
      Creative Designer
    </p>
    <p 
      style={{
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        margin: 0,
        lineHeight: '1.6',
        maxWidth: '300px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      Passionate about creating stunning visual experiences that inspire and engage audiences worldwide.
    </p>
  </div>

  <div 
    style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10
    }}
  >
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px'
      }}
    >
      <div 
        // onClick={() => openSocial('instagram')}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          borderRadius: '18px',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '24px',
          paddingRight: '24px',
          cursor: 'pointer',
          transition: 'all 0.5s ease'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(to bottom right, #ec4899, #9333ea)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <i className="fab fa-instagram" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '18px', margin: 0 }}>Instagram</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0 }}>@johndoe</p>
            </div>
          </div>
          <i className="fas fa-arrow-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}></i>
        </div>
      </div>

      <div 
        // onClick={() => openSocial('twitter')}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '18px',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '24px',
          paddingRight: '24px',
          cursor: 'pointer',
          transition: 'all 0.5s ease'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <i className="fab fa-twitter" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '18px', margin: 0 }}>Twitter</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0 }}>@johndoe</p>
            </div>
          </div>
          <i className="fas fa-arrow-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}></i>
        </div>
      </div>

      <div 
        // onClick={() => openSocial('youtube')}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '18px',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '24px',
          paddingRight: '24px',
          cursor: 'pointer',
          transition: 'all 0.5s ease'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(to bottom right, #ef4444, #f97316)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <i className="fab fa-youtube" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '18px', margin: 0 }}>YouTube</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0 }}>@johndoe</p>
            </div>
          </div>
          <i className="fas fa-arrow-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}></i>
        </div>
      </div>

      <div 
        // onClick={() => openSocial('linkedin')}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(79, 70, 229, 0.2))',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(37, 99, 235, 0.3)',
          borderRadius: '18px',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '24px',
          paddingRight: '24px',
          cursor: 'pointer',
          transition: 'all 0.5s ease'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(to bottom right, #2563eb, #4f46e5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <i className="fab fa-linkedin-in" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '18px', margin: 0 }}>LinkedIn</h3>
              

              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0 }}>John Doe</p>
            </div>
          </div>
          <i className="fas fa-arrow-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}></i>
        </div>
      </div>
      <div 
        // onClick={() => openSocial('github')}
        style={{
          width: '100%',
          background: 'linear-gradient(to right, rgba(55, 65, 81, 0.2), rgba(17, 24, 39, 0.2))',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(75, 85, 99, 0.3)',
          borderRadius: '18px',
          paddingTop: '20px',
          paddingBottom: '20px',
          paddingLeft: '24px',
          paddingRight: '24px',
          cursor: 'pointer',
          transition: 'all 0.5s ease'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(to bottom right, #374151, #111827)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <i className="fab fa-github" style={{ color: 'white', fontSize: '20px' }}></i>
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '18px', margin: 0 }}>GitHub</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', margin: 0 }}>@johndoe</p>
            </div>
          </div>
          <i className="fas fa-arrow-right" style={{ color: 'rgba(255, 255, 255, 0.6)' }}></i>
        </div>
      </div>
    </div>

    <div style={{ textAlign: 'center' }}>
      <div 
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
          marginBottom: '16px'
        }}
      ></div>
      <p 
        style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
          fontWeight: '300'
        }}
      >
        Crafted with BioForge ✨
      </p>
    </div>
  </div>
</div>

      {/* Card 3 */}
      <div
        style={{
          background: `linear-gradient(rgba(123, 123, 91, 0.85), rgba(46, 75, 39, 0.9)), url('https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover`,
          width: '100%',
          maxWidth: '375px',
          minHeight: '812px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 20px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', zIndex: 2 }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e4b27, #4a7c59)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span
              style={{
                color: '#f28a2e',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Card 3
            </span>
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Wellbeings
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '14px',
              margin: '5px 0 0',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Your wellness journey starts here
          </p>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '40px 0',
            flexGrow: 1,
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => handleNavigation('wellbeing', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            🌿 Wellbeings
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
              alt="TikTok"
              onClick={(e) => openSocial('tiktok', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
              alt="Spotify"
              onClick={(e) => openSocial('spotify', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              onClick={(e) => openSocial('youtube', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              onClick={(e) => openSocial('facebook', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              onClick={(e) => openSocial('instagram', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
          </div>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: '10px 0 5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            © 2024 Card 3. All rights reserved.
          </p>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Follow us for daily health tips!
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div
        style={{
          background: `linear-gradient(rgba(123, 123, 91, 0.85), rgba(46, 75, 39, 0.9)), url('https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover`,
          width: '100%',
          maxWidth: '375px',
          minHeight: '812px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 20px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', zIndex: 2 }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e4b27, #4a7c59)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span
              style={{
                color: '#f28a2e',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Card 4
            </span>
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Our Podcast
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '14px',
              margin: '5px 0 0',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Listen to our latest episodes
          </p>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '40px 0',
            flexGrow: 1,
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => handleNavigation('podcast', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            🎧 Our latest Podcast
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
              alt="TikTok"
              onClick={(e) => openSocial('tiktok', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
              alt="Spotify"
              onClick={(e) => openSocial('spotify', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              onClick={(e) => openSocial('youtube', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              onClick={(e) => openSocial('facebook', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              onClick={(e) => openSocial('instagram', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
          </div>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: '10px 0 5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            © 2024 Card 4. All rights reserved.
          </p>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Follow us for daily health tips!
          </p>
        </div>
      </div>

      {/* Card 5 */}
      <div
        style={{
          background: `linear-gradient(rgba(123, 123, 91, 0.85), rgba(46, 75, 39, 0.9)), url('https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover`,
          width: '100%',
          maxWidth: '375px',
          minHeight: '812px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 20px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', zIndex: 2 }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e4b27, #4a7c59)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span
              style={{
                color: '#f28a2e',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Card 5
            </span>
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Portfolio
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '14px',
              margin: '5px 0 0',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Explore our creative work
          </p>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '40px 0',
            flexGrow: 1,
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => handleNavigation('portfolio', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            💼 Portfolio
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
              alt="TikTok"
              onClick={(e) => openSocial('tiktok', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
              alt="Spotify"
              onClick={(e) => openSocial('spotify', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
            
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              onClick={(e) => openSocial('youtube', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              onClick={(e) => openSocial('facebook', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              onClick={(e) => openSocial('instagram', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
          </div>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: '10px 0 5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            © 2024 Card 5. All rights reserved.
          </p>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Follow us for daily health tips!
          </p>
        </div>
      </div>

      {/* Card 6 */}
      <div
        style={{
          background: `linear-gradient(rgba(123, 123, 91, 0.85), rgba(46, 75, 39, 0.9)), url('https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover`,
          width: '100%',
          maxWidth: '375px',
          minHeight: '812px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 20px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', zIndex: 2 }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e4b27, #4a7c59)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span
              style={{
                color: '#f28a2e',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Card 6
            </span>
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Blog
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '14px',
              margin: '5px 0 0',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Read our latest articles
          </p>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '40px 0',
            flexGrow: 1,
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => handleNavigation('blog', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            📝 Blog
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
              alt="TikTok"
              onClick={(e) => openSocial('tiktok', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
              alt="Spotify"
              onClick={(e) => openSocial('spotify', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              onClick={(e) => openSocial('youtube', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              onClick={(e) => openSocial('facebook', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              onClick={(e) => openSocial('instagram', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
          </div>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: '10px 0 5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            © 2024 Card 6. All rights reserved.
          </p>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Follow us for daily health tips!
          </p>
        </div>
      </div>

      {/* Card 7 */}
      <div
        style={{
          background: `linear-gradient(rgba(123, 123, 91, 0.85), rgba(46, 75, 39, 0.9)), url('https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover`,
          width: '100%',
          maxWidth: '375px',
          minHeight: '812px',
          borderRadius: '30px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 20px',
          position: 'relative',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px', zIndex: 2 }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2e4b27, #4a7c59)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span
              style={{
                color: '#f28a2e',
                fontSize: '24px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Card 7
            </span>
          </div>
          <h2
            style={{
              color: 'white',
              fontSize: '20px',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Contact Us
          </h2>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '14px',
              margin: '5px 0 0',
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Get in touch with us
          </p>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '40px 0',
            flexGrow: 1,
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <button
            onClick={(e) => handleNavigation('contact', e)}
            style={{
              background: 'linear-gradient(135deg, rgba(217, 217, 217, 0.95), rgba(255, 255, 255, 0.9))',
              padding: '18px 20px',
              borderRadius: '30px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              width: '100%'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            📞 Contact Us
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', zIndex: 2 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
              alt="TikTok"
              onClick={(e) => openSocial('tiktok', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
              alt="Spotify"
              onClick={(e) => openSocial('spotify', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="YouTube"
              onClick={(e) => openSocial('youtube', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              onClick={(e) => openSocial('facebook', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              onClick={(e) => openSocial('instagram', e)}
              style={{
                width: '32px',
                height: '32px',
                filter: 'invert(1) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={handleSocialMouseOver}
              onMouseOut={handleSocialMouseOut}
            />
          </div>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: '10px 0 5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            © 2024 Card 7. All rights reserved.
          </p>
          <p
            style={{
              color: '#e0e0e0',
              fontSize: '12px',
              opacity: 0.8,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            Follow us for daily health tips!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateLanding;
