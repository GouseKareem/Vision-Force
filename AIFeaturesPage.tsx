
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const AIFeaturesPage = () => {
  const { theme, toggleTheme } = useTheme();

  // AI features data
  const aiFeatures = [
    {
      title: "Smart Task Prioritization",
      description: "Our AI analyzes your tasks, deadlines, and working patterns to intelligently prioritize what needs your attention first.",
      icon: "🧠",
      color: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-600 dark:text-purple-300"
    },
    {
      title: "Deadline Auto-Rescheduler",
      description: "When you fall behind or your workload shifts, the AI automatically suggests new realistic deadlines based on your capacity.",
      icon: "🗓️",
      color: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-300"
    },
    {
      title: "Voice-Based Task Creation",
      description: "Simply speak your tasks out loud, and our AI will understand, categorize, and schedule them appropriately.",
      icon: "🎤",
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-300"
    },
    {
      title: "Smart Task Splitting",
      description: "For complex tasks, the AI automatically suggests how to break them down into manageable sub-tasks for easier completion.",
      icon: "✂️",
      color: "bg-yellow-100 dark:bg-yellow-900/30",
      textColor: "text-yellow-600 dark:text-yellow-300"
    },
    {
      title: "Focus Mode with Pomodoro",
      description: "AI-optimized focus sessions that adapt to your working rhythm and attention span for maximum productivity.",
      icon: "⏱️",
      color: "bg-red-100 dark:bg-red-900/30",
      textColor: "text-red-600 dark:text-red-300"
    },
    {
      title: "Gamified Productivity",
      description: "Turn productivity into a game with AI-driven challenges, rewards, and achievements based on your task completion.",
      icon: "🎮",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
      textColor: "text-indigo-600 dark:text-indigo-300"
    },
    {
      title: "Calendar Sync & Optimization",
      description: "Seamlessly sync with your Google or Outlook calendar, and let the AI find the best scheduling opportunities.",
      icon: "📅",
      color: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-300"
    },
    {
      title: "Personalized Insights",
      description: "Receive AI-generated reports about your productivity patterns, with personalized suggestions for improvement.",
      icon: "📊",
      color: "bg-teal-100 dark:bg-teal-900/30",
      textColor: "text-teal-600 dark:text-teal-300"
    },
    {
      title: "Offline Task Mode",
      description: "The AI predicts which tasks you'll need access to offline and ensures they're available even without an internet connection.",
      icon: "🔌",
      color: "bg-pink-100 dark:bg-pink-900/30",
      textColor: "text-pink-600 dark:text-pink-300"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container pt-32 pb-16">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered <span className="gradient-text">Innovations</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover how our advanced AI features transform task management from mundane to extraordinary, 
            helping you work smarter and accomplish more every day.
          </p>
        </div>
        
        {/* Feature Demo Section */}
        <Card className="glass-card mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">AI Task Prioritization</h2>
              <p className="text-muted-foreground mb-6">
                Watch how our AI analyzes your workload, deadlines, and importance to create the 
                perfect prioritized task list that adapts throughout your day.
              </p>
              <Button className="w-fit button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                See it in action
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-secondary/50 p-8 flex items-center justify-center">
              <div className="w-full max-w-md p-4 bg-background rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Your Smart Priority List</h3>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full">
                    AI Suggested
                  </span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { task: "Finish quarterly report", priority: "Urgent - Due Today", icon: "🔴" },
                    { task: "Prepare for client meeting", priority: "High - 3 Hours Before Event", icon: "🟠" },
                    { task: "Review team pull requests", priority: "Medium - Blocking Others", icon: "🟡" },
                    { task: "Update project documentation", priority: "Normal - Due This Week", icon: "🟢" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-secondary/50 rounded-lg">
                      <div className="mr-3 text-lg">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.task}</p>
                        <p className="text-xs text-muted-foreground">{item.priority}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <span className="font-semibold">AI Insight:</span> Based on your working patterns, the quarterly report takes priority as you're most productive in the morning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* All AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="glass-card task-card">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle className={feature.textColor}>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Voice Assistant Demo */}
        <Card className="glass-card mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/50 p-8 flex items-center justify-center order-2 md:order-1">
              <div className="w-full max-w-md">
                <div className="relative">
                  <div className="h-64 bg-background rounded-lg p-4 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
                          Create a task for the team meeting tomorrow at 2 PM
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-secondary p-3 rounded-lg rounded-tl-none max-w-[80%]">
                          <p>I've created a new task:</p>
                          <p className="font-semibold mt-1">Team Meeting</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            📆 Tomorrow at 2:00 PM<br />
                            🏷️ Added to Meetings category<br />
                            ⏰ Reminder set for 30 minutes before
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
                          Add finishing the quarterly report as high priority due Friday
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex-1 bg-secondary rounded-full p-2 px-4">
                        <p className="text-muted-foreground">Ask me to create a task...</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2">
                        🎤
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                    <div className="animate-pulse bg-purple-500/20 w-48 h-16 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4">Voice & Chatbot Task Creation</h2>
              <p className="text-muted-foreground mb-6">
                Create, schedule, and organize tasks using natural language. Simply speak or type 
                what you need, and our AI assistant will handle the details for you.
              </p>
              <Button className="w-fit button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                Try Voice Assistant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        
        {/* CTA Section */}
        <Card className="glass-card bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to experience AI-powered productivity?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of professionals who are already saving hours every week with Vision Force's 
              intelligent task management system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="button-glow bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIFeaturesPage;
