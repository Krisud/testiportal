import React from 'react';

export default function News() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">News & Updates</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Updates</h2>
          {/* News list will be implemented with real data */}
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium">New Security Features Released</h3>
              <p className="text-sm text-gray-500 mt-1">
                We've added new security features to our EDR solution...
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">March 1, 2024</span>
                <button className="text-blue-600 hover:text-blue-700">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}