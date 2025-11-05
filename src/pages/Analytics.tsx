import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Droplets, TrendingUp, Gauge, Activity } from 'lucide-react';

const Analytics = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const userData = JSON.parse(localStorage.getItem('userFormData') || '{}');
  const capacity = userData.capacity || 3500;

  const stats = {
    totalCollected: 12450,
    totalReused: 8320,
    waterSaved: 2150,
    rechargePit: 35,
    tankEfficiency: 89,
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent animate-wave" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="icon"
              className="rounded-full border-cyan-300 hover:bg-cyan-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {t('analytics')}
              </h1>
              <p className="text-sm text-cyan-700">Smart Water Management Insights</p>
            </div>
          </div>
          <Droplets className="w-10 h-10 text-cyan-500" />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Collected */}
          <div className="glass-card p-6 backdrop-blur-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="w-10 h-10 text-cyan-500" />
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm text-cyan-700 mb-1">{t('totalCollected')}</p>
            <p className="text-4xl font-bold text-cyan-900 mb-1">{stats.totalCollected}</p>
            <p className="text-sm text-cyan-600">{t('liters')}</p>
          </div>

          {/* Total Reused */}
          <div className="glass-card p-6 backdrop-blur-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-10 h-10 text-blue-500" />
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm text-cyan-700 mb-1">{t('totalReused')}</p>
            <p className="text-4xl font-bold text-cyan-900 mb-1">{stats.totalReused}</p>
            <p className="text-sm text-cyan-600">{t('liters')}</p>
          </div>

          {/* Water Saved */}
          <div className="glass-card p-6 backdrop-blur-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-green-500" />
              <span className="text-green-600 text-sm font-semibold">+18%</span>
            </div>
            <p className="text-sm text-cyan-700 mb-1">{t('waterSaved')}</p>
            <p className="text-4xl font-bold text-cyan-900 mb-1">{stats.waterSaved}</p>
            <p className="text-sm text-cyan-600">{t('liters')}</p>
          </div>

          {/* Recharge Pit */}
          <div className="glass-card p-6 backdrop-blur-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Gauge className="w-10 h-10 text-teal-500" />
            </div>
            <p className="text-sm text-cyan-700 mb-1">{t('rechargePit')}</p>
            <p className="text-4xl font-bold text-cyan-900 mb-1">{stats.rechargePit}%</p>
            <div className="w-full bg-cyan-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats.rechargePit}%` }}
              />
            </div>
          </div>

          {/* Tank Efficiency */}
          <div className="glass-card p-6 backdrop-blur-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-10 h-10 text-cyan-500" />
              <span className="text-green-600 text-sm font-semibold">Excellent</span>
            </div>
            <p className="text-sm text-cyan-700 mb-1">{t('tankEfficiency')}</p>
            <p className="text-4xl font-bold text-cyan-900 mb-1">{stats.tankEfficiency}%</p>
            <div className="w-full bg-cyan-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats.tankEfficiency}%` }}
              />
            </div>
          </div>

          {/* System Capacity */}
          <div className="glass-card p-6 backdrop-blur-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="w-10 h-10 text-blue-500" />
            </div>
            <p className="text-sm text-cyan-700 mb-1">System Capacity</p>
            <p className="text-4xl font-bold text-cyan-900 mb-1">{capacity}</p>
            <p className="text-sm text-cyan-600">{t('liters')}</p>
          </div>
        </div>

        {/* Daily Rainfall Tracker */}
        <div className="glass-card p-6 backdrop-blur-xl mb-6">
          <h3 className="text-xl font-semibold text-cyan-900 mb-4">{t('dailyRainfall')}</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const rainfall = [12, 8, 15, 20, 5, 18, 10][index];
              return (
                <div key={day} className="text-center">
                  <div
                    className="bg-gradient-to-t from-cyan-500 to-blue-400 rounded-lg mb-2 transition-all hover:scale-110"
                    style={{ height: `${rainfall * 8}px` }}
                  />
                  <p className="text-xs text-cyan-700">{day}</p>
                  <p className="text-xs font-semibold text-cyan-900">{rainfall}mm</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tank Level History */}
        <div className="glass-card p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-cyan-900 mb-4">{t('tankHistory')}</h3>
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(200, 100%, 65%)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(180, 80%, 50%)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M 0 150 L 100 120 L 200 100 L 300 80 L 400 90 L 500 70 L 600 85 L 700 65 L 800 75 L 800 200 L 0 200 Z"
                fill="url(#gradient)"
                className="animate-pulse"
              />
              <path
                d="M 0 150 L 100 120 L 200 100 L 300 80 L 400 90 L 500 70 L 600 85 L 700 65 L 800 75"
                fill="none"
                stroke="hsl(200, 100%, 45%)"
                strokeWidth="3"
              />
              {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x, i) => {
                const y = [150, 120, 100, 80, 90, 70, 85, 65, 75][i];
                return (
                  <circle
                    key={x}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="hsl(200, 100%, 45%)"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          </div>
          <div className="flex justify-between mt-4 text-xs text-cyan-700">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mt-6 glass-card p-6 backdrop-blur-xl bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-900 mb-2">Environmental Impact</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-3xl font-bold text-green-700">{Math.round(stats.waterSaved / 1000)}k</p>
                <p className="text-sm text-green-600">Liters Saved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700">2.1</p>
                <p className="text-sm text-green-600">Tons CO₂ Reduced</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700">45</p>
                <p className="text-sm text-green-600">Trees Equivalent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;