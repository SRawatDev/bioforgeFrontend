
import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiStar, FiLoader, FiCheckCircle, FiXCircle, FiCreditCard, FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { callAPI } from "../../../utils/apicall.utils";
import { apiUrls } from "../../../utils/api.utils";
//  const baseUrl = process.env.REACT_APP_BASE_URL || window.location.origin;
type BillingCycle = 'monthly' | 'annual';
type PlanType = 'free' | 'pro' | 'premium';
type PaymentStatus = 'idle' | 'loading' | 'success' | 'error';

interface UserSubscription {
  currentPlan: PlanType;
  planStatus: string;
  subscription: {
    _id: string;
    stripeSubscriptionId: string;
    planType: PlanType;
    billingCycle: BillingCycle;
    subscriptionStatus: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    amount: number;
  } | null;
  planLimits: {
    subscriberLimit: number;
    templates: string;
    analytics: string;
    customDomain: boolean;
    prioritySupport: boolean | string;
  };
  planEndDate: string | null;
}

interface PaymentHistory {
  _id: string;
  planType: PlanType;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
}

const Index = () => {
  // State management
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [error, setError] = useState<string>('');
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);

  // API Service functions using the existing utility
 const createCheckoutSession = async (planType: PlanType, billingCycle: BillingCycle) => {
  try {
    const baseUrl = 'http://192.168.0.158:3009/';
    
    const response = await callAPI(
      apiUrls.payment.createCheckoutSession,
      {},
      'POST',
      {
        planType,
        billingCycle,
        successUrl: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/payment/cancel`
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

  const getUserSubscription = async () => {
    try {
      const response = await callAPI(
        apiUrls.payment.subscription,
        {},
        'GET'
      );
      return response.data;
    } catch (error) {
      console.error('Error getting subscription:', error);
      throw error;
    }
  };

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await callAPI(
        apiUrls.payment.verifyPayment,
        {},
        'POST',
        { sessionId }
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const cancelSubscription = async (cancelAtPeriodEnd = true) => {
    try {
      const response = await callAPI(
        apiUrls.payment.cancelSubscription,
        {},
        'POST',
        { cancelAtPeriodEnd }
      );
      return response.data;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  };

  const getPaymentHistory = async (page = 1, limit = 10) => {
    try {
      const response = await callAPI(
        apiUrls.payment.history,
        { page, limit },
        'GET'
      );
      return response.data;
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw error;
    }
  };

  // Benefits configuration
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

  // Load initial data
  useEffect(() => {
    loadUserSubscription();
    checkPaymentReturn();
  }, []);

  const loadUserSubscription = async () => {
    try {
      const response = await getUserSubscription();
      if (response.success) {
        setUserSubscription(response.data);
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
      // Don't show error for unauthenticated users
      const token = localStorage.getItem('accessToken');
      if (token) {
        setError('Failed to load subscription details');
      }
    }
  };

  const loadPaymentHistory = async () => {
    try {
      const response = await getPaymentHistory(1, 20);
      if (response.success) {
        setPaymentHistory(response.data.payments);
      }
    } catch (error) {
      console.error('Error loading payment history:', error);
      setError('Failed to load payment history');
    }
  };

  const checkPaymentReturn = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const status = urlParams.get('status');

    if (sessionId) {
      verifyPaymentAndUpdateUI(sessionId);
    } else if (status === 'cancel') {
      setError('Payment was cancelled. You can try again anytime.');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const verifyPaymentAndUpdateUI = async (sessionId: string) => {
    try {
      setPaymentStatus('loading');
      const response = await verifyPayment(sessionId);
      
      if (response.success && response.data.status === 'success') {
        setPaymentStatus('success');
        await loadUserSubscription();
        
        // Show success message
        setTimeout(() => {
          alert('🎉 Payment successful! Your subscription has been activated.');
          setPaymentStatus('idle');
        }, 1000);
      } else {
        setPaymentStatus('error');
        setError('Payment verification failed. Please contact support if you were charged.');
      }
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentStatus('error');
      setError('Failed to verify payment. Please contact support.');
    }
  };

  const handlePlanSelect = async (plan: string) => {
    if (paymentStatus === 'loading') return;
    
    setSelectedPlan(plan);
    setError('');

    // Check authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Please login to select a plan');
      return;
    }

    if (plan === 'free') {
      // Handle free plan - maybe redirect to dashboard or show message
      alert('You are already on the free plan!');
      return;
    }

    // Check current subscription
    if (userSubscription) {
      const currentPlan = userSubscription.currentPlan;
      if (currentPlan === plan) {
        setError('You are already subscribed to this plan.');
        return;
      }
      if (currentPlan === 'premium' && plan === 'pro') {
        setError('You cannot downgrade from Premium to Pro. Please contact support.');
        return;
      }
    }

    try {
      setPaymentStatus('loading');
      const response = await createCheckoutSession(plan as PlanType, billingCycle);
      
      if (response.success) {
        // Redirect to Stripe checkout
        window.location.href = response.data.sessionUrl;
      } else {
        setPaymentStatus('error');
        setError(response.message || 'Failed to create checkout session');
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      setPaymentStatus('error');
      setError(error.response?.data?.message || 'Failed to initiate payment. Please check your internet connection and try again.');
    }
  };

  const handleCancelSubscription = async () => {
    if (!userSubscription?.subscription) return;

    const isImmediate = window.confirm(
      'How would you like to cancel?\n\nOK = Cancel at end of billing period (recommended)\nCancel = Cancel immediately'
    );

    try {
      setPaymentStatus('loading');
      const response = await cancelSubscription(!isImmediate);
      
      if (response.success) {
        setPaymentStatus('success');
        const message = !isImmediate 
          ? 'Subscription will be canceled at the end of your billing period. You can reactivate anytime before then.'
          : 'Subscription canceled immediately. You can resubscribe anytime.';
        
        alert(message);
        await loadUserSubscription();
        setPaymentStatus('idle');
      } else {
        setPaymentStatus('error');
        setError(response.message || 'Failed to cancel subscription');
      }
    } catch (error: any) {
      console.error('Error canceling subscription:', error);
      setPaymentStatus('error');
      setError(error.response?.data?.message || 'Failed to cancel subscription. Please try again or contact support.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getPlanColor = (plan: PlanType) => {
    switch (plan) {
      case 'pro': return '#4a90e2';
      case 'premium': return '#f39c12';
      default: return '#6c757d';
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        {/* Loading Overlay */}
        {paymentStatus === 'loading' && (
          <div className="loading-overlay">
            <FiLoader className="spinner" />
            <p>Processing your request...</p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={() => setError('')} className="close-btn">×</button>
          </div>
        )}

        {/* Success Banner */}
        {paymentStatus === 'success' && (
          <div className="success-banner">
            <FiCheckCircle className="success-icon" />
            <p>Payment processed successfully!</p>
          </div>
        )}

        {/* Current Subscription Status */}
        {userSubscription && userSubscription.currentPlan !== 'free' && (
          <div className="current-subscription" style={{ borderColor: getPlanColor(userSubscription.currentPlan) }}>
            <div className="subscription-header">
              <div className="subscription-info">
                <h3 style={{ color: getPlanColor(userSubscription.currentPlan) }}>
                  Current Plan: {userSubscription.currentPlan.toUpperCase()}
                </h3>
                <div className="subscription-details">
                  <span className={`status-badge ${userSubscription.planStatus}`}>
                    {userSubscription.planStatus.toUpperCase()}
                  </span>
                  {userSubscription.subscription && (
                    <span className="billing-cycle">
                      {userSubscription.subscription.billingCycle}
                    </span>
                  )}
                </div>
              </div>
              <div className="subscription-actions">
                <button 
                  onClick={() => setShowSubscriptionDetails(!showSubscriptionDetails)}
                  className="details-btn"
                >
                  {showSubscriptionDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>

            {showSubscriptionDetails && userSubscription.subscription && (
              <div className="subscription-expanded">
                <div className="subscription-meta">
                  <div className="meta-item">
                    <FiCalendar className="meta-icon" />
                    <span>Next billing: {formatDate(userSubscription.subscription.currentPeriodEnd)}</span>
                  </div>
                  <div className="meta-item">
                    <FiCreditCard className="meta-icon" />
                    <span>Amount: {formatCurrency(userSubscription.subscription.amount)}</span>
                  </div>
                  <div className="meta-item">
                    <FiUser className="meta-icon" />
                    <span>
                      Subscriber limit: {userSubscription.planLimits.subscriberLimit === -1 ? 'Unlimited' : userSubscription.planLimits.subscriberLimit}
                    </span>
                  </div>
                </div>

                <div className="subscription-buttons">
                  <button 
                    onClick={() => {
                      setShowPaymentHistory(!showPaymentHistory);
                      if (!showPaymentHistory && paymentHistory.length === 0) {
                        loadPaymentHistory();
                      }
                    }}
                    className="history-btn"
                  >
                    Payment History
                  </button>
                  {!userSubscription.subscription.cancelAtPeriodEnd && (
                    <button 
                      onClick={handleCancelSubscription} 
                      className="cancel-button"
                      disabled={paymentStatus === 'loading'}
                    >
                      Cancel Subscription
                    </button>
                  )}
                  {userSubscription.subscription.cancelAtPeriodEnd && (
                    <div className="cancel-notice">
                      <span>⚠️ Subscription will end on {formatDate(userSubscription.subscription.currentPeriodEnd)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment History */}
        {showPaymentHistory && (
          <div className="payment-history">
            <h3>Payment History</h3>
            {paymentHistory.length > 0 ? (
              <div className="history-list">
                {paymentHistory.map((payment) => (
                  <div key={payment._id} className="history-item">
                    <div className="history-main">
                      <span className="history-plan">{payment.planType.toUpperCase()}</span>
                      <span className="history-cycle">({payment.billingCycle})</span>
                      <span className="history-amount">{formatCurrency(payment.amount)}</span>
                    </div>
                    <div className="history-meta">
                      <span className="history-date">{formatDate(payment.createdAt)}</span>
                      <span className={`history-status ${payment.paymentStatus}`}>
                        {payment.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-history">No payment history found.</p>
            )}
          </div>
        )}

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
          <div className={`pricing-card ${userSubscription?.currentPlan === 'free' ? 'current-plan' : ''}`}>
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
            <button 
              onClick={() => handlePlanSelect('free')} 
              className={`card-button free ${userSubscription?.currentPlan === 'free' ? 'current' : ''}`}
              disabled={paymentStatus === 'loading'}
            >
              {userSubscription?.currentPlan === 'free' ? 'Current Plan' : 'Get Started'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`pricing-card pro ${billingCycle === 'monthly' ? 'popular' : ''} ${userSubscription?.currentPlan === 'pro' ? 'current-plan' : ''}`}>
            {billingCycle === 'monthly' && !userSubscription && (
              <div className="badge">
                <FiStar className="badge-icon" /> Popular Plan
              </div>
            )}
            {userSubscription?.currentPlan === 'pro' && (
              <div className="badge current">
                <FiCheckCircle className="badge-icon" /> Current Plan
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
                  <span className="original-price">₹{pricingOptions.pro.annual.originalPrice}</span>
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
            <button 
              onClick={() => handlePlanSelect('pro')} 
              className={`card-button pro ${userSubscription?.currentPlan === 'pro' ? 'current' : ''} ${selectedPlan === 'pro' && paymentStatus === 'loading' ? 'loading' : ''}`}
              disabled={paymentStatus === 'loading' || userSubscription?.currentPlan === 'pro'}
            >
              {userSubscription?.currentPlan === 'pro' ? 'Current Plan' : 
               selectedPlan === 'pro' && paymentStatus === 'loading' ? 'Processing...' : 'Choose Pro'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className={`pricing-card premium ${billingCycle === 'annual' ? 'popular' : ''} ${userSubscription?.currentPlan === 'premium' ? 'current-plan' : ''}`}>
            {billingCycle === 'annual' && !userSubscription && (
              <div className="badge">
                <FiStar className="badge-icon" /> Popular Plan
              </div>
            )}
            {userSubscription?.currentPlan === 'premium' && (
              <div className="badge current">
                <FiCheckCircle className="badge-icon" /> Current Plan
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
                  <span className="original-price">₹{pricingOptions.premium.annual.originalPrice}</span>
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
            <button 
              onClick={() => handlePlanSelect('premium')} 
              className={`card-button premium ${userSubscription?.currentPlan === 'premium' ? 'current' : ''} ${selectedPlan === 'premium' && paymentStatus === 'loading' ? 'loading' : ''}`}
              disabled={paymentStatus === 'loading' || userSubscription?.currentPlan === 'premium'}
            >
              {userSubscription?.currentPlan === 'premium' ? 'Current Plan' : 
               selectedPlan === 'premium' && paymentStatus === 'loading' ? 'Processing...' : 'Choose Premium'}
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
                answer: "We accept all major credit cards, UPI, Google Pay, PhonePe, and other Indian payment methods through Stripe.",
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
            <button 
              onClick={() => handlePlanSelect('free')} 
              className="cta-button free"
              disabled={paymentStatus === 'loading'}
            >
              Start Free
            </button>
            <button
              onClick={() => handlePlanSelect(billingCycle === 'monthly' ? 'pro' : 'premium')}
              className="cta-button pro"
              disabled={paymentStatus === 'loading'}
            >
              {billingCycle === 'monthly' ? 'Get Pro' : 'Get Premium'}
            </button>
          </div>
        </section>

        <style >{`
          .page-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem 1rem;
          }

          .content-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
          }

          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            color: white;
            backdrop-filter: blur(5px);
          }

          .spinner {
            animation: spin 1s linear infinite;
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #4a90e2;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .error-banner {
            background: linear-gradient(135deg, #fee 0%, #fdd 100%);
            border: 2px solid #f5c6cb;
            color: #721c24;
            padding: 1rem 1.5rem;
            margin-bottom: 2rem;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 20px rgba(114, 28, 36, 0.1);
            font-weight: 500;
          }

          .error-banner .close-btn {
            background: none;
            border: none;
            color: #721c24;
            cursor: pointer;
            font-size: 1.5rem;
            padding: 0;
            font-weight: bold;
            transition: transform 0.2s;
          }

          .error-banner .close-btn:hover {
            transform: scale(1.1);
          }

          .success-banner {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            border: 2px solid #28a745;
            color: #155724;
            padding: 1rem 1.5rem;
            margin-bottom: 2rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 4px 20px rgba(40, 167, 69, 0.1);
            font-weight: 500;
          }

          .success-icon {
            font-size: 1.5rem;
            color: #28a745;
          }

          .current-subscription {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px solid #4a90e2;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 3rem;
            box-shadow: 0 8px 32px rgba(74, 144, 226, 0.1);
            transition: all 0.3s ease;
          }

          .current-subscription:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(74, 144, 226, 0.15);
          }

          .subscription-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
          }

          .subscription-info h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
            font-weight: 700;
          }

          .subscription-details {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }

          .status-badge.active {
            background: #28a745;
            color: white;
          }

          .status-badge.canceled {
            background: #dc3545;
            color: white;
          }

          .billing-cycle {
            background: #6c757d;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: capitalize;
          }

          .details-btn {
            background: #4a90e2;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;
          }

          .details-btn:hover {
            background: #357abd;
          }

          .subscription-expanded {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 2px solid #e9ecef;
          }

          .subscription-meta {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .meta-icon {
            color: #4a90e2;
            font-size: 1.1rem;
          }

          .subscription-buttons {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }

          .history-btn {
            background: #17a2b8;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;
          }

          .history-btn:hover {
            background: #138496;
          }

          .cancel-button {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: background 0.3s;
          }

          .cancel-button:hover {
            background: #c82333;
          }

          .cancel-button:disabled {
            background: #6c757d;
            cursor: not-allowed;
          }

          .cancel-notice {
            background: #fff3cd;
            color: #856404;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            border: 1px solid #ffeaa7;
            font-weight: 500;
          }

          .payment-history {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 3rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          .payment-history h3 {
            margin: 0 0 1.5rem 0;
            color: #333;
            font-size: 1.5rem;
          }

          .history-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            transition: all 0.3s;
          }

          .history-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
          }

          .history-main {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .history-plan {
            font-weight: 700;
            color: #4a90e2;
          }

          .history-cycle {
            color: #6c757d;
            font-size: 0.9rem;
          }

          .history-amount {
            font-weight: 600;
            color: #28a745;
          }

          .history-meta {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .history-date {
            color: #6c757d;
            font-size: 0.9rem;
          }

          .history-status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
          }

          .history-status.succeeded {
            background: #28a745;
            color: white;
          }

          .history-status.failed {
            background: #dc3545;
            color: white;
          }

          .history-status.pending {
            background: #ffc107;
            color: #212529;
          }

          .no-history {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 2rem;
          }

          .header {
            text-align: center;
            margin-bottom: 3rem;
            color: white;
          }

          .header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
            background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .header p {
            font-size: 1.2rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .billing-toggle {
            display: flex;
            justify-content: center;
            margin-bottom: 3rem;
            gap: 0;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.5rem;
            border-radius: 50px;
            backdrop-filter: blur(10px);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }

          .toggle-button {
            padding: 1rem 2rem;
            border: none;
            background: transparent;
            color: white;
            cursor: pointer;
            border-radius: 40px;
            font-weight: 600;
            transition: all 0.3s;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .toggle-button.active {
            background: white;
            color: #667eea;
            box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
          }

          .savings-badge {
            background: #28a745;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
          }

          .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
          }

          .pricing-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            transition: all 0.4s ease;
            position: relative;
            border: 3px solid transparent;
          }

          .pricing-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }

          .pricing-card.popular {
            border-color: #4a90e2;
            transform: scale(1.05);
          }

          .pricing-card.current-plan {
            border-color: #28a745;
            background: linear-gradient(135deg, #f8fff9 0%, #e6f7e6 100%);
          }

          .badge {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
          }

          .badge.current {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
          }

          .badge-icon {
            font-size: 1rem;
          }

          .card-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .card-header h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #333;
            font-weight: 700;
          }

          .price {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .price-icon {
            font-size: 2rem;
            color: #4a90e2;
          }

          .price-amount {
            font-size: 3rem;
            font-weight: 700;
            color: #333;
          }

          .price-period {
            font-size: 1.2rem;
            color: #6c757d;
          }

          .savings {
            text-align: center;
            margin-bottom: 1rem;
          }

          .original-price {
            text-decoration: line-through;
            color: #6c757d;
            margin-right: 0.5rem;
          }

          .savings-text {
            color: #28a745;
            font-weight: 600;
          }

          .card-description {
            color: #6c757d;
            font-size: 1.1rem;
            margin: 0;
          }

          .card-benefits {
            margin-bottom: 2rem;
          }

          .benefit {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f1f3f4;
          }

          .benefit:last-child {
            border-bottom: none;
          }

          .benefit-icon {
            font-size: 1.2rem;
          }

          .benefit-icon.included {
            color: #28a745;
          }

          .benefit-icon.excluded {
            color: #dc3545;
          }

          .benefit span {
            flex: 1;
            color: #333;
            font-weight: 500;
          }

          .benefit span.excluded {
            color: #6c757d;
            text-decoration: line-through;
          }

          .card-button {
            width: 100%;
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .card-button.free {
            background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
            color: white;
          }

          .card-button.free:hover {
            background: linear-gradient(135deg, #495057 0%, #343a40 100%);
            transform: translateY(-2px);
          }

          .card-button.pro {
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: white;
          }

          .card-button.pro:hover {
            background: linear-gradient(135deg, #357abd 0%, #2968a3 100%);
            transform: translateY(-2px);
          }

          .card-button.premium {
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            color: white;
          }

          .card-button.premium:hover {
            background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
            transform: translateY(-2px);
          }

          .card-button.current {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            cursor: default;
          }

          .card-button.current:hover {
            transform: none;
          }

          .card-button:disabled {
            background: #6c757d;
            cursor: not-allowed;
            transform: none;
          }

          .card-button.loading {
            background: #6c757d;
            cursor: wait;
          }

          .feature-comparison {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            margin-bottom: 4rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          }

          .feature-comparison h2 {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2.5rem;
            color: #333;
            font-weight: 700;
          }

          .table-container {
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }

          th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 2px solid #f1f3f4;
          }

          th {
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: white;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          th:first-child {
            border-radius: 12px 0 0 0;
          }

          th:last-child {
            border-radius: 0 12px 0 0;
          }

          td {
            color: #333;
            font-weight: 500;
          }

          tr:hover {
            background: #f8f9fa;
          }

          .testimonials {
            margin-bottom: 4rem;
          }

          .testimonials h2 {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2.5rem;
            color: white;
            font-weight: 700;
          }

          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }

          .testimonial-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          .testimonial-card:hover {
            transform: translateY(-5px);
          }

          .quote {
            font-size: 1.1rem;
            font-style: italic;
            margin-bottom: 1rem;
            color: #333;
            line-height: 1.6;
          }

          .author {
            font-weight: 600;
            color: #4a90e2;
            margin: 0;
          }
          .testimonial-card p:hover {
            font-weight: 600;
            color: #ffffffff;
            margin: 0;
          }

          .faq {
            margin-bottom: 4rem;
          }

          .faq h2 {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2.5rem;
            color: white;
            font-weight: 700;
          }

          .faq-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }

          .faq-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          .faq-card:hover {
            transform: translateY(-5px);
          }

          .faq-card h3 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 1.3rem;
          }

          .faq-card p {
            color: #6c757d;
            line-height: 1.6;
            margin: 0;
          }

          .cta {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 4rem 2rem;
            color: white;
          }

          .cta h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }

          .cta p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
          }

          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .cta-button {
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
            min-width: 150px;
          }

          .cta-button.free {
            background: white;
            color: #667eea;
          }

          .cta-button.free:hover {
            background: #f8f9fa;
            transform: translateY(-2px);
          }

          .cta-button.pro {
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            color: white;
          }

          .cta-button.pro:hover {
            background: linear-gradient(135deg, #357abd 0%, #2968a3 100%);
            transform: translateY(-2px);
          }

          .cta-button:disabled {
            background: #6c757d;
            cursor: not-allowed;
            transform: none;
          }

          @media (max-width: 768px) {
            .page-container {
              padding: 1rem;
            }

            .header h1 {
              font-size: 2rem;
            }

            .pricing-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .pricing-card.popular {
              transform: none;
            }

            .subscription-header {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
            }

            .subscription-buttons {
              flex-direction: column;
            }

            .billing-toggle {
              width: 100%;
              margin-left: 0;
              margin-right: 0;
            }

            .toggle-button {
              flex: 1;
            }

            .cta-buttons {
              flex-direction: column;
              align-items: center;
            }

            .history-item {
              flex-direction: column;
              align-items: stretch;
              gap: 1rem;
            }

            .history-main,
            .history-meta {
              justify-content: space-between;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Index;