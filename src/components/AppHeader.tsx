import { Shield, MapPin, Battery, Smartphone } from "lucide-react";

const AppHeader = () => {
  return (
    <header 
      className="w-full relative overflow-hidden"
      style={{
        background: 'var(--gradient-primary)',
        boxShadow: 'var(--shadow-blue)',
      }}
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="container mx-auto px-6 py-8 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center animate-float">
              <Shield className="w-8 h-8 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white drop-shadow-sm">
                SafeGuard
              </h1>
              <p className="text-white/90 text-base font-medium">
                Emergency Response System
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">GPS Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Battery className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;