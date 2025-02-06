import React from 'react';

export default function Users() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">User Management</h2>
          {/* User list will be implemented with real data */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 hover:bg-gray-50">
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">john@acme.com</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-700">Edit</button>
                <button className="text-red-600 hover:text-red-700">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}