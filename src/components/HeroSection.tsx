import { Heart, Users, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section id="mission" className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Transforming Lives Through Compassion
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated to creating lasting positive change in our community through 
            education, support, and sustainable development programs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower individuals and communities through comprehensive support 
                  programs that address immediate needs while building long-term resilience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Community First</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community-driven initiatives and work 
                  hand-in-hand with local leaders to create meaningful impact.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Our Values</h3>
                <p className="text-muted-foreground">
                  Transparency, accountability, and respect guide every decision we make, 
                  ensuring that every contribution creates maximum impact.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
