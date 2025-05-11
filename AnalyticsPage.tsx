
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, RefreshCcw, Calendar, Clock, CheckCircle, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock analytics data
const taskCompletionData = [
  { name: 'Mon', completed: 4, pending: 2 },
  { name: 'Tue', completed: 3, pending: 3 },
  { name: 'Wed', completed: 5, pending: 1 },
  { name: 'Thu', completed: 2, pending: 3 },
  { name: 'Fri', completed: 6, pending: 2 },
  { name: 'Sat', completed: 3, pending: 1 },
  { name: 'Sun', completed: 1, pending: 4 },
];

const pieData = [
  { name: 'Completed', value: 65, color: '#10B981' },
  { name: 'In Progress', value: 25, color: '#3B82F6' },
  { name: 'To Do', value: 10, color: '#F59E0B' },
];

const productivityData = [
  { name: 'Week 1', productivity: 75 },
  { name: 'Week 2', productivity: 60 },
  { name: 'Week 3', productivity: 85 },
  { name: 'Week 4', productivity: 90 },
];

const AnalyticsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeChart, setActiveChart] = useState('bar');
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API loading
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data refreshed",
        description: "Analytics data has been updated",
      });
    }, 1000);
  };

  // Handle export data click
  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your data will be downloaded shortly",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Analytics data has been exported as ${format.toUpperCase()}`,
      });
    }, 2000);
  };

  // Handle time range selection
  const handleTimeRangeChange = (value: string) => {
    if (value) {
      setTimeRange(value);
      toast({
        description: `Showing data for the last ${value}`,
      });
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container pt-32 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center"
            >
              <RefreshCcw size={16} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('csv')}
              className="flex items-center"
            >
              <Download size={16} className="mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle size={18} className="text-green-500 mr-2" />
                Task Completion
              </CardTitle>
              <CardDescription>Current week's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <div className="text-sm text-muted-foreground">↑ 12% from last week</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock size={18} className="text-blue-500 mr-2" />
                Average Completion Time
              </CardTitle>
              <CardDescription>Time spent on tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2.4 hours</div>
              <div className="text-sm text-muted-foreground">↓ 0.3h from last week</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar size={18} className="text-purple-500 mr-2" />
                Current Streak
              </CardTitle>
              <CardDescription>Consecutive productive days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5 days</div>
              <div className="text-sm text-muted-foreground">Personal best: 9 days</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col gap-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Task Performance</CardTitle>
                
                <div className="flex space-x-3">
                  <ToggleGroup 
                    type="single" 
                    value={activeChart} 
                    onValueChange={(value) => value && setActiveChart(value)}
                  >
                    <ToggleGroupItem value="bar" aria-label="Bar Chart">
                      <BarChart2 size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="pie" aria-label="Pie Chart">
                      <PieChartIcon size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="line" aria-label="Line Chart">
                      <LineChartIcon size={16} />
                    </ToggleGroupItem>
                  </ToggleGroup>
                  
                  <ToggleGroup 
                    type="single" 
                    value={timeRange} 
                    onValueChange={handleTimeRangeChange}
                    className="ml-2"
                  >
                    <ToggleGroupItem value="week" aria-label="Week">
                      Week
                    </ToggleGroupItem>
                    <ToggleGroupItem value="month" aria-label="Month">
                      Month
                    </ToggleGroupItem>
                    <ToggleGroupItem value="year" aria-label="Year">
                      Year
                    </ToggleGroupItem>
                  </ToggleGroup>
                  
                  <Button variant="outline" size="sm">
                    <Filter size={16} className="mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                {activeChart === 'bar' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={taskCompletionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed Tasks" fill="#10B981" />
                      <Bar dataKey="pending" name="Pending Tasks" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {activeChart === 'pie' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                
                {activeChart === 'line' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={productivityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="productivity" name="Productivity Score" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="productivity">
                  <TabsList className="mb-4">
                    <TabsTrigger value="productivity">Productivity</TabsTrigger>
                    <TabsTrigger value="habits">Habits</TabsTrigger>
                    <TabsTrigger value="focus">Focus Time</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="productivity" className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Most productive day</span>
                      <span className="font-medium">Friday</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Tasks completed</span>
                      <span className="font-medium">24/30</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Completion rate</span>
                      <span className="font-medium">80%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Overall performance</span>
                      <span className="font-medium text-green-500">Excellent</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="habits" className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Morning routine compliance</span>
                      <span className="font-medium">6/7 days</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Daily planning session</span>
                      <span className="font-medium">5/7 days</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Evening reflection</span>
                      <span className="font-medium">4/7 days</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="focus" className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Total focus time</span>
                      <span className="font-medium">26.5 hours</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Average daily focus</span>
                      <span className="font-medium">3.8 hours</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Longest focus session</span>
                      <span className="font-medium">2.3 hours</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Strengths</h4>
                  <ul className="list-disc pl-5 space-y-1 text-green-800 dark:text-green-300">
                    <li>Excellent at completing high-priority tasks</li>
                    <li>Consistent morning productivity</li>
                    <li>Good at breaking down complex projects</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Areas for Improvement</h4>
                  <ul className="list-disc pl-5 space-y-1 text-amber-800 dark:text-amber-300">
                    <li>Tendency to postpone administrative tasks</li>
                    <li>Focus drops significantly after 3PM</li>
                    <li>Could delegate more effectively</li>
                  </ul>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                  Get Detailed Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
