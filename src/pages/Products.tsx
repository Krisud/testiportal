import React from 'react';
import { Shield, Cloud, Activity, HeadphonesIcon, Mail } from 'lucide-react';

const products = [
  {
    name: 'Enterprise EDR',
    description: 'Advanced endpoint detection and response solution with AI-powered threat hunting',
    price: 25,
    icon: Shield,
    features: ['Real-time threat detection', 'AI-powered analysis', 'Automated response', '24/7 monitoring'],
  },
  {
    name: 'Cloud Backup Pro',
    description: 'Secure cloud backup solution with unlimited storage and versioning',
    price: 15,
    icon: Cloud,
    features: ['Unlimited storage', 'Version history', 'End-to-end encryption', 'Automated backups'],
  },
  {
    name: 'Network Monitor Plus',
    description: 'Comprehensive network monitoring and analytics suite',
    price: 35,
    icon: Activity,
    features: ['Real-time monitoring', 'Performance analytics', 'Alert system', 'Custom reports'],
  },
  {
    name: 'IT Support 24/7',
    description: 'Round-the-clock IT support and maintenance service',
    price: 50,
    icon: HeadphonesIcon,
    features: ['24/7 support', 'Priority response', 'Remote assistance', 'On-site support'],
  },
  {
    name: 'Email Security Gateway',
    description: 'Advanced email protection with anti-phishing and encryption',
    price: 10,
    icon: Mail,
    features: ['Anti-phishing', 'Email encryption', 'Spam filtering', 'Data loss prevention'],
  },
];

export default function Products() {
  return (
    <div>
      <div className="relative h-48 mb-8 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000"
          alt="Products Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 flex items-center">
          <div className="px-8">
            <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
            <p className="text-blue-100">Explore our range of IT services</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const Icon = product.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                  <span className="text-gray-500">/endpoint/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}