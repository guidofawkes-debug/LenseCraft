import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { VehicleMake, VehicleModel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <section className="py-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">Find the Perfect Fit for Your Vehicle</h2>
          <p className="text-neutral-300">
            Our compatibility checker ensures you get the right parts for your specific make and model, every time.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto bg-white text-neutral-900 rounded-lg p-6">
          <form className="space-y-4" onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make" className="block text-sm font-medium text-neutral-700 mb-1">
                  Make
                </Label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger id="make">
                    <SelectValue placeholder="Select Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-makes">Select Make</SelectItem>
                    {makes?.map((make) => (
                      <SelectItem key={make.id} value={make.name}>
                        {make.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="model" className="block text-sm font-medium text-neutral-700 mb-1">
                  Model
                </Label>
                <Select 
                  value={selectedModel} 
                  onValueChange={setSelectedModel}
                  disabled={!selectedMake || selectedMake === "all-makes"}
                >
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-models">Select Model</SelectItem>
                    {models?.map((model) => (
                      <SelectItem key={model.id} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className="block text-sm font-medium text-neutral-700 mb-1">
                  Year
                </Label>
                <Select 
                  value={selectedYear} 
                  onValueChange={setSelectedYear}
                  disabled={!selectedModel || selectedModel === "all-models"}
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-years">Select Year</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">
                  Product Type
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="Headlights">Headlights</SelectItem>
                    <SelectItem value="Tail Lights">Tail Lights</SelectItem>
                    <SelectItem value="Signal Lights">Signal Lights</SelectItem>
                    <SelectItem value="Fog Lights">Fog Lights</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Find Compatible Parts
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VehicleSearch;
