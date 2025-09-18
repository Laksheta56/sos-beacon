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
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in-up">
      {/* Instructions */}
      <div className="mb-6 text-center px-4">
        <p className="text-lg font-display font-semibold text-card-foreground mb-2">
          Emergency SOS
        </p>
        <p className="text-sm text-muted-foreground font-medium">
          Hold for 1.5 seconds to activate
        </p>
      </div>

      {/* Ambient glow effect */}
      <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-75 pointer-events-none" />

      {/* Panic Button Container */}
      <div className="relative">
        {/* Progress Ring */}
        <div className="absolute inset-0 rounded-full">
          <svg className="w-full h-full transform -rotate-90" width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r="66"
              stroke="hsl(var(--emergency-glow))"
              strokeWidth="3"
              fill="none"
              className="opacity-20"
            />
            <circle
              cx="70"
              cy="70"
              r="66"
              stroke="hsl(var(--emergency-glow))"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 66}`}
              strokeDashoffset={`${2 * Math.PI * 66 * (1 - progressWidth / 100)}`}
              className="transition-all duration-75"
              style={{
                filter: isPressed ? 'drop-shadow(0 0 12px hsl(var(--emergency-glow)))' : 'none'
              }}
            />
          </svg>
        </div>

        {/* Main Button */}
        <Button
          className={`
            w-32 h-32 rounded-full transition-all duration-300
            text-emergency-foreground font-display font-bold
            flex flex-col items-center justify-center gap-1
            border-4 border-white/20
            ${isPressed ? 'scale-110 shadow-2xl animate-pulse-glow' : 'hover:scale-105'}
            ${isLoading ? 'animate-pulse' : ''}
          `}
          style={{
            background: 'var(--gradient-emergency)',
            boxShadow: isPressed 
              ? 'var(--shadow-emergency-glow), inset 0 0 20px rgba(255,255,255,0.1)' 
              : 'var(--shadow-emergency), inset 0 0 10px rgba(255,255,255,0.1)',
            transition: 'var(--transition-spring)',
          }}
          disabled={isLoading}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
        >
          {isLoading ? (
            <Zap className="w-10 h-10 animate-spin drop-shadow-sm" />
          ) : (
            <>
              <AlertCircle className="w-8 h-8 drop-shadow-sm" />
              <span className="text-xl font-bold tracking-wide drop-shadow-sm">SOS</span>
            </>
          )}
        </Button>
      </div>

      {/* Status Message */}
      {isPressed && !isLoading && (
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-base text-emergency font-semibold animate-pulse">
            Hold to activate emergency alert...
          </p>
          <div className="mt-2 w-32 h-1 bg-emergency/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emergency rounded-full transition-all duration-75"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PanicButton;