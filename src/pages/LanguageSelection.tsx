import { useNavigate } from 'react-router-dom';
import { useLanguage, Language, languageNames, languageFlags } from '@/contexts/LanguageContext';
import { Droplets } from 'lucide-react';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { setLanguage, t } = useLanguage();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    navigate('/form');
  };

  const languages = Object.keys(languageNames) as Language[];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100">
      {/* Animated water droplets background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-droplet"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Wave animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 to-transparent animate-wave" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Logo and Header */}
        <div className="text-center mb-12 animate-float">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <Droplets className="w-20 h-20 text-cyan-500" />
              <div className="absolute inset-0 blur-xl bg-cyan-500/50" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
            {t('appName')}
          </h1>
          <p className="text-xl text-cyan-700 font-medium">{t('tagline')}</p>
        </div>

        {/* Language Selection Card */}
        <div className="glass-card p-8 w-full max-w-4xl backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-900">
            {t('selectLanguage')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className="group relative p-6 rounded-xl bg-white/80 hover:bg-white border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:scale-105 btn-glow"
              >
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {languageFlags[lang]}
                </div>
                <div className="text-sm font-medium text-cyan-900">
                  {languageNames[lang]}
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Floating indicators */}
        <div className="mt-8 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-cyan-500/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.7);
        }
      `}</style>
    </div>
  );
};

export default LanguageSelection;