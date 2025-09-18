import { Shield, MapPin, Battery, Smartphone } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="w-full bg-gradient-to-r from-primary to-primary-glow shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SafeGuard</h1>
              <p className="text-white/80 text-sm">Emergency Response System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-white/80">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">GPS Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4" />
              <span className="text-xs">Connected</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="w-4 h-4" />
              <span className="text-xs">Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;