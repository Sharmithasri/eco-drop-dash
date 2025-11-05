import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, User, Phone, MapPin, Briefcase, AlertCircle, Sun, Database } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  name: string;
  phone: string;
  district: string;
  occupation: string;
  floodRisk: 'yes' | 'no' | '';
  solarPanels: 'yes' | 'no' | '';
  tankMaterial: 'plastic' | 'cement' | '';
  tankLocation: string;
  familySize: number;
  storageDays: number;
}

const UserForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    district: '',
    occupation: '',
    floodRisk: '',
    solarPanels: '',
    tankMaterial: '',
    tankLocation: '',
    familySize: 4,
    storageDays: 7,
  });

  const calculateCapacity = () => {
    return formData.familySize * 100 * formData.storageDays;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.district || !formData.tankMaterial) {
      toast.error('Please fill all required fields');
      return;
    }

    const capacity = calculateCapacity();
    localStorage.setItem('userFormData', JSON.stringify({ ...formData, capacity }));
    
    toast.success('Form submitted successfully!');
    navigate('/dashboard');
  };

  const tankLocationOptions = {
    plastic: ['frontPlastic', 'rooftopPlastic'],
    cement: ['frontCement', 'rooftopCement', 'undergroundCement'],
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full animate-droplet"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Droplets className="w-12 h-12 text-cyan-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('appName')}
            </h1>
          </div>
          <p className="text-cyan-700">{t('tagline')}</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto glass-card p-8 backdrop-blur-xl">
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-cyan-600" />
                <h3 className="text-xl font-semibold text-cyan-900">Personal Information</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-cyan-900">{t('name')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 bg-white/80 border-cyan-300 focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-cyan-900">{t('phone')} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 bg-white/80 border-cyan-300 focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="district" className="text-cyan-900">{t('district')} *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="mt-1 bg-white/80 border-cyan-300 focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="occupation" className="text-cyan-900">{t('occupation')}</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="mt-1 bg-white/80 border-cyan-300 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Questions */}
            <div className="space-y-4 p-6 rounded-xl bg-cyan-50/50 border border-cyan-200">
              <div>
                <Label className="text-cyan-900 flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  {t('floodRisk')}
                </Label>
                <RadioGroup
                  value={formData.floodRisk}
                  onValueChange={(value) => setFormData({ ...formData, floodRisk: value as 'yes' | 'no' })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="flood-yes" />
                    <Label htmlFor="flood-yes" className="cursor-pointer">{t('yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="flood-no" />
                    <Label htmlFor="flood-no" className="cursor-pointer">{t('no')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-cyan-900 flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4" />
                  {t('solarPanels')}
                </Label>
                <RadioGroup
                  value={formData.solarPanels}
                  onValueChange={(value) => setFormData({ ...formData, solarPanels: value as 'yes' | 'no' })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="solar-yes" />
                    <Label htmlFor="solar-yes" className="cursor-pointer">{t('yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="solar-no" />
                    <Label htmlFor="solar-no" className="cursor-pointer">{t('no')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Tank Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-cyan-600" />
                <h3 className="text-xl font-semibold text-cyan-900">Tank Configuration</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-cyan-900">{t('tankType')} *</Label>
                  <RadioGroup
                    value={formData.tankMaterial}
                    onValueChange={(value) => setFormData({ ...formData, tankMaterial: value as 'plastic' | 'cement', tankLocation: '' })}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plastic" id="plastic" />
                      <Label htmlFor="plastic" className="cursor-pointer">{t('plastic')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cement" id="cement" />
                      <Label htmlFor="cement" className="cursor-pointer">{t('cement')}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.tankMaterial && (
                  <div>
                    <Label className="text-cyan-900">Tank Location *</Label>
                    <Select
                      value={formData.tankLocation}
                      onValueChange={(value) => setFormData({ ...formData, tankLocation: value })}
                    >
                      <SelectTrigger className="mt-1 bg-white/80 border-cyan-300">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {tankLocationOptions[formData.tankMaterial].map((option) => (
                          <SelectItem key={option} value={option}>
                            {t(option)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="familySize" className="text-cyan-900">{t('familySize')}</Label>
                  <Input
                    id="familySize"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.familySize}
                    onChange={(e) => setFormData({ ...formData, familySize: parseInt(e.target.value) || 1 })}
                    className="mt-1 bg-white/80 border-cyan-300 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <Label className="text-cyan-900">{t('storageDays')}</Label>
                  <Select
                    value={formData.storageDays.toString()}
                    onValueChange={(value) => setFormData({ ...formData, storageDays: parseInt(value) })}
                  >
                    <SelectTrigger className="mt-1 bg-white/80 border-cyan-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="12">12 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Capacity Calculation */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white animate-float">
              <div className="text-center">
                <p className="text-lg mb-2">{t('recommendedCapacity')}</p>
                <p className="text-5xl font-bold mb-1">{calculateCapacity()}</p>
                <p className="text-xl">{t('liters')}</p>
                <p className="text-sm mt-3 opacity-90">
                  {formData.familySize} × 100L × {formData.storageDays} days
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white btn-glow ripple-effect"
            >
              {t('continue')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;