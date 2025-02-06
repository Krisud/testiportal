import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Package, CreditCard, Bell, AlertCircle } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  priority: 'low' | 'medium' | 'high';
}

export default function Dashboard() {
  const { isAdmin } = useAuthStore();
  const [stats, setStats] = useState({
    activeServices: 0,
    monthlyRevenue: 0,
    activeCustomers: 0,
    supportTickets: 0,
  });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch dashboard statistics
      const { data: contractsData } = await supabase
        .from('contracts')
        .select('*')
        .eq('status', 'active');

      const { data: customersData } = await supabase
        .from('companies')
        .select('id');

      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (contractsData) {
        setStats({
          activeServices: contractsData.length,
          monthlyRevenue: contractsData.reduce((acc, contract) => acc + (contract.quantity * 25), 0),
          activeCustomers: customersData?.length || 0,
          supportTickets: Math.floor(Math.random() * 20), // Example data
        });
      }

      if (newsData) {
        setNews(newsData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="relative h-48 mb-8 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
          alt="Dashboard Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 flex items-center">
          <div className="px-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-blue-100">Monitor and manage your IT services</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Active Services</h3>
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeServices}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
            <CreditCard className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">${stats.monthlyRevenue}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 8% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Active Customers</h3>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeCustomers}</p>
          <div className="mt-2 text-green-600 text-sm">↑ 4% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium">Support Tickets</h3>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.supportTickets}</p>
          <div className="mt-2 text-red-600 text-sm">↓ 2% from last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: 'Jan', revenue: 4000 },
                  { month: 'Feb', revenue: 3000 },
                  { month: 'Mar', revenue: 5000 },
                  { month: 'Apr', revenue: 4500 },
                  { month: 'May', revenue: 6000 },
                  { month: 'Jun', revenue: 5500 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Latest Updates</h2>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.content}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {new Date(item.created_at).toLocaleDateString()}
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