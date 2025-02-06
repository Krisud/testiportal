import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const customers = [
  {
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '+1-555-0123',
    address: '123 Tech Street, Silicon Valley, CA',
    activeServices: 5,
    monthlySpend: '$1,250',
  },
  {
    name: 'DataFlow Systems',
    email: 'info@dataflow.com',
    phone: '+1-555-0124',
    address: '456 Data Drive, Boston, MA',
    activeServices: 3,
    monthlySpend: '$875',
  },
  {
    name: 'CloudNine Industries',
    email: 'support@cloudnine.com',
    phone: '+1-555-0125',
    address: '789 Cloud Avenue, Seattle, WA',
    activeServices: 4,
    monthlySpend: '$1,100',
  },
  {
    name: 'SecureNet Ltd',
    email: 'contact@securenet.com',
    phone: '+1-555-0126',
    address: '321 Security Road, Austin, TX',
    activeServices: 2,
    monthlySpend: '$500',
  },
  {
    name: 'InnovateIT Group',
    email: 'hello@innovateit.com',
    phone: '+1-555-0127',
    address: '654 Innovation Blvd, New York, NY',
    activeServices: 6,
    monthlySpend: '$1,500',
  },
];

export default function Customers() {
  return (
    <div>
      <div className="relative h-48 mb-8 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000"
          alt="Customers Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 flex items-center">
          <div className="px-8">
            <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
            <p className="text-indigo-100">Manage your customer relationships</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Customer List</h2>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Add Customer
            </button>
          </div>
          
          <div className="space-y-6">
            {customers.map((customer, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{customer.name}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{customer.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Active Services</div>
                    <div className="font-semibold text-gray-900">{customer.activeServices}</div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">Monthly Spend</div>
                      <div className="font-semibold text-gray-900">{customer.monthlySpend}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}