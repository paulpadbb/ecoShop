import * as React from "react";

const ContactPage = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div style={{ fontSize: '3rem', color: '#28a745' }}>✅</div>
                <h2 className="text-success mb-3">Message Sent!</h2>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="btn btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3>📧 Get In Touch</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="subject">Subject</label>
                </div>
                
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    placeholder="Message"
                    style={{ height: '150px' }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow h-100">
            <div className="card-header bg-success text-white">
              <h4>📍 Contact Information</h4>
            </div>
            <div className="card-body">
              <div className="contact-info">
                <div className="contact-item mb-4">
                  <div className="contact-icon">📧</div>
                  <div>
                    <strong>Email</strong>
                    <p>hello@ecoshop.com</p>
                  </div>
                </div>
                
                <div className="contact-item mb-4">
                  <div className="contact-icon">📞</div>
                  <div>
                    <strong>Phone</strong>
                    <p>1-800-ECOSHOP<br/>Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="contact-item mb-4">
                  <div className="contact-icon">📍</div>
                  <div>
                    <strong>Address</strong>
                    <p>123 Green Street<br/>Sustainable City, SC 12345</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">💬</div>
                  <div>
                    <strong>Live Chat</strong>
                    <p>Available 24/7<br/>Click the chat bubble</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }
        
        .contact-icon {
          font-size: 1.5rem;
          margin-top: 5px;
        }
        
        .contact-item strong {
          color: #333;
          display: block;
          margin-bottom: 5px;
        }
        
        .contact-item p {
          color: #6c757d;
          margin: 0;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export { ContactPage }; 