import React, { useState } from 'react';
import { FiCheck, FiX, FiStar, FiDollarSign } from 'react-icons/fi';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import './index.css';

type BillingCycle = 'monthly' | 'annual';

const Index = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const freeBenefits = [
    { icon: FiCheck, text: "Only View", included: true },
    { icon: FiX, text: "Basic templates", included: false },
    { icon: FiX, text: "Basic analytics", included: false },
    { icon: FiX, text: "Basic bio page", included: false },
    { icon: FiX, text: "Limited customization", included: false },
    { icon: FiX, text: "Advanced analytics", included: false },
    { icon: FiX, text: "Priority support", included: false },
    { icon: FiX, text: "Custom domain", included: false },
    { icon: FiX, text: "Advanced integrations", included: false },
    { icon: FiX, text: "24/7 support", included: false },
  ];

  const proBenefits = [
    { icon: FiCheck, text: "Up to 1,000 subscribers", included: true },
    { icon: FiCheck, text: "Premium templates", included: true },
    { icon: FiCheck, text: "Advanced analytics & insights", included: true },
    { icon: FiCheck, text: "Custom bio page design", included: true },
    { icon: FiCheck, text: "Full customization", included: true },
    { icon: FiCheck, text: "Priority support", included: true },
    { icon: FiCheck, text: "Custom domain support", included: true },
    { icon: FiCheck, text: "Advanced integrations", included: true },
    { icon: FiX, text: "24/7 premium support", included: false },
    { icon: FiX, text: "Export data & reports", included: false },
  ];

  const premiumBenefits = [
    { icon: FiCheck, text: "Unlimited subscribers", included: true },
    { icon: FiCheck, text: "Premium templates", included: true },
    { icon: FiCheck, text: "Advanced analytics & insights", included: true },
    { icon: FiCheck, text: "Custom bio page design", included: true },
    { icon: FiCheck, text: "Full customization", included: true },
    { icon: FiCheck, text: "Priority support", included: true },
    { icon: FiCheck, text: "Custom domain support", included: true },
    { icon: FiCheck, text: "Advanced integrations", included: true },
    { icon: FiCheck, text: "24/7 premium support", included: true },
    { icon: FiCheck, text: "Export data & reports", included: true },
  ];

  const pricingOptions = {
    free: {
      monthly: { price: 0, period: "month" },
      annual: { price: 0, period: "year" },
    },
    pro: {
      monthly: { price: 99, period: "month", savings: null },
      annual: { price: 995.17, period: "year", originalPrice: 1199, savings: "Save 17%" },
    },
    premium: {
      monthly: { price: 399, period: "month", savings: null },
      annual: { price: 1825.17, period: "year", originalPrice: 2199, savings: "Save 17%" },
    },
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    console.log(`Selected plan: ${plan} - ${billingCycle}`);
  };

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Header */}
        <header className="header">
          <h1>Pricing Plans for Every BioForge Creator</h1>
          <p>Start for free or choose a plan tailored to your needs. Unlock powerful tools to grow your audience effortlessly.</p>
        </header>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          {[
            { key: 'monthly', label: 'Monthly' },
            { key: 'annual', label: 'Annual' },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setBillingCycle(option.key as BillingCycle)}
              className={`toggle-button ${billingCycle === option.key ? 'active' : ''}`}
            >
              {option.label}
              {option.key === 'annual' && <span className="savings-badge">Save 17%</span>}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {/* Free Plan */}
          <div className="pricing-card">
            <div className="card-header">
              <h2>Free</h2>
              <div className="price">
                <MdOutlineCurrencyRupee className="price-icon" />
                <span className="price-amount">0</span>
                <span className="price-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="card-description">Perfect for beginners</p>
            </div>
            <div className="card-benefits">
              {freeBenefits.map((benefit, index) => (
                <div key={index} className="benefit">
                  <benefit.icon className={`benefit-icon ${benefit.included ? 'included' : 'excluded'}`} />
                  <span className={benefit.included ? '' : 'excluded'}>{benefit.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => handlePlanSelect('free')} className="card-button free">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`pricing-card pro ${billingCycle === 'monthly' ? 'popular' : ''}`}>
            {billingCycle === 'monthly' && (
              <div className="badge">
                <FiStar className="badge-icon" /> Popular Plan
              </div>
            )}
            <div className="card-header">
              <h2>Pro</h2>
              <div className="price">
                <MdOutlineCurrencyRupee className="price-icon" />
                <span className="price-amount">{pricingOptions.pro[billingCycle].price}</span>
                <span className="price-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              {billingCycle === 'annual' && (
                <div className="savings">
                  <span className="original-price">${pricingOptions.pro.annual.originalPrice}</span>
                  <span className="savings-text">{pricingOptions.pro.annual.savings}</span>
                </div>
              )}
              <p className="card-description">For growing creators</p>
            </div>
            <div className="card-benefits">
              {proBenefits.map((benefit, index) => (
                <div key={index} className="benefit">
                  <benefit.icon className={`benefit-icon ${benefit.included ? 'included' : 'excluded'}`} />
                  <span className={benefit.included ? '' : 'excluded'}>{benefit.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => handlePlanSelect('pro')} className="card-button pro">
              Choose Pro
            </button>
          </div>

          {/* Premium Plan */}
          <div className={`pricing-card premium ${billingCycle === 'annual' ? 'popular' : ''}`}>
            {billingCycle === 'annual' && (
              <div className="badge">
                <FiStar className="badge-icon" /> Popular Plan
              </div>
            )}
            <div className="card-header">
              <h2>Premium</h2>
              <div className="price">
                <MdOutlineCurrencyRupee className="price-icon" />
                <span className="price-amount">{pricingOptions.premium[billingCycle].price}</span>
                <span className="price-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              {billingCycle === 'annual' && (
                <div className="savings">
                  <span className="original-price">${pricingOptions.premium.annual.originalPrice}</span>
                  <span className="savings-text">{pricingOptions.premium.annual.savings}</span>
                </div>
              )}
              <p className="card-description">For professional creators</p>
            </div>
            <div className="card-benefits">
              {premiumBenefits.map((benefit, index) => (
                <div key={index} className="benefit">
                  <benefit.icon className={`benefit-icon ${benefit.included ? 'included' : 'excluded'}`} />
                  <span className={benefit.included ? '' : 'excluded'}>{benefit.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => handlePlanSelect('premium')} className="card-button premium">
              Choose Premium
            </button>
          </div>
        </div>

        {/* Feature Comparison */}
        <section className="feature-comparison">
          <h2>Compare Plans</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Subscribers", free: "Up to 100", pro: "Up to 1,000", premium: "Unlimited" },
                  { feature: "Templates", free: "Basic", pro: "Premium", premium: "Premium + Custom" },
                  { feature: "Analytics", free: "Basic", pro: "Advanced", premium: "Advanced + Export" },
                  { feature: "Custom Domain", free: "✗", pro: "✓", premium: "✓" },
                  { feature: "Priority Support", free: "✗", pro: "✓", premium: "24/7" },
                  { feature: "Integrations", free: "Limited", pro: "Advanced", premium: "All" },
                ].map((row, index) => (
                  <tr key={index}>
                    <td>{row.feature}</td>
                    <td>{row.free}</td>
                    <td>{row.pro}</td>
                    <td>{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2>Loved by Creators</h2>
          <div className="testimonials-grid">
            {[
              { quote: "This platform transformed how I connect with my audience!", author: "Jane Doe, Creator" },
              { quote: "The analytics features are a game-changer for growth.", author: "John Smith, Influencer" },
              { quote: "Easy to use and powerful – perfect for serious creators.", author: "Alex Johnson, Blogger" },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="quote">"{testimonial.quote}"</p>
                <p className="author">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time.",
              },
              {
                question: "Is there a free trial for paid plans?",
                answer: "Our free plan acts as a trial. Upgrade anytime to access more features.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers.",
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
              },
            ].map((faq, index) => (
              <div key={index} className="faq-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <h2>Start Building Your Audience Today</h2>
          <p>Join thousands of creators who trust BioForge to grow and engage their communities.</p>
          <div className="cta-buttons">
            <button onClick={() => handlePlanSelect('free')} className="cta-button free">
              Start Free
            </button>
            <button
              onClick={() => handlePlanSelect(billingCycle === 'monthly' ? 'pro' : 'premium')}
              className="cta-button pro"
            >
              {billingCycle === 'monthly' ? 'Get Pro' : 'Get Premium'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;