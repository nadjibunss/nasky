import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Target, Weight, Ruler, UserCheck } from 'lucide-react';
import { useUserProfile, UserProfile } from '@/contexts/UserProfileContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UserProfileForm: React.FC = () => {
  const { setProfile } = useUserProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    primary_goal: undefined,
    weight_kg: 0,
    height_cm: 0,
    is_meat_eater: true,
    is_lactose_intolerant: false,
    allergies: [],
    eating_style: undefined,
    caffeine_consumption: undefined,
    sugar_consumption: undefined
  });

  const [allergyInput, setAllergyInput] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof UserProfile, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserProfile, string>> = {};

    if (!formData.primary_goal) newErrors.primary_goal = 'Silakan pilih tujuan utama Anda';
    if (!formData.weight_kg || formData.weight_kg <= 0) newErrors.weight_kg = 'Silakan masukkan berat badan yang valid';
    if (!formData.height_cm || formData.height_cm <= 0) newErrors.height_cm = 'Silakan masukkan tinggi badan yang valid';
    if (!formData.eating_style) newErrors.eating_style = 'Silakan pilih gaya makan';
    if (!formData.caffeine_consumption) newErrors.caffeine_consumption = 'Silakan pilih konsumsi kafein';
    if (!formData.sugar_consumption) newErrors.sugar_consumption = 'Silakan pilih konsumsi gula';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAllergy = () => {
    if (allergyInput.trim() && !formData.allergies?.includes(allergyInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...(prev.allergies || []), allergyInput.trim()]
      }));
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies?.filter((a) => a !== allergy) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Kesalahan Validasi Formulir",
        description: "Silakan isi semua bidang yang wajib diisi dengan benar.",
        variant: "destructive"
      });
      return;
    }

    const profile: UserProfile = {
      primary_goal: formData.primary_goal!,
      weight_kg: formData.weight_kg!,
      height_cm: formData.height_cm!,
      is_meat_eater: formData.is_meat_eater!,
      is_lactose_intolerant: formData.is_lactose_intolerant!,
      allergies: formData.allergies || [],
      eating_style: formData.eating_style!,
      caffeine_consumption: formData.caffeine_consumption!,
      sugar_consumption: formData.sugar_consumption!
    };

    console.log('Mengirimkan profil:', profile);
    setProfile(profile);

    toast({
      title: "Profil Disimpan!",
      description: "Profil kebugaran Anda telah berhasil disimpan."
    });

    navigate('/meal-planner');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-orange-500/20 shadow-2xl" data-id="dczcx4kyj" data-path="src/components/UserProfileForm.tsx">
      <CardHeader className="text-center" data-id="rvz57u6rl" data-path="src/components/UserProfileForm.tsx">
        <CardTitle className="text-3xl font-bold text-white flex items-center justify-center space-x-2" data-id="qgbyohpq7" data-path="src/components/UserProfileForm.tsx">
          <UserCheck className="h-8 w-8 text-orange-500" data-id="8wefzrkyk" data-path="src/components/UserProfileForm.tsx" />
          <span data-id="5rxuhgosu" data-path="src/components/UserProfileForm.tsx">Profil Kebugaran Anda</span>
        </CardTitle>
        <CardDescription className="text-gray-300 text-lg" data-id="emwnoz85o" data-path="src/components/UserProfileForm.tsx">
          Beri tahu kami tentang diri Anda untuk mendapatkan rencana latihan dan makan yang dipersonalisasi
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6" data-id="kuwj6mcjc" data-path="src/components/UserProfileForm.tsx">
        <form onSubmit={handleSubmit} className="space-y-6" data-id="y63a2ji95" data-path="src/components/UserProfileForm.tsx">
          {/* Primary Goal */}
          <div className="space-y-2" data-id="0xjx4co29" data-path="src/components/UserProfileForm.tsx">
            <Label className="text-white flex items-center space-x-2" data-id="k72j2qg3e" data-path="src/components/UserProfileForm.tsx">
              <Target className="h-4 w-4 text-orange-500" data-id="1e5ltbuiw" data-path="src/components/UserProfileForm.tsx" />
              <span data-id="lqi489ulj" data-path="src/components/UserProfileForm.tsx">Tujuan Utama *</span>
            </Label>
            <Select
              value={formData.primary_goal}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, primary_goal: value as UserProfile['primary_goal'] }))} data-id="zvycrr2hy" data-path="src/components/UserProfileForm.tsx">

              <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-id="gn3xcm0uv" data-path="src/components/UserProfileForm.tsx">
                <SelectValue placeholder="Pilih tujuan utama Anda" data-id="mbdnc9jeu" data-path="src/components/UserProfileForm.tsx" />
              </SelectTrigger>
              <SelectContent data-id="d2wuos4ss" data-path="src/components/UserProfileForm.tsx">
                <SelectItem value="Build muscle" data-id="ykhuk2bvp" data-path="src/components/UserProfileForm.tsx">Membentuk Otot</SelectItem>
                <SelectItem value="Lose weight" data-id="fdmtm7e44" data-path="src/components/UserProfileForm.tsx">Menurunkan Berat Badan</SelectItem>
                <SelectItem value="Eat healthier" data-id="jzb3uncx6" data-path="src/components/UserProfileForm.tsx">Makan Lebih Sehat</SelectItem>
              </SelectContent>
            </Select>
            {errors.primary_goal && <p className="text-red-400 text-sm" data-id="qfgp91hs0" data-path="src/components/UserProfileForm.tsx">{errors.primary_goal}</p>}
          </div>

          {/* Weight and Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="1w68htfkh" data-path="src/components/UserProfileForm.tsx">
            <div className="space-y-2" data-id="62cqaoq8q" data-path="src/components/UserProfileForm.tsx">
              <Label className="text-white flex items-center space-x-2" data-id="v0m6sabeb" data-path="src/components/UserProfileForm.tsx">
                <Weight className="h-4 w-4 text-orange-500" data-id="rm93613vh" data-path="src/components/UserProfileForm.tsx" />
                <span data-id="icf7a17kl" data-path="src/components/UserProfileForm.tsx">Berat (kg) *</span>
              </Label>
              <Input
                type="number"
                value={formData.weight_kg || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, weight_kg: parseFloat(e.target.value) || 0 }))}
                placeholder="70"
                className="bg-gray-800 border-gray-600 text-white" data-id="b62qbzqtb" data-path="src/components/UserProfileForm.tsx" />

              {errors.weight_kg && <p className="text-red-400 text-sm" data-id="fvdbc375m" data-path="src/components/UserProfileForm.tsx">{errors.weight_kg}</p>}
            </div>
            
            <div className="space-y-2" data-id="27h80hb0q" data-path="src/components/UserProfileForm.tsx">
              <Label className="text-white flex items-center space-x-2" data-id="81nugnnw4" data-path="src/components/UserProfileForm.tsx">
                <Ruler className="h-4 w-4 text-orange-500" data-id="fltihwa6b" data-path="src/components/UserProfileForm.tsx" />
                <span data-id="r0gz7hkke" data-path="src/components/UserProfileForm.tsx">Tinggi (cm) *</span>
              </Label>
              <Input
                type="number"
                value={formData.height_cm || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, height_cm: parseFloat(e.target.value) || 0 }))}
                placeholder="175"
                className="bg-gray-800 border-gray-600 text-white" data-id="m8bgaan9u" data-path="src/components/UserProfileForm.tsx" />

              {errors.height_cm && <p className="text-red-400 text-sm" data-id="wgr75b7uy" data-path="src/components/UserProfileForm.tsx">{errors.height_cm}</p>}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="space-y-4" data-id="qezf8djz1" data-path="src/components/UserProfileForm.tsx">
            <h3 className="text-lg font-semibold text-white" data-id="ravz8n4gu" data-path="src/components/UserProfileForm.tsx">Preferensi Diet</h3>
            
            <div className="flex items-center space-x-2" data-id="w8rynuxqg" data-path="src/components/UserProfileForm.tsx">
              <Checkbox
                id="meat_eater"
                checked={formData.is_meat_eater}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_meat_eater: checked as boolean }))} data-id="9ej8iw1uo" data-path="src/components/UserProfileForm.tsx" />

              <Label htmlFor="meat_eater" className="text-white" data-id="56ers7u9r" data-path="src/components/UserProfileForm.tsx">Saya makan daging</Label>
            </div>
            
            <div className="flex items-center space-x-2" data-id="fugw36zeb" data-path="src/components/UserProfileForm.tsx">
              <Checkbox
                id="lactose_intolerant"
                checked={formData.is_lactose_intolerant}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_lactose_intolerant: checked as boolean }))} data-id="zj7szz9z3" data-path="src/components/UserProfileForm.tsx" />

              <Label htmlFor="lactose_intolerant" className="text-white" data-id="zg13p4a84" data-path="src/components/UserProfileForm.tsx">Saya intoleran laktosa</Label>
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-2" data-id="v1f7c8idf" data-path="src/components/UserProfileForm.tsx">
            <Label className="text-white" data-id="za2n9txmf" data-path="src/components/UserProfileForm.tsx">Alergi</Label>
            <div className="flex space-x-2" data-id="6u6whegzl" data-path="src/components/UserProfileForm.tsx">
              <Input
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                placeholder="Masukkan alergi"
                className="bg-gray-800 border-gray-600 text-white flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())} data-id="lnnuimkm8" data-path="src/components/UserProfileForm.tsx" />

              <Button type="button" onClick={addAllergy} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white" data-id="6a7smlbpp" data-path="src/components/UserProfileForm.tsx">
                Tambah
              </Button>
            </div>
            {formData.allergies && formData.allergies.length > 0 &&
            <div className="flex flex-wrap gap-2 mt-2" data-id="sadm49yhg" data-path="src/components/UserProfileForm.tsx">
                {formData.allergies.map((allergy) =>
              <Badge key={allergy} variant="secondary" className="bg-orange-600 text-white" data-id="nj75mkacu" data-path="src/components/UserProfileForm.tsx">
                    {allergy}
                    <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => removeAllergy(allergy)} data-id="whe6ucz3v" data-path="src/components/UserProfileForm.tsx" />

                  </Badge>
              )}
              </div>
            }
          </div>

          {/* Eating Style */}
          <div className="space-y-2" data-id="c4cg8jvr0" data-path="src/components/UserProfileForm.tsx">
            <Label className="text-white" data-id="dluidwzxp" data-path="src/components/UserProfileForm.tsx">Gaya Makan *</Label>
            <Select
              value={formData.eating_style}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, eating_style: value as UserProfile['eating_style'] }))} data-id="qmt5mmszc" data-path="src/components/UserProfileForm.tsx">

              <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-id="29dm433a6" data-path="src/components/UserProfileForm.tsx">
                <SelectValue placeholder="Pilih gaya makan Anda" data-id="7ir1vti78" data-path="src/components/UserProfileForm.tsx" />
              </SelectTrigger>
              <SelectContent data-id="c66akzqz7" data-path="src/components/UserProfileForm.tsx">
                <SelectItem value="Vegan" data-id="x1yspqm37" data-path="src/components/UserProfileForm.tsx">Vegan</SelectItem>
                <SelectItem value="Vegetarian" data-id="nga2q910t" data-path="src/components/UserProfileForm.tsx">Vegetarian</SelectItem>
                <SelectItem value="Keto" data-id="qyrx76e1z" data-path="src/components/UserProfileForm.tsx">Keto</SelectItem>
                <SelectItem value="Paleo" data-id="q1u0s7oyx" data-path="src/components/UserProfileForm.tsx">Paleo</SelectItem>
                <SelectItem value="Balanced" data-id="79mio0fbd" data-path="src/components/UserProfileForm.tsx">Seimbang</SelectItem>
                <SelectItem value="None" data-id="tib7a524w" data-path="src/components/UserProfileForm.tsx">Tidak Ada</SelectItem>
              </SelectContent>
            </Select>
            {errors.eating_style && <p className="text-red-400 text-sm" data-id="m1r1qx8ar" data-path="src/components/UserProfileForm.tsx">{errors.eating_style}</p>}
          </div>

          {/* Consumption Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="z97usnbrq" data-path="src/components/UserProfileForm.tsx">
            <div className="space-y-2" data-id="584ln73wg" data-path="src/components/UserProfileForm.tsx">
              <Label className="text-white" data-id="gchb4smsi" data-path="src/components/UserProfileForm.tsx">Konsumsi Kafein *</Label>
              <Select
                value={formData.caffeine_consumption}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, caffeine_consumption: value as UserProfile['caffeine_consumption'] }))} data-id="hzzi7sp6m" data-path="src/components/UserProfileForm.tsx">

                <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-id="4et9r9zlw" data-path="src/components/UserProfileForm.tsx">
                  <SelectValue placeholder="Pilih" data-id="fei1xvcn6" data-path="src/components/UserProfileForm.tsx" />
                </SelectTrigger>
                <SelectContent data-id="kaxflgvwf" data-path="src/components/UserProfileForm.tsx">
                  <SelectItem value="None" data-id="d317ukmtg" data-path="src/components/UserProfileForm.tsx">Tidak Ada</SelectItem>
                  <SelectItem value="Occasionally" data-id="hq6kzn946" data-path="src/components/UserProfileForm.tsx">Kadang-kadang</SelectItem>
                  <SelectItem value="Regularly" data-id="7jq509my6" data-path="src/components/UserProfileForm.tsx">Secara teratur</SelectItem>
                </SelectContent>
              </Select>
              {errors.caffeine_consumption && <p className="text-red-400 text-sm" data-id="eazt0no2u" data-path="src/components/UserProfileForm.tsx">{errors.caffeine_consumption}</p>}
            </div>
            
            <div className="space-y-2" data-id="ij9j4ig7t" data-path="src/components/UserProfileForm.tsx">
              <Label className="text-white" data-id="w0kxkd20h" data-path="src/components/UserProfileForm.tsx">Konsumsi Gula *</Label>
              <Select
                value={formData.sugar_consumption}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, sugar_consumption: value as UserProfile['sugar_consumption'] }))} data-id="w0bfa0esk" data-path="src/components/UserProfileForm.tsx">

                <SelectTrigger className="bg-gray-800 border-gray-600 text-white" data-id="5t7x96vrs" data-path="src/components/UserProfileForm.tsx">
                  <SelectValue placeholder="Pilih" data-id="6nezqojvu" data-path="src/components/UserProfileForm.tsx" />
                </SelectTrigger>
                <SelectContent data-id="97l4y26uj" data-path="src/components/UserProfileForm.tsx">
                  <SelectItem value="None" data-id="yqeb9e9jx" data-path="src/components/UserProfileForm.tsx">Tidak Ada</SelectItem>
                  <SelectItem value="Occasionally" data-id="xlarqiuk7" data-path="src/components/UserProfileForm.tsx">Kadang-kadang</SelectItem>
                  <SelectItem value="Regularly" data-id="psiwdz8a2" data-path="src/components/UserProfileForm.tsx">Secara teratur</SelectItem>
                </SelectContent>
              </Select>
              {errors.sugar_consumption && <p className="text-red-400 text-sm" data-id="hn9flxohu" data-path="src/components/UserProfileForm.tsx">{errors.sugar_consumption}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            size="lg" data-id="tyrh2zkt1" data-path="src/components/UserProfileForm.tsx">

            Simpan Profil & Lanjutkan
          </Button>
        </form>
      </CardContent>
    </Card>);

};

export default UserProfileForm;