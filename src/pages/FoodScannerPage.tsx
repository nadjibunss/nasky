import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Camera,
  Upload,
  X,
  Flame,
  Apple,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Utensils } from
'lucide-react';
import { useFoodScan } from '@/contexts/FoodScanContext';
import { foodScanService } from '@/services/apiService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

const FoodScannerPage: React.FC = () => {
  const { scanResult, setScanResult, isLoading, setIsLoading } = useFoodScan();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Jenis File Tidak Valid",
        description: "Silakan pilih file gambar (JPG, PNG, dll.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {// 10MB limit
      toast({
        title: "File Terlalu Besar",
        description: "Silakan pilih gambar yang lebih kecil dari 10MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Scan the food
    scanFood(file);
  };

  const scanFood = async (file: File) => {
    setIsLoading(true);

    try {
      console.log('Scanning food image:', file.name);
      const analysis = await foodScanService.scanFood(file);

      const result = {
        image: previewImage || URL.createObjectURL(file),
        analysis
      };

      setScanResult(result);

      toast({
        title: "Makanan Berhasil Dipindai!",
        description: "Analisis makanan Anda sudah siap. Gulir ke bawah untuk melihat hasilnya."
      });
    } catch (error) {
      console.error('Error scanning food:', error);
      toast({
        title: "Pemindaian Gagal",
        description: "Gagal menganalisis gambar makanan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const clearResults = () => {
    setScanResult(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getMacroPercentage = (macro: number) => {
    if (!scanResult) return 0;
    const { protein, carbs, fat } = scanResult.analysis.nutrition;
    const total = protein + carbs + fat;
    return total > 0 ? macro / total * 100 : 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" data-id="r1awtz7wj" data-path="src/pages/FoodScannerPage.tsx">
        <LoadingSpinner size="lg" text="Menganalisis gambar makanan Anda..." data-id="np47s7ir1" data-path="src/pages/FoodScannerPage.tsx" />
      </div>);

  }

  return (
    <div className="space-y-8" data-id="qlxr7mkod" data-path="src/pages/FoodScannerPage.tsx">
      {/* Header */}
      <div className="text-center space-y-4" data-id="w3o8vbaz4" data-path="src/pages/FoodScannerPage.tsx">
        <h1 className="text-4xl md:text-5xl font-bold text-white" data-id="d9mercwny" data-path="src/pages/FoodScannerPage.tsx">
          Pemindai Makanan{' '}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent" data-id="fbftf7kr7" data-path="src/pages/FoodScannerPage.tsx">
            AI
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-id="tg8lrcaf7" data-path="src/pages/FoodScannerPage.tsx">
          Unggah atau ambil foto makanan Anda untuk mendapatkan analisis nutrisi dan wawasan kesehatan instan.
        </p>
      </div>

      {/* Upload Section */}
      {!scanResult &&
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/20 max-w-2xl mx-auto" data-id="rywgigzut" data-path="src/pages/FoodScannerPage.tsx">
          <CardHeader className="text-center" data-id="1h583uw8d" data-path="src/pages/FoodScannerPage.tsx">
            <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2" data-id="jyc329gjq" data-path="src/pages/FoodScannerPage.tsx">
              <Camera className="h-6 w-6 text-purple-500" data-id="1zai476hq" data-path="src/pages/FoodScannerPage.tsx" />
              <span data-id="yuozpnxsp" data-path="src/pages/FoodScannerPage.tsx">Pindai Makanan Anda</span>
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg" data-id="y0s13lpee" data-path="src/pages/FoodScannerPage.tsx">
              Seret dan lepas gambar atau klik untuk mengunggah. AI kami akan menganalisis kandungan nutrisi secara instan.
            </CardDescription>
          </CardHeader>
          <CardContent data-id="xqnj9yg9x" data-path="src/pages/FoodScannerPage.tsx">
            <div
            className={`border-2 border-dashed border-gray-600 rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive ? 'border-purple-500 bg-purple-500/10' : 'hover:border-gray-500'}`
            }
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave} data-id="4j7qf9zy5" data-path="src/pages/FoodScannerPage.tsx">

              <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden" data-id="in70d2pgi" data-path="src/pages/FoodScannerPage.tsx" />

              
              {previewImage ?
            <div className="space-y-4" data-id="o30bjkzol" data-path="src/pages/FoodScannerPage.tsx">
                  <img
                src={previewImage}
                alt="Pratinjau makanan"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg" data-id="l0v9hc7uc" data-path="src/pages/FoodScannerPage.tsx" />

                  <div className="flex justify-center space-x-2" data-id="hgvsb3ond" data-path="src/pages/FoodScannerPage.tsx">
                    <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white" data-id="ukppkzzr2" data-path="src/pages/FoodScannerPage.tsx">

                      <Upload className="h-4 w-4 mr-2" data-id="m9h9si8x7" data-path="src/pages/FoodScannerPage.tsx" />
                      Ubah Gambar
                    </Button>
                    <Button
                  onClick={clearResults}
                  variant="outline"
                  className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white" data-id="ihtlls08c" data-path="src/pages/FoodScannerPage.tsx">

                      <X className="h-4 w-4 mr-2" data-id="ljkw6wgqy" data-path="src/pages/FoodScannerPage.tsx" />
                      Hapus
                    </Button>
                  </div>
                </div> :

            <div className="space-y-4" data-id="rixbflswv" data-path="src/pages/FoodScannerPage.tsx">
                  <Camera className="h-16 w-16 mx-auto text-gray-500" data-id="d5pgmxh1d" data-path="src/pages/FoodScannerPage.tsx" />
                  <div data-id="qnt8t9hsd" data-path="src/pages/FoodScannerPage.tsx">
                    <p className="text-lg text-white mb-2" data-id="yi2pskkqr" data-path="src/pages/FoodScannerPage.tsx">Letakkan gambar makanan Anda di sini</p>
                    <p className="text-gray-400 mb-4" data-id="kry12balo" data-path="src/pages/FoodScannerPage.tsx">atau</p>
                    <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" data-id="uf8ioqyud" data-path="src/pages/FoodScannerPage.tsx">

                      <Upload className="h-4 w-4 mr-2" data-id="xjjf82dmc" data-path="src/pages/FoodScannerPage.tsx" />
                      Pilih File
                    </Button>
                  </div>
                  <p className="text-gray-500 text-sm" data-id="8s9936uq7" data-path="src/pages/FoodScannerPage.tsx">
                    Mendukung JPG, PNG, GIF (Maks 10MB)
                  </p>
                </div>
            }
            </div>
          </CardContent>
        </Card>
      }

      {/* Results Section */}
      {scanResult &&
      <div className="space-y-6" data-id="yr9y2240g" data-path="src/pages/FoodScannerPage.tsx">
          {/* Image Display */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/20" data-id="98hmileeo" data-path="src/pages/FoodScannerPage.tsx">
            <CardHeader data-id="k1f3k9o7k" data-path="src/pages/FoodScannerPage.tsx">
              <CardTitle className="text-white flex items-center justify-between" data-id="9hae6il1w" data-path="src/pages/FoodScannerPage.tsx">
                <span className="flex items-center space-x-2" data-id="dqfy2qcj3" data-path="src/pages/FoodScannerPage.tsx">
                  <Camera className="h-5 w-5 text-purple-500" data-id="4o65f8hc6" data-path="src/pages/FoodScannerPage.tsx" />
                  <span data-id="g692zgt7u" data-path="src/pages/FoodScannerPage.tsx">Gambar yang Dipindai</span>
                </span>
                <Button
                onClick={clearResults}
                variant="outline"
                size="sm"
                className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white" data-id="y9n1hukss" data-path="src/pages/FoodScannerPage.tsx">

                  <X className="h-4 w-4 mr-2" data-id="jfwtotki2" data-path="src/pages/FoodScannerPage.tsx" />
                  Pindai Makanan Baru
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent data-id="bzsxtc1vp" data-path="src/pages/FoodScannerPage.tsx">
              <img
              src={scanResult.image}
              alt="Scanned food"
              className="w-full max-h-96 object-contain rounded-lg shadow-lg mx-auto" data-id="1u9pfkbca" data-path="src/pages/FoodScannerPage.tsx" />

            </CardContent>
          </Card>

          {/* Food Items Identified */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/20" data-id="5hsz8imlk" data-path="src/pages/FoodScannerPage.tsx">
            <CardHeader data-id="trda1mql6" data-path="src/pages/FoodScannerPage.tsx">
              <CardTitle className="text-white flex items-center space-x-2" data-id="z29tplhtg" data-path="src/pages/FoodScannerPage.tsx">
                <Utensils className="h-5 w-5 text-purple-500" data-id="93j5n99pm" data-path="src/pages/FoodScannerPage.tsx" />
                <span data-id="9q8pr86kc" data-path="src/pages/FoodScannerPage.tsx">Item Makanan yang Diidentifikasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent data-id="ehcfcc4yb" data-path="src/pages/FoodScannerPage.tsx">
              <div className="flex flex-wrap gap-2" data-id="vp5h08cgi" data-path="src/pages/FoodScannerPage.tsx">
                {scanResult.analysis.food_items.map((item, index) =>
              <Badge key={index} variant="secondary" className="bg-purple-600 text-white text-sm px-3 py-1" data-id="6h0b4lkcz" data-path="src/pages/FoodScannerPage.tsx">
                    {item}
                  </Badge>
              )}
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Analysis */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500/20" data-id="fzv0whobh" data-path="src/pages/FoodScannerPage.tsx">
            <CardHeader data-id="ktxhycf2u" data-path="src/pages/FoodScannerPage.tsx">
              <CardTitle className="text-white flex items-center space-x-2" data-id="lh8eyekqy" data-path="src/pages/FoodScannerPage.tsx">
                <BarChart3 className="h-5 w-5 text-purple-500" data-id="mnkpa93nl" data-path="src/pages/FoodScannerPage.tsx" />
                <span data-id="058pi8fx8" data-path="src/pages/FoodScannerPage.tsx">Analisis Nutrisi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6" data-id="w606jj3k0" data-path="src/pages/FoodScannerPage.tsx">
              {/* Calorie Display */}
              <div className="text-center" data-id="xequw760d" data-path="src/pages/FoodScannerPage.tsx">
                <div className="flex items-center justify-center space-x-2 mb-2" data-id="l9rk9jm9u" data-path="src/pages/FoodScannerPage.tsx">
                  <Flame className="h-5 w-5 text-orange-500" data-id="0n0hc633j" data-path="src/pages/FoodScannerPage.tsx" />
                  <span className="text-lg text-gray-400" data-id="4kl3iq550" data-path="src/pages/FoodScannerPage.tsx">Total Kalori</span>
                </div>
                <p className="text-4xl font-bold text-white" data-id="i4ekrmrrl" data-path="src/pages/FoodScannerPage.tsx">{scanResult.analysis.nutrition.calories.toFixed(0)}</p>
              </div>

              {/* Macronutrients */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="nstfn40i9" data-path="src/pages/FoodScannerPage.tsx">
                {Object.entries(scanResult.analysis.nutrition).map(([macro, value]) => {
                if (macro === 'calories') return null;

                const colors = {
                  protein: 'text-blue-500',
                  carbs: 'text-green-500',
                  fat: 'text-yellow-500'
                };

                const bgColors = {
                  protein: 'bg-blue-500',
                  carbs: 'bg-green-500',
                  fat: 'bg-yellow-500'
                };

                return (
                  <div key={macro} className="text-center space-y-3" data-id="5ku9sanjb" data-path="src/pages/FoodScannerPage.tsx">
                      <div className="space-y-2" data-id="lvuffk4wv" data-path="src/pages/FoodScannerPage.tsx">
                        <p className={`text-lg font-semibold capitalize ${colors[macro as keyof typeof colors]}`} data-id="2xr1pm85c" data-path="src/pages/FoodScannerPage.tsx">
                          {macro}
                        </p>
                        <p className="text-2xl font-bold text-white" data-id="2qgamsb2b" data-path="src/pages/FoodScannerPage.tsx">{value.toFixed(1)}g</p>
                      </div>
                      <div className="space-y-1" data-id="jo5xgcm9q" data-path="src/pages/FoodScannerPage.tsx">
                        <Progress
                        value={getMacroPercentage(value)}
                        className={`h-3 ${bgColors[macro as keyof typeof bgColors]}`} data-id="5583w91s4" data-path="src/pages/FoodScannerPage.tsx" />

                        <p className="text-sm text-gray-500" data-id="sl6xh7qpx" data-path="src/pages/FoodScannerPage.tsx">
                          {getMacroPercentage(value).toFixed(1)}% dari makro
                        </p>
                      </div>
                    </div>);

              })}
              </div>
            </CardContent>
          </Card>

          {/* Health Benefits */}
          {scanResult.analysis.health_benefits.length > 0 &&
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/20" data-id="kupjfh2u7" data-path="src/pages/FoodScannerPage.tsx">
              <CardHeader data-id="jhj3m3rje" data-path="src/pages/FoodScannerPage.tsx">
                <CardTitle className="text-white flex items-center space-x-2" data-id="zw48wh02q" data-path="src/pages/FoodScannerPage.tsx">
                  <CheckCircle className="h-5 w-5 text-green-500" data-id="o5fgud7jk" data-path="src/pages/FoodScannerPage.tsx" />
                  <span data-id="cj15p3hjm" data-path="src/pages/FoodScannerPage.tsx">Manfaat Kesehatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent data-id="llvujfiqm" data-path="src/pages/FoodScannerPage.tsx">
                <ul className="space-y-2" data-id="0kihc6xx3" data-path="src/pages/FoodScannerPage.tsx">
                  {scanResult.analysis.health_benefits.map((benefit, index) =>
              <li key={index} className="flex items-start space-x-2" data-id="ngj94kktm" data-path="src/pages/FoodScannerPage.tsx">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" data-id="18w2r1nv7" data-path="src/pages/FoodScannerPage.tsx" />
                      <span className="text-gray-300" data-id="uiixftb84" data-path="src/pages/FoodScannerPage.tsx">{benefit}</span>
                    </li>
              )}
                </ul>
              </CardContent>
            </Card>
        }

          {/* Health Concerns */}
          {scanResult.analysis.concerns.length > 0 &&
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20" data-id="8l3tex0bu" data-path="src/pages/FoodScannerPage.tsx">
              <CardHeader data-id="5mqm3zgj1" data-path="src/pages/FoodScannerPage.tsx">
                <CardTitle className="text-white flex items-center space-x-2" data-id="qpyc8ylou" data-path="src/pages/FoodScannerPage.tsx">
                  <AlertTriangle className="h-5 w-5 text-orange-500" data-id="wm88hqep8" data-path="src/pages/FoodScannerPage.tsx" />
                  <span data-id="q4odsfmfd" data-path="src/pages/FoodScannerPage.tsx">Pertimbangan Kesehatan</span>
                </CardTitle>
              </CardHeader>
              <CardContent data-id="66b28te7q" data-path="src/pages/FoodScannerPage.tsx">
                <ul className="space-y-2" data-id="uoc73l9gg" data-path="src/pages/FoodScannerPage.tsx">
                  {scanResult.analysis.concerns.map((concern, index) =>
              <li key={index} className="flex items-start space-x-2" data-id="hazvrdhvn" data-path="src/pages/FoodScannerPage.tsx">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" data-id="b80ny9p0e" data-path="src/pages/FoodScannerPage.tsx" />
                      <span className="text-gray-300" data-id="f6l28ec01" data-path="src/pages/FoodScannerPage.tsx">{concern}</span>
                    </li>
              )}
                </ul>
              </CardContent>
            </Card>
        }
        </div>
      }
    </div>);

};

export default FoodScannerPage;