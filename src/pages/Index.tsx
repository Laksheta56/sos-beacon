import AppHeader from "@/components/AppHeader";
import PanicButton from "@/components/PanicButton";
import { Shield, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <AppHeader />
      
      <main className="container mx-auto px-6 py-12">
        {/* Emergency Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card 
            className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <CardContent className="p-8 text-center">
              <Phone className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-semibold text-lg text-card-foreground mb-3">
                Emergency Contacts
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Instantly alerts emergency services and your emergency contacts
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <CardContent className="p-8 text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-semibold text-lg text-card-foreground mb-3">
                Real-time Location
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Shares your precise GPS coordinates with responders
              </p>
            </CardContent>
          </Card>
          
          <Card 
            className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <CardContent className="p-8 text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-semibold text-lg text-card-foreground mb-3">
                Instant Response
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Immediate notification with device and battery information
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="text-center mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Shield className="w-20 h-20 text-primary mx-auto mb-6 animate-float" />
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Your Safety, Our 
                <span className="text-primary"> Priority</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
                In case of emergency, press and hold the SOS button below for 1.5 seconds. 
                Your location and device information will be immediately sent to emergency services.
              </p>
            </div>
            
            <Card 
              className="rounded-2xl border border-border/50 backdrop-blur-sm relative overflow-hidden group"
              style={{
                background: 'var(--gradient-primary-subtle)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <CardContent className="p-10">
                <div className="flex items-center justify-center gap-8 text-muted-foreground mb-6 flex-wrap">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">GPS Active</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Battery: Good</span>
                  </div>
                </div>
                
                <p className="text-base text-muted-foreground font-medium">
                  System Status: Ready for Emergency Response
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Panic Button - Fixed at bottom */}
      <PanicButton />
    </div>
  );
};

export default Index;
