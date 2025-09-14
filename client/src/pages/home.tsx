import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [distanceValue, setDistanceValue] = useState<string>("");
  const [selectedConversion, setSelectedConversion] = useState<string>("km-to-miles");
  const [result, setResult] = useState<{
    value: number | null;
    error: string | null;
    formula: string | null;
    display: string;
  }>({
    value: null,
    error: null,
    formula: null,
    display: "Enter a distance and click Convert"
  });

  // Conversion constants
  const KM_TO_MILES = 0.621371;
  const MILES_TO_KM = 1.60934;

  const convertDistance = () => {
    const inputValue = parseFloat(distanceValue);
    
    // Validate input
    if (isNaN(inputValue) || inputValue < 0) {
      setResult({
        value: null,
        error: "Please enter a valid positive number",
        formula: null,
        display: "Please enter a valid positive number"
      });
      return;
    }
    
    let convertedValue: number;
    let formula: string;
    let fromUnit: string;
    let toUnit: string;
    
    if (selectedConversion === 'km-to-miles') {
      convertedValue = inputValue * KM_TO_MILES;
      fromUnit = 'km';
      toUnit = 'miles';
      formula = `${inputValue} km × 0.621371 = ${convertedValue.toFixed(4)} miles`;
    } else {
      convertedValue = inputValue * MILES_TO_KM;
      fromUnit = 'miles';
      toUnit = 'km';
      formula = `${inputValue} miles × 1.60934 = ${convertedValue.toFixed(4)} km`;
    }
    
    setResult({
      value: convertedValue,
      error: null,
      formula: formula,
      display: `${inputValue} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistanceValue(e.target.value);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      convertDistance();
    }
  };

  const handleConversionChange = (value: string) => {
    setSelectedConversion(value);
  };

  // Auto-convert with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (distanceValue !== '') {
        convertDistance();
      } else {
        setResult({
          value: null,
          error: null,
          formula: null,
          display: "Enter a distance and click Convert"
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [distanceValue, selectedConversion]);

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <Card className="bg-card rounded-xl shadow-2xl p-8 w-full max-w-lg border border-border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-foreground mb-2">Distance Converter</h1>
          <p className="text-muted-foreground text-sm">Convert between kilometers and miles instantly</p>
        </div>

        {/* Distance Input */}
        <div className="mb-6">
          <Label htmlFor="distance-input" className="block text-sm font-medium text-foreground mb-2">
            Enter Distance
          </Label>
          <Input
            type="number"
            id="distance-input"
            placeholder="0"
            step="any"
            value={distanceValue}
            onChange={handleInputChange}
            onKeyPress={handleEnterKey}
            className="w-full px-4 py-3 bg-muted border border-input rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 hover:border-primary/50"
            data-testid="input-distance"
          />
        </div>

        {/* Conversion Selector */}
        <div className="mb-6">
          <Label className="block text-sm font-medium text-foreground mb-3">Conversion Type</Label>
          <RadioGroup 
            value={selectedConversion} 
            onValueChange={handleConversionChange}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div className="relative">
              <RadioGroupItem 
                value="km-to-miles" 
                id="km-to-miles"
                className="sr-only peer"
                data-testid="radio-km-to-miles"
              />
              <Label 
                htmlFor="km-to-miles"
                className="flex items-center justify-center px-4 py-3 bg-muted border border-input rounded-lg cursor-pointer transition-all duration-200 peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md hover:border-primary/50 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
              >
                <span className="text-sm font-medium">Kilometers → Miles</span>
              </Label>
            </div>

            <div className="relative">
              <RadioGroupItem 
                value="miles-to-km" 
                id="miles-to-km"
                className="sr-only peer"
                data-testid="radio-miles-to-km"
              />
              <Label 
                htmlFor="miles-to-km"
                className="flex items-center justify-center px-4 py-3 bg-muted border border-input rounded-lg cursor-pointer transition-all duration-200 peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-checked:shadow-md hover:border-primary/50 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
              >
                <span className="text-sm font-medium">Miles → Kilometers</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Convert Button */}
        <Button 
          onClick={convertDistance}
          className="w-full gradient-button text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-6"
          data-testid="button-convert"
        >
          Convert Distance
        </Button>

        {/* Result Display */}
        <div 
          className={`rounded-lg border-l-4 p-6 min-h-[80px] flex flex-col justify-center ${
            result.error 
              ? 'bg-destructive/10 border-destructive' 
              : 'bg-muted border-primary'
          }`}
          data-testid="result-display"
        >
          <div className="result-content">
            {result.error ? (
              <div className="text-center text-destructive font-medium" data-testid="text-error">
                {result.error}
              </div>
            ) : result.value !== null ? (
              <div className="text-center">
                <div className="text-xl font-semibold text-foreground mb-2" data-testid="text-result">
                  {result.display}
                </div>
                <div className="text-sm text-muted-foreground italic" data-testid="text-formula">
                  {result.formula}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground" data-testid="text-placeholder">
                {result.display}
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <h3 className="text-sm font-medium text-foreground mb-2">Conversion Formulas</h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Kilometers to Miles:</strong> km × 0.621371 = miles</p>
              <p><strong>Miles to Kilometers:</strong> miles × 1.60934 = km</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
