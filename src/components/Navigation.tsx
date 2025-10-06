import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-12 w-12" />
            <span className="font-bold text-lg text-foreground">Charity Institution</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("mission")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("funding")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Funding
            </button>
            <Button variant="default" size="sm">
              Donate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <button
              onClick={() => scrollToSection("mission")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Impact
            </button>
            <button
              onClick={() => scrollToSection("funding")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
            >
              Funding
            </button>
            <Button variant="default" size="sm" className="w-full">
              Donate
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
