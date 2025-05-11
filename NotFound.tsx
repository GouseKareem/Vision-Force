
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold mb-4 gradient-text">404</div>
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button className="button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="blur-dot w-72 h-72 top-1/4 left-1/4 bg-purple-300/30"></div>
        <div className="blur-dot w-96 h-96 bottom-1/4 right-1/4 bg-indigo-300/30"></div>
      </div>
    </div>
  );
};

export default NotFound;
