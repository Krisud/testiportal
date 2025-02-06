import React from 'react';
import { CreditCard, Calendar, Download, DollarSign } from 'lucide-react';

const invoices = [
  { id: 'INV-001', date: '2024-02-01', amount: 2459, status: 'Paid' },
  { id: 'INV-002', date: '2024-01-01', amount: 2359, status: 'Paid' },
  { id: 'INV-003', date: '2023-12-01', amount: 2259, status: 'Paid' },
  { id: 'INV-004', date: '2023-11-01', amount: 2159, status: 'Paid' },
];

const services = [
  { name: 'Enterprise EDR', quantity: 50, price: 25 },
  { name: 'Cloud Backup Pro', quantity: 25, price: 15 },
  { name: 'Network Monitor Plus', quantity: 10, price: 35 },
  { name: 'IT Support 24/7', quantity: 1, price: 50 },
];

export default function Billing() {
  return (
    <div>
      <div className="relative h-48 mb-8 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
          alt="Billing Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-emerald-600/80 flex items-center">
          <div className="px-8">
            <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
            <p className="text-green-100">Manage your subscriptions and payments</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-6">Current Services</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.quantity} endpoints</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${service.price * service.quantity}</div>
                    <div className="text-sm text-gray-500">${service.price}/endpoint</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-6">Billing Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Next billing date</span>
                </div>
                <span className="font-medium">March 1, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Payment method</span>
                </div>
                <span className="font-medium">•••• 4242</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">Monthly total</span>
                </div>
                <span className="font-medium">$2,459.00</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Invoices</h2>
            <div className="space-y-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-sm text-gray-500">{invoice.date}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${invoice.amount}</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}