import * as React from "react";
import "./FAQPage.css";

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = React.useState(null);

  const faqData = [
    {
      id: 1,
      category: "Orders & Shipping",
      icon: "🚚",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "We offer free standard shipping on orders over $50, which typically takes 3-5 business days. Express shipping (1-2 business days) is available for $9.99."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we ship to the United States, Canada, and the United Kingdom. International shipping rates and times vary by destination."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard."
        },
        {
          question: "What if my order arrives damaged?",
          answer: "We're sorry to hear that! Please contact us within 48 hours of delivery with photos of the damaged items. We'll arrange a replacement or full refund immediately."
        }
      ]
    },
    {
      id: 2,
      category: "Products & Quality",
      icon: "🥬",
      questions: [
        {
          question: "Are your products organic?",
          answer: "We carry both organic and conventional products. All organic items are clearly labeled and certified by USDA organic standards."
        },
        {
          question: "How do you ensure product freshness?",
          answer: "We work directly with local farms and suppliers to ensure the freshest products. Our cold chain management maintains optimal temperatures from farm to your door."
        },
        {
          question: "Do you offer bulk discounts?",
          answer: "Yes! We offer tiered pricing for bulk orders. Contact our sales team for custom quotes on orders over 20 units of the same product."
        },
        {
          question: "Are there any seasonal products?",
          answer: "Absolutely! We feature seasonal produce and specialty items throughout the year. Check our homepage for current seasonal offerings."
        }
      ]
    },
    {
      id: 3,
      category: "Account & Payment",
      icon: "💳",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers."
        },
        {
          question: "Can I create an account for faster checkout?",
          answer: "Yes! Creating an account allows you to save your shipping addresses, track orders, and access exclusive member discounts."
        },
        {
          question: "Do you offer payment plans?",
          answer: "For orders over $100, we offer Buy Now, Pay Later options through Klarna and Afterpay, allowing you to split payments over time."
        }
      ]
    },
    {
      id: 4,
      category: "Returns & Refunds",
      icon: "↩️",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for non-perishable items in original condition. Perishable items can be returned within 48 hours of delivery."
        },
        {
          question: "How do I initiate a return?",
          answer: "Log into your account, find the order, and click 'Return Items'. We'll email you a prepaid return label within 24 hours."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned items. The refund will appear on your original payment method."
        },
        {
          question: "Are there any items that cannot be returned?",
          answer: "Gift cards, digital products, and customized items cannot be returned. Perishable items must be returned within 48 hours."
        }
      ]
    },
    {
      id: 5,
      category: "Sustainability & Environment",
      icon: "🌱",
      questions: [
        {
          question: "Are your packaging materials eco-friendly?",
          answer: "Yes! We use recyclable cardboard boxes, biodegradable packing peanuts, and minimal plastic. Our goal is zero-waste packaging by 2025."
        },
        {
          question: "Do you support local farmers?",
          answer: "Absolutely! We partner with over 50 local farms within 200 miles of our distribution centers to reduce transportation emissions and support local communities."
        },
        {
          question: "What are your sustainability initiatives?",
          answer: "We're committed to carbon-neutral shipping, plastic-free packaging, and supporting regenerative agriculture practices. Learn more on our Sustainability page."
        },
        {
          question: "Do you offer carbon offset options?",
          answer: "Yes! During checkout, you can add a small carbon offset fee to make your entire order carbon-neutral through our partnership with verified offset programs."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryId, questionIndex) => {
    const faqKey = `${categoryId}-${questionIndex}`;
    setOpenFAQ(openFAQ === faqKey ? null : faqKey);
  };

  return (
    <div className="container mt-4">
      <div className="faq-header">
        <div className="text-center mb-5">
          <h1 className="display-4">❓ Frequently Asked Questions</h1>
          <p className="lead">
            Find answers to common questions about shopping with EcoShop. 
            Can't find what you're looking for? <a href="/contact">Contact us!</a>
          </p>
        </div>
      </div>

      <div className="search-box mb-4">
        <div className="input-group">
          <span className="input-group-text">🔍</span>
          <input
            type="text"
            className="form-control"
            placeholder="Search FAQs..."
            aria-label="Search FAQs"
          />
        </div>
      </div>

      <div className="row">
        {faqData.map((category) => (
          <div key={category.id} className="col-12 mb-4">
            <div className="faq-category">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.category}</h3>
              </div>
              
              <div className="faq-questions">
                {category.questions.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div 
                      className="faq-question"
                      onClick={() => toggleFAQ(category.id, index)}
                    >
                      <h5>{faq.question}</h5>
                      <span className={`toggle-icon ${openFAQ === `${category.id}-${index}` ? 'open' : ''}`}>
                        ➕
                      </span>
                    </div>
                    
                    <div className={`faq-answer ${openFAQ === `${category.id}-${index}` ? 'open' : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <div className="card">
          <div className="card-body text-center">
            <h4>Still have questions?</h4>
            <p className="mb-3">Our friendly support team is here to help!</p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div>
                  <strong>Phone Support</strong>
                  <p>1-800-ECOSHOP<br />Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">💬</div>
                <div>
                  <strong>Live Chat</strong>
                  <p>Available 24/7<br />Average response: 2 minutes</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div>
                  <strong>Email Support</strong>
                  <p>hello@ecoshop.com<br />Response within 4 hours</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg mt-3">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <div className="helpful-links">
        <div className="row text-center">
          <div className="col-md-3">
            <div className="helpful-link">
              <div className="link-icon">📋</div>
              <h6>Order Status</h6>
              <p>Track your order</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="helpful-link">
              <div className="link-icon">🔒</div>
              <h6>Privacy Policy</h6>
              <p>How we protect your data</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="helpful-link">
              <div className="link-icon">📜</div>
              <h6>Terms of Service</h6>
              <p>Our terms and conditions</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="helpful-link">
              <div className="link-icon">🌱</div>
              <h6>Sustainability</h6>
              <p>Our environmental commitment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FAQPage }; 