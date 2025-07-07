import * as React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-4">About EcoShop</h1>
                <p className="lead">
                  We're on a mission to make fresh, sustainable groceries accessible to everyone while supporting local communities and protecting our planet.
                </p>
                <div className="hero-stats">
                  <div className="stat">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Local Farms</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Happy Customers</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Eco-Friendly</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Fresh vegetables and fruits"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="mission-card">
                <div className="mission-icon">🌱</div>
                <h3>Our Mission</h3>
                <p>
                  To revolutionize the way people shop for groceries by connecting communities with local farms and promoting sustainable living practices.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h3>Our Vision</h3>
                <p>
                  A world where fresh, healthy food is accessible to all, while supporting local economies and preserving our environment for future generations.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mission-card">
                <div className="mission-icon">💚</div>
                <h3>Our Values</h3>
                <p>
                  Sustainability, quality, community support, and transparency guide everything we do, from sourcing to delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="story-image">
                <img 
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Local farmer"
                  className="img-fluid rounded"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-content">
                <h2>Our Story</h2>
                <p>
                  EcoShop was founded in 2020 by a group of friends who shared a passion for sustainable living and supporting local communities. What started as a small farmers market booth has grown into a thriving online platform connecting thousands of customers with local farms.
                </p>
                <p>
                  We believe that everyone deserves access to fresh, healthy food while supporting the hardworking farmers in our communities. Our platform makes it easy to discover and purchase directly from local producers, ensuring fair prices for farmers and the freshest products for our customers.
                </p>
                <div className="story-highlights">
                  <div className="highlight">
                    <strong>2020:</strong> Founded with 3 local farms
                  </div>
                  <div className="highlight">
                    <strong>2021:</strong> Expanded to 25 farms, 1000+ customers
                  </div>
                  <div className="highlight">
                    <strong>2022:</strong> Launched eco-friendly packaging
                  </div>
                  <div className="highlight">
                    <strong>2023:</strong> 50+ farms, 10K+ satisfied customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Meet Our Team</h2>
            <p className="lead">The passionate people behind EcoShop</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="team-member">
                <div className="member-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Sarah Johnson"
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h4>Sarah Johnson</h4>
                  <p className="member-role">CEO & Founder</p>
                  <p className="member-bio">
                    Former sustainability consultant with 10+ years experience in green business practices.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-member">
                <div className="member-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Mike Chen"
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h4>Mike Chen</h4>
                  <p className="member-role">CTO</p>
                  <p className="member-bio">
                    Full-stack developer passionate about using technology to solve environmental challenges.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-member">
                <div className="member-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616c62b6671?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Emily Rodriguez"
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h4>Emily Rodriguez</h4>
                  <p className="member-role">Head of Operations</p>
                  <p className="member-bio">
                    Supply chain expert ensuring our products reach customers fresh and on time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="impact-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Our Impact</h2>
            <p className="lead">Together, we're making a difference</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="impact-card">
                <div className="impact-icon">🌍</div>
                <div className="impact-number">500K</div>
                <div className="impact-label">lbs CO2 Saved</div>
                <p>Through local sourcing and eco-friendly packaging</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="impact-card">
                <div className="impact-icon">🚚</div>
                <div className="impact-number">10K</div>
                <div className="impact-label">Miles Reduced</div>
                <p>By connecting customers with local farms</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="impact-card">
                <div className="impact-icon">🧑‍🌾</div>
                <div className="impact-number">50+</div>
                <div className="impact-label">Farmers Supported</div>
                <p>Helping local farms thrive and grow</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="impact-card">
                <div className="impact-icon">📦</div>
                <div className="impact-number">95%</div>
                <div className="impact-label">Plastic-Free</div>
                <p>Packaging made from recycled materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <div className="text-center">
            <h2>Join Our Mission</h2>
            <p className="lead">
              Ready to make a positive impact with every purchase?
            </p>
            <button className="btn btn-primary btn-lg">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutPage }; 