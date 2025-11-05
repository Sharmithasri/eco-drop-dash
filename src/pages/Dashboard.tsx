import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Droplets, Cloud, Thermometer, Droplet, ArrowDownToLine, ArrowUpFromLine, Sun, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [mainTankLevel, setMainTankLevel] = useState(65);
  const [rainTankLevel, setRainTankLevel] = useState(80);
  const [isTransferring, setIsTransferring] = useState(false);

  const userData = JSON.parse(localStorage.getItem('userFormData') || '{}');
  const hasSolar = userData.solarPanels === 'yes';

  const handleTransferToPit = () => {
    if (rainTankLevel < 20) {
      toast.error('Insufficient water in rainwater tank');
      return;
    }
    
    setIsTransferring(true);
    toast.success('Transferring water to recharge pit...');
    
    setTimeout(() => {
      setRainTankLevel(prev => Math.max(0, prev - 20));
      setIsTransferring(false);
      toast.success('Water transferred successfully!');
    }, 2000);
  };

  const handleTransferToMain = () => {
    if (rainTankLevel < 15) {
      toast.error('Insufficient water in rainwater tank');
      return;
    }
    
    setIsTransferring(true);
    toast.success('Transferring water to main tank...');
    
    setTimeout(() => {
      setRainTankLevel(prev => Math.max(0, prev - 15));
      setMainTankLevel(prev => Math.min(100, prev + 15));
      setIsTransferring(false);
      toast.success('Water transferred successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent animate-wave" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Droplets className="w-10 h-10 text-cyan-500" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {t('appName')}
              </h1>
              <p className="text-sm text-cyan-700">{t('tagline')}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/analytics')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white btn-glow"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {t('analytics')}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Main Tank */}
          <div className="glass-card p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-cyan-900 mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              {t('mainTank')}
            </h3>
            
            <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-b from-cyan-100 to-white border-2 border-cyan-300">
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                style={{
                  height: `${mainTankLevel}%`,
                  background: 'linear-gradient(180deg, hsl(200 100% 45%), hsl(190 100% 35%))',
                }}
              >
                <div className="absolute inset-0 animate-wave opacity-50" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                  <p className="text-5xl font-bold text-cyan-900 drop-shadow-lg">{mainTankLevel}%</p>
                  <p className="text-lg text-cyan-700 drop-shadow">
                    {Math.round((mainTankLevel / 100) * (userData.capacity || 3500))} L
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rainwater Tank */}
          <div className="glass-card p-6 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-cyan-900 mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              {t('rainwaterTank')}
            </h3>
            
            <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-b from-sky-100 to-white border-2 border-cyan-300">
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                style={{
                  height: `${rainTankLevel}%`,
                  background: 'linear-gradient(180deg, hsl(200 100% 65%), hsl(180 80% 50%))',
                }}
              >
                <div className="absolute inset-0 animate-wave opacity-50" />
                {/* Animated droplets */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/50 rounded-full animate-droplet"
                    style={{
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                  <p className="text-5xl font-bold text-cyan-900 drop-shadow-lg">{rainTankLevel}%</p>
                  <p className="text-lg text-cyan-700 drop-shadow">
                    {Math.round((rainTankLevel / 100) * (userData.capacity || 3500))} L
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Button
            onClick={handleTransferToPit}
            disabled={isTransferring}
            className="h-16 text-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white btn-glow"
          >
            <ArrowDownToLine className="w-5 h-5 mr-2" />
            {t('transferToPit')}
          </Button>
          
          <Button
            onClick={handleTransferToMain}
            disabled={isTransferring}
            className="h-16 text-lg bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white btn-glow"
          >
            <ArrowUpFromLine className="w-5 h-5 mr-2" />
            {t('transferToMain')}
          </Button>
        </div>

        {/* Weather & Status Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-6 backdrop-blur-xl text-center">
            <Thermometer className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-sm text-cyan-700">{t('temperature')}</p>
            <p className="text-2xl font-bold text-cyan-900">28°C</p>
          </div>

          <div className="glass-card p-6 backdrop-blur-xl text-center">
            <Droplet className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-cyan-700">{t('humidity')}</p>
            <p className="text-2xl font-bold text-cyan-900">65%</p>
          </div>

          <div className="glass-card p-6 backdrop-blur-xl text-center">
            <Cloud className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
            <p className="text-sm text-cyan-700">{t('rainfall')}</p>
            <p className="text-2xl font-bold text-cyan-900">40%</p>
          </div>
        </div>

        {/* Water Quality */}
        <div className="glass-card p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-cyan-900">{t('waterQuality')}</h3>
            <span className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold">
              {t('good')}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-cyan-700">{t('phLevel')}</span>
              <span className="text-cyan-900 font-semibold">7.2</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-cyan-700">{t('refillTime')}</span>
              <span className="text-cyan-900 font-semibold">
                {Math.round((100 - rainTankLevel) * 0.3)} {t('hours')}
              </span>
            </div>
          </div>
        </div>

        {/* Solar Status */}
        {hasSolar && (
          <div className="mt-6 glass-card p-6 backdrop-blur-xl bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sun className="w-12 h-12 text-yellow-500 animate-float" />
                <div className="absolute inset-0 blur-xl bg-yellow-500/30" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">Solar Panel Active</h3>
                <p className="text-sm text-yellow-700">System powered by renewable energy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;