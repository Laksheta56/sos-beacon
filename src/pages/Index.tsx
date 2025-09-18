import AppHeader from "@/components/AppHeader";
import PanicButton from "@/components/PanicButton";
import { Shield, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Emergency Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Emergency Contacts</h3>
              <p className="text-sm text-muted-foreground">
                Instantly alerts emergency services and your emergency contacts
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Real-time Location</h3>
              <p className="text-sm text-muted-foreground">
                Shares your precise GPS coordinates with responders
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-card-foreground mb-2">Instant Response</h3>
              <p className="text-sm text-muted-foreground">
                Immediate notification with device and battery information
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Safety, Our Priority
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              In case of emergency, press and hold the SOS button below for 1.5 seconds. 
              Your location and device information will be immediately sent to emergency services.
            </p>
            
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50">
              <div className="flex items-center justify-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">GPS Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Battery: Good</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                System Status: Ready for Emergency Response
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Panic Button - Fixed at bottom */}
      <PanicButton />
    </div>
  );
};

export default Index;
