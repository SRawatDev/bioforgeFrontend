import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiStar, FiLoader } from 'react-icons/fi';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { API, callAPI, callAPIWithoutAuth } from '../../../utils/apicall.utils'
import { apiUrls } from '../../../utils/api.utils'
import './index.css'
type BillingCycle = 'monthly' | 'annual';

interface PaymentState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// API Service
const API_BASE_URL = 'https://bioforgebackend.onrender.com/api';

const PaymentService = {
  async createCheckoutSession(planData: any) {
    const response = await fetch(`${API_BASE_URL}/payment/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData),
    });
    
    const data = await response.json();
    if (!data.status) throw new Error(data.message);
    return data.data;
  },

  async getCheckoutSession(sessionId: string) {
    const response = await fetch(`${API_BASE_URL}/payment/checkout-session/${sessionId}`);
    const data = await response.json();
    if (!data.status) throw new Error(data.message);
    return data.data;
  }
};

const Index = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>({
    loading: false,
    error: null,
    success: false
  });
  const [customerEmail, setCustomerEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<{plan: string, cycle: BillingCycle} | null>(null);

  // Check for success/cancel from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, []);

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

  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      setPaymentState({ loading: true, error: null, success: false });
      const session = await PaymentService.getCheckoutSession(sessionId);
      
      if (session.paymentStatus === 'paid') {
        setPaymentState({ loading: false, error: null, success: true });
        setSelectedPlan(session.plan);
        
        // Clear URL params
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentState({ 
        loading: false, 
        error: 'Failed to verify payment. Please contact support.', 
        success: false 
      });
    }
  };

  const handlePlanSelect = (plan: string) => {
    if (plan === 'free') {
      setSelectedPlan(plan);
      console.log(`Selected plan: ${plan}`);
      return;
    }

    setPendingPlan({ plan, cycle: billingCycle });
    setShowEmailModal(true);
  };

  const handlePayment = async () => {
    if (!pendingPlan || !customerEmail.trim()) return;

    setPaymentState({ loading: true, error: null, success: false });
    
    try {
      const checkoutData = await PaymentService.createCheckoutSession({
        plan: pendingPlan.plan,
        billingCycle: pendingPlan.cycle,
        customerEmail: customerEmail,
        successUrl: `${window.location.origin}${window.location.pathname}?success=true`,
        cancelUrl: `${window.location.origin}${window.location.pathname}?canceled=true`,
      });

      // Redirect to Stripe Checkout
      window.location.href = checkoutData.url;
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentState({ 
        loading: false, 
        error: error.message || 'Failed to initiate payment. Please try again.', 
        success: false 
      });
    }
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (customerEmail.trim()) {
      setShowEmailModal(false);
      handlePayment();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Success Message */}
        {paymentState.success && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <FiCheck className="text-green-500 mr-2" />
              <p className="text-green-800">Payment successful! Welcome to your new plan.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {paymentState.error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <FiX className="text-red-500 mr-2" />
              <p className="text-red-800">{paymentState.error}</p>
              <button 
                onClick={() => setPaymentState({ ...paymentState, error: null })}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <FiX />
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {paymentState.loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex items-center space-x-4">
              <FiLoader className="animate-spin text-blue-500 text-2xl" />
              <p className="text-gray-900">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans for Every BioForge Creator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start for free or choose a plan tailored to your needs. Unlock powerful tools to grow your audience effortlessly.</p>
        </header>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-2 shadow-sm border">
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'annual', label: 'Annual' },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setBillingCycle(option.key as BillingCycle)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === option.key 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
                {option.key === 'annual' && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Save 17%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
              <div className="flex items-center justify-center mb-2">
                <MdOutlineCurrencyRupee className="text-3xl text-gray-600" />
                <span className="text-4xl font-bold text-gray-900">0</span>
                <span className="text-gray-600 ml-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="text-gray-600">Perfect for beginners</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {freeBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <benefit.icon className={`w-4 h-4 mr-3 ${benefit.included ? 'text-green-500' : 'text-gray-300'}`} />
                  <span className={`text-sm ${benefit.included ? 'text-gray-900' : 'text-gray-400'}`}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => handlePlanSelect('free')} 
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                selectedPlan === 'free' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {selectedPlan === 'free' ? 'Current Plan' : 'Get Started'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 border-2 relative ${billingCycle === 'monthly' ? 'border-blue-500' : 'border-gray-200'}`}>
            {billingCycle === 'monthly' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <FiStar className="w-4 h-4 mr-1" /> Popular Plan
                </div>
              </div>
            )}
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro</h2>
              <div className="flex items-center justify-center mb-2">
                <MdOutlineCurrencyRupee className="text-3xl text-gray-600" />
                <span className="text-4xl font-bold text-gray-900">{pricingOptions.pro[billingCycle].price}</span>
                <span className="text-gray-600 ml-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              {billingCycle === 'annual' && (
                <div className="text-center">
                  <span className="text-gray-400 line-through text-sm">${pricingOptions.pro.annual.originalPrice}</span>
                  <span className="text-green-600 text-sm ml-2 font-medium">{pricingOptions.pro.annual.savings}</span>
                </div>
              )}
              <p className="text-gray-600">For growing creators</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {proBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <benefit.icon className={`w-4 h-4 mr-3 ${benefit.included ? 'text-green-500' : 'text-gray-300'}`} />
                  <span className={`text-sm ${benefit.included ? 'text-gray-900' : 'text-gray-400'}`}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => handlePlanSelect('pro')} 
              disabled={paymentState.loading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                selectedPlan === 'pro' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {paymentState.loading && pendingPlan?.plan === 'pro' ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Processing...
                </>
              ) : selectedPlan === 'pro' ? (
                'Current Plan'
              ) : (
                'Choose Pro'
              )}
            </button>
          </div>

          {/* Premium Plan */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 border-2 relative ${billingCycle === 'annual' ? 'border-purple-500' : 'border-gray-200'}`}>
            {billingCycle === 'annual' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <FiStar className="w-4 h-4 mr-1" /> Popular Plan
                </div>
              </div>
            )}
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
              <div className="flex items-center justify-center mb-2">
                <MdOutlineCurrencyRupee className="text-3xl text-gray-600" />
                <span className="text-4xl font-bold text-gray-900">{pricingOptions.premium[billingCycle].price}</span>
                <span className="text-gray-600 ml-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              {billingCycle === 'annual' && (
                <div className="text-center">
                  <span className="text-gray-400 line-through text-sm">${pricingOptions.premium.annual.originalPrice}</span>
                  <span className="text-green-600 text-sm ml-2 font-medium">{pricingOptions.premium.annual.savings}</span>
                </div>
              )}
              <p className="text-gray-600">For professional creators</p>
            </div>
            
            <div className="space-y-3 mb-8">
              {premiumBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <benefit.icon className={`w-4 h-4 mr-3 ${benefit.included ? 'text-green-500' : 'text-gray-300'}`} />
                  <span className={`text-sm ${benefit.included ? 'text-gray-900' : 'text-gray-400'}`}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => handlePlanSelect('premium')} 
              disabled={paymentState.loading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                selectedPlan === 'premium' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {paymentState.loading && pendingPlan?.plan === 'premium' ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Processing...
                </>
              ) : selectedPlan === 'premium' ? (
                'Current Plan'
              ) : (
                'Choose Premium'
              )}
            </button>
          </div>
        </div>

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your Email</h3>
              <p className="text-gray-600 mb-6">We'll use this email for your subscription and receipts.</p>
              
              <div>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailModal(false);
                      setPendingPlan(null);
                      setCustomerEmail('');
                    }}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleEmailSubmit}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rest of the component (comparison table, testimonials, etc.) remains the same */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Compare Plans</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Pro</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: "Subscribers", free: "Up to 100", pro: "Up to 1,000", premium: "Unlimited" },
                    { feature: "Templates", free: "Basic", pro: "Premium", premium: "Premium + Custom" },
                    { feature: "Analytics", free: "Basic", pro: "Advanced", premium: "Advanced + Export" },
                    { feature: "Custom Domain", free: "✗", pro: "✓", premium: "✓" },
                    { feature: "Priority Support", free: "✗", pro: "✓", premium: "24/7" },
                    { feature: "Integrations", free: "Limited", pro: "Advanced", premium: "All" },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.free}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.pro}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;