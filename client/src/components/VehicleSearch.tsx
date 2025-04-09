import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { VehicleMake, VehicleModel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Lightbulb, Car, Search } from "lucide-react";

const VehicleSearch = () => {
  const [_, setLocation] = useLocation();
  const [selectedMake, setSelectedMake] = useState<string>("all-makes");
  const [selectedModel, setSelectedModel] = useState<string>("all-models");
  const [selectedYear, setSelectedYear] = useState<string>("all-years");
  const [selectedType, setSelectedType] = useState<string>("all-types");

  // Fetch vehicle makes
  const { data: makes } = useQuery<VehicleMake[]>({
    queryKey: ['/api/vehicle-makes'],
  });

  // Fetch models based on selected make
  const { data: models } = useQuery<VehicleModel[]>({
    queryKey: ['/api/vehicle-models', selectedMake],
    queryFn: async () => {
      if (!selectedMake || selectedMake === "all-makes") return [];
      const makeId = makes?.find(make => make.name === selectedMake)?.id;
      if (!makeId) return [];
      
      const response = await fetch(`/api/vehicle-models?makeId=${makeId}`);
      if (!response.ok) throw new Error('Failed to fetch vehicle models');
      return response.json();
    },
    enabled: !!selectedMake && selectedMake !== "all-makes" && !!makes?.length,
  });

  // Generate years based on selected model
  const years = selectedModel && selectedModel !== "all-models" ? 
    Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString()) :
    [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (selectedMake && selectedMake !== "all-makes") params.append('make', selectedMake);
    if (selectedModel && selectedModel !== "all-models") params.append('model', selectedModel);
    if (selectedType && selectedType !== "all-types") params.append('category', selectedType);
    
    setLocation(`/products?${params.toString()}`);
  };

  return (
    <section className="py-12 bg-black relative overflow-hidden">
      {/* Background accent effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#E53935] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-[#E53935] rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="mb-4 inline-block">
            <div className="w-12 h-12 rounded-full bg-[#E53935] mx-auto flex items-center justify-center animate-red-flash mb-2">
              <Car className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 inline-block relative">
            <span className="text-[#E53935]">Find</span> the Perfect Fit for Your Vehicle
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Our compatibility checker ensures you get the right parts for your specific make and model, every time.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto rounded-xl p-1 bg-gradient-to-r from-[#E53935] via-[#E53935]/80 to-[#E53935] shadow-lg relative">
          <div className="bg-black rounded-lg p-6 relative">
            <form className="space-y-4" onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="make" className="block text-sm font-medium text-white/80 mb-1 flex items-center">
                    <Car className="h-4 w-4 text-[#E53935] mr-2" /> Make
                  </Label>
                  <Select value={selectedMake} onValueChange={setSelectedMake}>
                    <SelectTrigger id="make" className="border-[#E53935]/30 bg-black/50 text-white">
                      <SelectValue placeholder="Select Make" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#E53935]/30 text-white">
                      <SelectItem value="all-makes" className="hover:bg-[#E53935]/10">Select Make</SelectItem>
                      {makes?.map((make) => (
                        <SelectItem key={make.id} value={make.name} className="hover:bg-[#E53935]/10">
                          {make.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="model" className="block text-sm font-medium text-white/80 mb-1 flex items-center">
                    <Car className="h-4 w-4 text-[#E53935] mr-2" /> Model
                  </Label>
                  <Select 
                    value={selectedModel} 
                    onValueChange={setSelectedModel}
                    disabled={!selectedMake || selectedMake === "all-makes"}
                  >
                    <SelectTrigger id="model" className="border-[#E53935]/30 bg-black/50 text-white">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#E53935]/30 text-white">
                      <SelectItem value="all-models" className="hover:bg-[#E53935]/10">Select Model</SelectItem>
                      {models?.map((model) => (
                        <SelectItem key={model.id} value={model.name} className="hover:bg-[#E53935]/10">
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year" className="block text-sm font-medium text-white/80 mb-1 flex items-center">
                    <Zap className="h-4 w-4 text-[#E53935] mr-2" /> Year
                  </Label>
                  <Select 
                    value={selectedYear} 
                    onValueChange={setSelectedYear}
                    disabled={!selectedModel || selectedModel === "all-models"}
                  >
                    <SelectTrigger id="year" className="border-[#E53935]/30 bg-black/50 text-white">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#E53935]/30 text-white">
                      <SelectItem value="all-years" className="hover:bg-[#E53935]/10">Select Year</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year} className="hover:bg-[#E53935]/10">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="type" className="block text-sm font-medium text-white/80 mb-1 flex items-center">
                    <Lightbulb className="h-4 w-4 text-[#E53935] mr-2" /> Product Type
                  </Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type" className="border-[#E53935]/30 bg-black/50 text-white">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#E53935]/30 text-white">
                      <SelectItem value="all-types" className="hover:bg-[#E53935]/10">All Types</SelectItem>
                      <SelectItem value="Headlights" className="hover:bg-[#E53935]/10">Headlights</SelectItem>
                      <SelectItem value="Tail Lights" className="hover:bg-[#E53935]/10">Tail Lights</SelectItem>
                      <SelectItem value="Signal Lights" className="hover:bg-[#E53935]/10">Signal Lights</SelectItem>
                      <SelectItem value="Fog Lights" className="hover:bg-[#E53935]/10">Fog Lights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#E53935] hover:bg-[#C62828] text-white font-bold py-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(229,57,53,0.4)] flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                Find Compatible Parts
              </Button>
            </form>
          </div>
          
          {/* Badge overlay */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black border-2 border-[#E53935] px-4 py-2 rounded-full text-white text-sm font-bold">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#E53935]" />
              VEHICLE SEARCH
              <Zap className="h-4 w-4 text-[#E53935]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleSearch;
