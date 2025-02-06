import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, AlertCircle, Bell } from 'lucide-react';

interface Service {
  name: string;
  usage: number;
  limit: number;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  priority: 'low' | 'medium' | 'high';
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const [services, setServices] = useState<Service[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch active services
      const { data: contractsData } = await supabase
        .from('contracts')
        .select(`
          id,
          quantity,
          products (
            name,
            type
          )
        `)
        .eq('status', 'active');

      if (contractsData) {
        const servicesData = contractsData.map(contract => ({
          name: contract.products.name,
          usage: contract.quantity,
          limit: contract.quantity + 10, // Example limit
        }));
        setServices(servicesData);
      }

      // Fetch latest news
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (newsData) {
        setNews(newsData);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

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
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100">Here's an overview of your services</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Service Usage</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium">{service.name}</h3>
                    </div>
                    <span className="text-sm text-gray-500">
                      {service.usage} / {service.limit} licenses
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{
                        width: `${(service.usage / service.limit) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
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

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Usage Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={services}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}