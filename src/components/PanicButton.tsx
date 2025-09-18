import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationData {
  user_id: string;
  lat: number;
  lon: number;
  battery: number;
  device_info: {
    platform: string;
    version: string;
    userAgent: string;
  };
  timestamp: string;
  live_stream: boolean;
}

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartTime = useRef<number>(0);

  const getBatteryStatus = async (): Promise<number> => {
    try {
      // Web Battery API (if supported)
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        return Math.round(battery.level * 100);
      }
    } catch (error) {
      console.warn('Battery API not supported');
    }
    return 100; // Default value
  };

  const getLocationData = async (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const battery = await getBatteryStatus();
          
          const data: LocationData = {
            user_id: "TOURIST123", // This would come from your auth system
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            battery: battery,
            device_info: {
              platform: navigator.platform,
              version: navigator.appVersion,
              userAgent: navigator.userAgent,
            },
            timestamp: new Date().toISOString(),
            live_stream: true,
          };
          
          resolve(data);
        },
        (error) => {
          console.error('Location error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  };

  const sendPanicAlert = async (data: LocationData) => {
    try {
      const response = await fetch('https://your-backend.com/api/panic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to send panic alert:', error);
      throw error;
    }
  };

  const handlePressStart = () => {
    setIsPressed(true);
    pressStartTime.current = Date.now();
    
    // Long press detection (1.5 seconds)
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      
      try {
        const locationData = await getLocationData();
        await sendPanicAlert(locationData);
        
        toast({
          title: "🚨 SOS Triggered!",
          description: "Authorities have been notified.",
          className: "bg-emergency text-emergency-foreground border-emergency",
        });
      } catch (error) {
        toast({
          title: "Failed to send SOS",
          description: "Please try again or contact emergency services directly.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsPressed(false);
      }
    }, 1500);
  };

  const handlePressEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const pressDuration = Date.now() - pressStartTime.current;
    if (pressDuration < 1500) {
      setIsPressed(false);
    }
  };

  const progressWidth = isPressed ? 100 : 0;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      {/* Instructions */}
      <div className="mb-4 text-center px-4">
        <p className="text-sm text-muted-foreground mb-1">Emergency SOS</p>
        <p className="text-xs text-muted-foreground">Hold for 1.5 seconds to activate</p>
      </div>

      {/* Panic Button */}
      <div className="relative">
        {/* Progress Ring */}
        <div className="absolute inset-0 rounded-full">
          <svg className="w-full h-full transform -rotate-90" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="hsl(var(--emergency-glow))"
              strokeWidth="4"
              fill="none"
              className="opacity-30"
            />
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="hsl(var(--emergency-glow))"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressWidth / 100)}`}
              className="transition-all duration-75 drop-shadow-lg"
              style={{
                filter: isPressed ? 'drop-shadow(0 0 8px hsl(var(--emergency-glow)))' : 'none'
              }}
            />
          </svg>
        </div>

        {/* Main Button */}
        <Button
          className={`
            w-28 h-28 rounded-full transition-all duration-200
            bg-emergency hover:bg-emergency-glow text-emergency-foreground
            shadow-lg hover:shadow-xl active:scale-95
            flex flex-col items-center justify-center gap-1
            ${isPressed ? 'scale-105 shadow-2xl' : ''}
            ${isLoading ? 'animate-pulse' : ''}
          `}
          style={{
            background: 'var(--gradient-emergency)',
            boxShadow: isPressed 
              ? 'var(--shadow-emergency), 0 0 20px hsl(var(--emergency-glow) / 0.6)' 
              : 'var(--shadow-emergency)',
          }}
          disabled={isLoading}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
        >
          {isLoading ? (
            <Zap className="w-8 h-8 animate-spin" />
          ) : (
            <>
              <AlertCircle className="w-6 h-6" />
              <span className="text-lg font-bold">SOS</span>
            </>
          )}
        </Button>
      </div>

      {/* Status Message */}
      {isPressed && !isLoading && (
        <div className="mt-4 text-center">
          <p className="text-sm text-emergency font-medium animate-pulse">
            Hold to activate emergency alert...
          </p>
        </div>
      )}
    </div>
  );
};

export default PanicButton;