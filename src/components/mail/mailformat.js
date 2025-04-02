import React from 'react';

const EmailFormat = ({ 
  recipientName, 
  sessionDate, 
  sessionTime, 
  rescheduleLink = "https://example.com/reschedule",
  companyName = "Wellness Center",
  companyLogo = "/api/placeholder/200/60" // Placeholder for logo
}) => {
  return (
    <div style={{ 
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', 
      maxWidth: '650px', 
      margin: '0 auto', 
      padding: '0', 
      backgroundColor: '#ffffff', 
      color: '#333333',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header with gradient */}
      <div style={{ 
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        padding: '30px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <img 
          src={companyLogo} 
          alt={companyName} 
          style={{ 
            maxHeight: '60px', 
            marginBottom: '15px' 
          }} 
        />
        <h1 style={{ 
          fontSize: '28px', 
          margin: '10px 0',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          Your Consultation is Confirmed!
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15px'
        }}>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            ✓
          </span>
        </div>
      </div>
      
      {/* Content area */}
      <div style={{ padding: '35px 40px' }}>
        <p style={{ 
          fontSize: '17px',
          lineHeight: '1.6'
        }}>
          Hello <span style={{ fontWeight: '600', color: '#6a11cb' }}>{recipientName}</span>,
        </p>
        
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          We're delighted to confirm your upcoming mental wellness consultation. Your well-being is our priority, and we look forward to supporting you on your journey.
        </p>
        
        {/* Appointment details card */}
        <div style={{ 
          backgroundColor: '#f8f9fc', 
          padding: '25px', 
          borderRadius: '12px',
          margin: '25px 0',
          boxShadow: '0 3px 10px rgba(106, 17, 203, 0.08)',
          borderLeft: '5px solid #6a11cb'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#6a11cb',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '22px' }}>📅</span> Appointment Details
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                fontWeight: '600',
                minWidth: '80px'
              }}>Date:</span>
              <span style={{
                backgroundColor: 'white',
                padding: '8px 15px',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                flexGrow: 1
              }}>{sessionDate}</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                fontWeight: '600',
                minWidth: '80px'
              }}>Time:</span>
              <span style={{
                backgroundColor: 'white',
                padding: '8px 15px',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                flexGrow: 1
              }}>{sessionTime}</span>
            </div>
          </div>
        </div>
        
        {/* What to expect section */}
        <div style={{ margin: '30px 0' }}>
          <h3 style={{ 
            color: '#6a11cb',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '22px' }}>✨</span> What to Expect
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '15px'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                backgroundColor: '#eee6ff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#6a11cb'
              }}>1</div>
              <p style={{ margin: '0', lineHeight: '1.6' }}>
                A counselor will contact you 24 hours before your session for confirmation.
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                backgroundColor: '#eee6ff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#6a11cb'
              }}>2</div>
              <p style={{ margin: '0', lineHeight: '1.6' }}>
                The session will last approximately 50 minutes.
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                backgroundColor: '#eee6ff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#6a11cb'
              }}>3</div>
              <p style={{ margin: '0', lineHeight: '1.6' }}>
                You will receive a secure video link before your session.
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                backgroundColor: '#eee6ff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#6a11cb'
              }}>4</div>
              <p style={{ margin: '0', lineHeight: '1.6' }}>
                Ensure you are in a quiet and private space for your session.
              </p>
            </div>
          </div>
        </div>
        
        {/* Rescheduling section */}
        <div style={{
          backgroundColor: '#fff5f5',
          padding: '25px',
          borderRadius: '12px',
          margin: '30px 0',
          borderLeft: '5px solid #ff6b6b'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            color: '#ff6b6b',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '22px' }}>🔄</span> Need to Reschedule?
          </h3>
          
          <p style={{ margin: '0 0 15px 0', lineHeight: '1.6' }}>
            If you need to make any changes, please contact us at least 24 hours in advance:
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '18px' }}>📧</span>
              <a href="mailto:support@company.com" style={{ 
                color: '#ff6b6b', 
                textDecoration: 'none',
                fontWeight: '500' 
              }}>support@company.com</a>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '18px' }}>📞</span>
              <a href="tel:+15551234567" style={{ 
                color: '#ff6b6b', 
                textDecoration: 'none',
                fontWeight: '500'
              }}>(555) 123-4567</a>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div style={{ 
          textAlign: 'center', 
          margin: '35px 0' 
        }}>
          <a 
            href={rescheduleLink} 
            style={{ 
              backgroundColor: '#6a11cb',
              background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(106, 17, 203, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Reschedule My Appointment
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <div style={{ 
        backgroundColor: '#f8f9fc',
        padding: '30px 40px',
        textAlign: 'center',
        borderTop: '1px solid #eaeaea'
      }}>
        <p style={{ 
          fontSize: '15px', 
          color: '#666',
          margin: '0 0 15px 0'
        }}>
          We are committed to your well-being. 💙
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          margin: '20px 0'
        }}>
          <a href="youtube.com" style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#6a11cb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px'
          }}>f</a>
          
          <a href="youtube.com" style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#6a11cb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px'
          }}>in</a>
          
          <a href="youtube.com" style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#6a11cb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px'
          }}>ig</a>
        </div>
        
        <p style={{ 
          fontSize: '14px', 
          color: '#666',
          margin: '10px 0'
        }}>
          © 2025 <strong>{companyName}</strong>. All rights reserved.
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          fontSize: '13px',
          color: '#888',
          marginTop: '10px'
        }}>
          <a href="https://example.com/privacy-policy" style={{ color: '#6a11cb', textDecoration: 'none' }}>
            Privacy Policy
          </a>
          <span>|</span>
          <a href="https://example.com/terms-of-service" style={{ color: '#6a11cb', textDecoration: 'none' }}>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

const GenerateEmailHTML = (email_content) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa; color: #333; }
        </style>
    </head>
    <body>
        ${email_content}
    </body>
    </html>`;
};



 export { EmailFormat, GenerateEmailHTML };
