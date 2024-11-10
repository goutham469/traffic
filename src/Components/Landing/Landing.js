import React from 'react';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Track and Optimize Your Website Traffic</h1>
        <p>Get real-time insights, track unique visitors, and understand your audience with ease.</p>
        <button className={styles.ctaButton}>Get Started Free</button>
        <button className={styles.ctaButton} onClick={()=>navigate('/login')}>Login/Sign-up</button>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Powerful Analytics Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Total Views</h3>
            <p>Monitor real-time page views on your site.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Unique Visitor Tracking</h3>
            <p>Track the number of unique visitors via IP address.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>IP-Based Insights</h3>
            <p>Identify traffic patterns from individual IPs.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Country-Level Analysis</h3>
            <p>See where your visitors are coming from with geo insights.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Browser-Level Analysis</h3>
            <p>See which browser your users are using .</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Device Distribution</h3>
            <p>See which devices your users are using.</p>
          </div>
          
          {/* Add more features as needed */}
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricing}>
        <h2>Choose Your Plan</h2>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3>Free</h3>
            <p>Basic features to get you started.</p>
            <ul>
              <li>Real-time page views</li>
              <li>Basic traffic insights</li>
              <li>Limited API requests</li>
            </ul>
            <button className={styles.ctaButton}>Get Started</button>
          </div>
          <div className={styles.pricingCard}>
            <h3>Premium</h3>
            <p>Unlock full analytics power.</p>
            <ul>
              <li>Unlimited page views</li>
              <li>Advanced IP tracking</li>
              <li>Country-based analysis</li>
              <li>Priority support</li>
            </ul>
            <button className={styles.ctaButton}>Upgrade Now</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2>What Our Customers Say</h2>
        <div className={styles.testimonialCard}>
          <p>“This tool transformed the way I understand my site's audience!”</p>
          <p>- Alex R.</p>
        </div>
        <div className={styles.testimonialCard}>
          <p>“Fantastic insights and easy to set up. My go-to analytics tool.”</p>
          <p>- Morgan S.</p>
        </div>
        {/* Add more testimonials if needed */}
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2>Ready to Start Analyzing Your Traffic?</h2>
        <button className={styles.ctaButton}>Sign Up Free</button>
        <a className={styles.ctaButton} href={`${process.env.REACT_APP_CLIENT_BASE_URL}/admin`}>Admin Login</a>
      </section>
    </div>
  );
};

export default Landing;
