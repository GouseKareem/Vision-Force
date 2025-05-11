
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle, Plus, Bell, Calendar, Clock, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock task data
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

interface Activity {
  id: number;
  action: string;
  item: string;
  time: string;
}

interface User {
  id: number;
  name: string;
  action: string;
  time: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Complete project proposal", completed: true, priority: 'high', deadline: "2025-05-15" },
  { id: 2, title: "Team meeting at 2 PM", completed: false, priority: 'medium', deadline: "2025-05-09" },
  { id: 3, title: "Review design mockups", completed: false, priority: 'high', deadline: "2025-05-10" },
  { id: 4, title: "Update documentation", completed: false, priority: 'low', deadline: "2025-05-12" }
];

const initialActivities: Activity[] = [
  { id: 1, action: "Completed task", item: "Design homepage mockup", time: "2 hours ago" },
  { id: 2, action: "Added comment", item: "On 'API Integration' task", time: "3 hours ago" },
  { id: 3, action: "Created task", item: "Prepare client presentation", time: "5 hours ago" },
  { id: 4, action: "Updated status", item: "Backend development", time: "1 day ago" },
  { id: 5, action: "Assigned task", item: "QA Testing to David", time: "1 day ago" }
];

const initialTeamUpdates: User[] = [
  { id: 1, name: "Alex Chen", action: "completed 'Database Migration'", time: "1 hour ago" },
  { id: 2, name: "Sarah Johnson", action: "added comments to 'UX Improvements'", time: "3 hours ago" },
  { id: 3, name: "Michael Wang", action: "created new task 'Security Audit'", time: "5 hours ago" }
];

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [teamUpdates, setTeamUpdates] = useState<User[]>(initialTeamUpdates);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    priority: 'medium',
    deadline: new Date().toISOString().split('T')[0]
  });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [activeTimeframe, setActiveTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  
  // Complete a task
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    const taskName = tasks.find(t => t.id === id)?.title;
    const wasCompleted = tasks.find(t => t.id === id)?.completed;
    
    toast({
      title: wasCompleted ? "Task marked as incomplete" : "Task completed",
      description: taskName,
    });
    
    // Add to activities if completed
    if (!wasCompleted) {
      const newActivity = {
        id: activities.length + 1,
        action: "Completed task",
        item: taskName || "Unknown task",
        time: "Just now"
      };
      setActivities([newActivity, ...activities]);
    }
  };
  
  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const newTaskObject: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: newTask.title,
      priority: newTask.priority,
      deadline: newTask.deadline,
      completed: false
    };
    
    setTasks([...tasks, newTaskObject]);
    
    // Add to activities
    const newActivity = {
      id: activities.length + 1,
      action: "Created task",
      item: newTask.title,
      time: "Just now"
    };
    setActivities([newActivity, ...activities]);
    
    toast({
      title: "Task created",
      description: `"${newTask.title}" has been added to your tasks`,
    });
    
    // Reset form and close dialog
    setNewTask({
      title: '',
      priority: 'medium',
      deadline: new Date().toISOString().split('T')[0]
    });
    setIsAddTaskOpen(false);
  };
  
  // Delete a task
  const deleteTask = (id: number) => {
    const taskToDelete = tasks.find(t => t.id === id);
    
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== id));
      
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed`,
      });
      
      // Add to activities
      const newActivity = {
        id: activities.length + 1,
        action: "Deleted task",
        item: taskToDelete.title,
        time: "Just now"
      };
      setActivities([newActivity, ...activities]);
    }
  };
  
  // View task details
  const viewTaskDetails = (id: number) => {
    navigate(`/tasks?highlight=${id}`);
  };
  
  // Toggle notifications panel
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      // Reset notification count when opening panel
      setNotificationCount(0);
    }
  };
  
  // Change chart timeframe
  const changeTimeframe = (timeframe: 'weekly' | 'monthly') => {
    setActiveTimeframe(timeframe);
    toast({
      title: `Switched to ${timeframe} view`,
      description: `Now showing ${timeframe} statistics`,
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container pt-32 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={toggleNotifications}
            >
              <Bell size={18} />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
            
            <Button 
              onClick={() => setIsAddTaskOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
            >
              <Plus size={16} className="mr-1" /> Add Task
            </Button>
          </div>
        </div>
        
        {isNotificationOpen && (
          <Card className="mb-6 glass-card animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Notifications</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleNotifications}>
                  <X size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Task Deadline Approaching</p>
                    <p className="text-sm text-muted-foreground">"Team meeting at 2 PM" is due today</p>
                    <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <Bell className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">New Task Assignment</p>
                    <p className="text-sm text-muted-foreground">Sarah assigned you to "Review marketing materials"</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Task Completed</p>
                    <p className="text-sm text-muted-foreground">Alex completed "Update API documentation"</p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Tasks Overview</CardTitle>
              <CardDescription>Your current task status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium">{Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">In Progress</span>
                    <span className="text-sm font-medium">{Math.round((tasks.filter(t => !t.completed && t.priority === 'high').length / tasks.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.round((tasks.filter(t => !t.completed && t.priority === 'high').length / tasks.length) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Not Started</span>
                    <span className="text-sm font-medium">{Math.round((tasks.filter(t => !t.completed && t.priority !== 'high').length / tasks.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-gray-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.round((tasks.filter(t => !t.completed && t.priority !== 'high').length / tasks.length) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/tasks')}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Today's Focus</CardTitle>
              <CardDescription>Priority tasks for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((item) => (
                  <div key={item.id} className="flex items-center group">
                    <button 
                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 transition-colors ${item.completed ? 'bg-green-100' : 'border border-gray-300 hover:bg-gray-100'}`}
                      onClick={() => toggleTaskCompletion(item.id)}
                    >
                      {item.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </button>
                    <span className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {item.title}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => viewTaskDetails(item.id)}
                      >
                        <Clock size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => deleteTask(item.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsAddTaskOpen(true)}
              >
                Add Task
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Weekly Goal</CardTitle>
                <div className="flex space-x-1">
                  <Button 
                    variant={activeTimeframe === 'weekly' ? "secondary" : "ghost"} 
                    size="sm"
                    onClick={() => changeTimeframe('weekly')}
                  >
                    Weekly
                  </Button>
                  <Button 
                    variant={activeTimeframe === 'monthly' ? "secondary" : "ghost"} 
                    size="sm"
                    onClick={() => changeTimeframe('monthly')}
                  >
                    Monthly
                  </Button>
                </div>
              </div>
              <CardDescription>Progress towards your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-secondary"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-purple-500"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                      strokeDasharray="352"
                      strokeDashoffset={activeTimeframe === 'weekly' ? "141" : "88"}
                      style={{transition: "stroke-dashoffset 0.5s ease-in-out"}}
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold">{activeTimeframe === 'weekly' ? '60%' : '75%'}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  You're {activeTimeframe === 'weekly' ? 'on track' : 'ahead'} on your {activeTimeframe} goal
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/analytics')}
              >
                View Goals
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.item}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: "Client presentation", deadline: "Tomorrow, 3 PM", urgent: true },
                  { task: "Weekly report submission", deadline: "Friday, 5 PM", urgent: false },
                  { task: "Team retrospective meeting", deadline: "Next Monday, 10 AM", urgent: false }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {item.deadline}
                      </div>
                    </div>
                    {item.urgent && (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Team Updates</CardTitle>
              <CardDescription>Recent team activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamUpdates.map((user) => (
                  <div key={user.id} className="flex items-start hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-purple-600">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p><span className="font-medium">{user.name}</span> {user.action}</p>
                      <p className="text-sm text-muted-foreground">{user.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task to keep track of your work.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Task Title
              </label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="deadline" className="text-sm font-medium">
                Deadline
              </label>
              <Input
                id="deadline"
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
