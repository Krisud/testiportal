import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function Help() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-gray-500" />
              <span>support@company.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-gray-500" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">User Guide</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">FAQs</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Service Status</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}