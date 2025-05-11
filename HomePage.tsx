
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();

  // Simulate staggered animations on component mount
  useEffect(() => {
    const animationDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const animateElements = async () => {
      const elements = document.querySelectorAll('.animate-on-load');
      
      for (let i = 0; i < elements.length; i++) {
        await animationDelay(150);
        elements[i].classList.add('animate-slide-up');
        elements[i].classList.remove('opacity-0');
      }
    };
    
    animateElements();
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 overflow-hidden relative">
        {/* Background elements */}
        <div className="blur-dot w-72 h-72 -top-10 -left-10 bg-purple-300/30"></div>
        <div className="blur-dot w-96 h-96 -bottom-20 -right-20 bg-indigo-300/30"></div>
        
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-on-load opacity-0">
                Redefining Task Management with <span className="gradient-text">Intelligence</span>
              </h1>
              
              <p className="text-lg text-muted-foreground animate-on-load opacity-0">
                Vision Force combines AI-driven insights with powerful task management tools to help you work smarter, not harder.
              </p>
              
              <div className="flex flex-wrap gap-4 animate-on-load opacity-0">
                <Button size="lg" className="button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                  Start Managing Smarter
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 animate-on-load opacity-0">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-purple-300 to-indigo-400"
                    ></div>
                  ))}
                </div>
                <p className="text-sm"><span className="font-bold">5,000+</span> teams already using Vision Force</p>
              </div>
            </div>
            
            <div className="animate-on-load opacity-0">
              <div className="relative glass-card p-2 rounded-2xl shadow-xl">
                {/* Mock dashboard preview */}
                <div className="rounded-xl overflow-hidden">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold">Today's Dashboard</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tasks Completed</p>
                        <h4 className="text-xl font-bold">12/18</h4>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2">
                          <div className="bg-purple-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Focus Time</p>
                        <h4 className="text-xl font-bold">3h 24m</h4>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2">
                          <div className="bg-indigo-500 h-1.5 rounded-full" style={{width: '70%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">Finish project proposal</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-sm">Team meeting at 2 PM</span>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-sm">Review client feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-5 -right-5 glass-card p-3 rounded-lg shadow-lg animate-float">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Task completed</p>
                      <p className="text-xs text-muted-foreground">Design mockups</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 glass-card p-3 rounded-lg shadow-lg animate-float-delay-1">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <div className="w-8 h-2 bg-purple-200 dark:bg-purple-900 rounded-full mb-1"></div>
                      <div className="w-6 h-2 bg-purple-400 dark:bg-purple-700 rounded-full"></div>
                    </div>
                    <p className="text-xs font-medium">Progress: 68%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-load opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the power of <span className="gradient-text">AI-driven</span> task management
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform combines intelligent automation with powerful collaboration tools to transform how you manage work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Task Prioritization",
                description: "AI algorithms automatically prioritize your tasks based on deadlines, importance, and your working patterns.",
                icon: "📊"
              },
              {
                title: "Collaborative Workspaces",
                description: "Create shared boards where teams can collaborate in real-time with instantaneous updates.",
                icon: "👥"
              },
              {
                title: "Intelligent Reminders",
                description: "Get reminded about tasks exactly when you need to, with smart notifications that adapt to your schedule.",
                icon: "🔔"
              },
              {
                title: "Visual Progress Tracking",
                description: "Track your productivity with beautiful charts and visualizations that show your progress over time.",
                icon: "📈"
              },
              {
                title: "Time Management Tools",
                description: "Built-in pomodoro timer, time tracking, and focus mode to maximize your productivity.",
                icon: "⏱️"
              },
              {
                title: "Smart Deadline Suggestions",
                description: "The AI analyzes your task complexity and suggests realistic deadlines based on your availability.",
                icon: "🗓️"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl shadow-lg task-card animate-on-load opacity-0"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="blur-dot w-80 h-80 top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-purple-300/40"></div>
        
        <div className="container relative">
          <div className="glass-card p-8 md:p-12 rounded-2xl shadow-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Ready to transform how you manage tasks?</h2>
                <p className="text-muted-foreground">
                  Join thousands of professionals already using Vision Force to optimize their workflow and boost productivity.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>14-day free trial, no credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Full access to all features</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                    <span>Priority customer support</span>
                  </div>
                </div>
                <Button size="lg" className="button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Task management dashboard" 
                  className="rounded-lg shadow-lg w-full object-cover"
                />
                <div className="absolute -bottom-4 -right-4 glass-card p-3 rounded-lg shadow-lg animate-float">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-xs font-medium">Productivity increased by 37%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 relative">
        <div className="blur-dot w-96 h-96 top-0 right-0 bg-indigo-300/30"></div>
        
        <div className="container relative">
          <div className="text-center mb-16 animate-on-load opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by teams worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what others are saying about Vision Force
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Vision Force has revolutionized how our team manages projects. The AI prioritization saves us hours every week.",
                author: "Sarah Johnson",
                role: "Project Manager at TechCorp"
              },
              {
                quote: "The interface is beautiful and intuitive. I've tried many task management tools, but this one actually helps me stay focused.",
                author: "Michael Chen",
                role: "Senior Developer at InnovateLabs"
              },
              {
                quote: "The smart reminders and deadline suggestions are spot on. It's like having a personal assistant that knows exactly what I need.",
                author: "Priya Patel",
                role: "Marketing Director at GrowthBox"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-xl shadow-lg animate-on-load opacity-0"
              >
                <div className="text-4xl mb-4">"</div>
                <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 text-center">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to experience smarter task management?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of teams already using Vision Force to boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/auth">
                <Button size="lg" className="button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8">
                  Get Started For Free
                </Button>
              </Link>
              <Link to="/ai-features">
                <Button size="lg" variant="outline">
                  Learn About AI Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
