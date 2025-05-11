
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Collaboration', path: '/collaboration' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'AI Features', path: '/ai-features' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-background/80 backdrop-blur-lg shadow-md' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="text-2xl font-bold gradient-text">Vision Force</div>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="outline" className="ml-4">Login</Button>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
              Sign Up
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme} 
              className="ml-2"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme} 
              className="mr-2"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <div className="container animate-slide-down bg-background/95 backdrop-blur-lg shadow-lg rounded-b-2xl py-4 mt-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-foreground/80 hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-3 border-t border-border mt-2">
              <Button variant="outline" className="w-full">Login</Button>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
