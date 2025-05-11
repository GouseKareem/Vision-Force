
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, CheckCircle, Clock, List, Grid, Edit, Trash, Info, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TaskForm from '@/components/tasks/TaskForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Task type definition
interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  deadline: string;
  assignee: string;
  tags: string[];
}

// Initial mock tasks data
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design homepage wireframes",
    description: "Create wireframes for the new homepage layout",
    status: "todo",
    priority: "high",
    deadline: "2023-05-15",
    assignee: "You",
    tags: ["Design", "Website"]
  },
  {
    id: 2,
    title: "Set up analytics dashboard",
    description: "Implement Google Analytics and create custom dashboard",
    status: "in-progress",
    priority: "medium",
    deadline: "2023-05-18",
    assignee: "Sarah",
    tags: ["Analytics", "Dashboard"]
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Document all endpoints for the new API version",
    status: "in-progress",
    priority: "medium",
    deadline: "2023-05-20",
    assignee: "You",
    tags: ["Documentation", "API"]
  },
  {
    id: 4,
    title: "Create user flow diagrams",
    description: "Map out the user journey for the onboarding process",
    status: "todo",
    priority: "low",
    deadline: "2023-05-25",
    assignee: "Alex",
    tags: ["UX", "Planning"]
  },
  {
    id: 5,
    title: "QA Testing for release",
    description: "Perform quality assurance testing for the upcoming release",
    status: "todo",
    priority: "high",
    deadline: "2023-05-17",
    assignee: "Mike",
    tags: ["QA", "Testing"]
  },
  {
    id: 6,
    title: "Update dependencies",
    description: "Update all npm packages to their latest versions",
    status: "completed",
    priority: "low",
    deadline: "2023-05-10",
    assignee: "You",
    tags: ["Maintenance", "Dependencies"]
  },
  {
    id: 7,
    title: "Implement social login",
    description: "Add Google and Facebook login options",
    status: "completed",
    priority: "medium",
    deadline: "2023-05-12",
    assignee: "You",
    tags: ["Authentication", "Feature"]
  }
];

// Priority colors
const priorityColors: Record<string, string> = {
  high: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
};

const TasksPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined);
  const [taskToView, setTaskToView] = useState<Task | undefined>(undefined);
  const { toast } = useToast();

  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === "todo");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const completedTasks = tasks.filter(task => task.status === "completed");

  // Handle task creation or editing
  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    setEditingTask(undefined);
  };

  // Open edit form
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskFormOpen(true);
  };

  // Prepare for task deletion
  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
  };

  // Confirm task deletion
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      toast({
        title: "Task Deleted",
        description: `"${taskToDelete.title}" has been deleted`,
      });
      setTaskToDelete(undefined);
    }
  };

  // Handle opening new task form
  const handleAddTaskClick = (status?: "todo" | "in-progress" | "completed") => {
    const newTask = status ? { ...getDefaultTask(), status } : getDefaultTask();
    setEditingTask(undefined);
    setTaskFormOpen(true);
  };

  // Generate a default task structure
  const getDefaultTask = (): Task => ({
    id: Date.now(),
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    deadline: new Date().toISOString().split('T')[0],
    assignee: "You",
    tags: []
  });

  // View task details
  const handleViewTask = (task: Task) => {
    setTaskToView(task);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container pt-32 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-background border border-border rounded-lg">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-r-none ${viewMode === 'kanban' ? 'bg-secondary' : ''}`}
                onClick={() => setViewMode('kanban')}
              >
                <Grid size={18} className="mr-1" /> Kanban
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`rounded-l-none ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} className="mr-1" /> List
              </Button>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
              onClick={() => handleAddTaskClick()}
            >
              <Plus size={16} className="mr-1" /> Add Task
            </Button>
          </div>
        </div>
        
        {viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Todo Column */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  To Do ({todoTasks.length})
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleAddTaskClick("todo")}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="space-y-3">
                {todoTasks.map(task => (
                  <Card key={task.id} className="task-card hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {task.deadline}
                        </div>
                        <div>{task.assignee}</div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewTask(task)}
                        >
                          <Info size={15} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditTask(task)}
                        >
                          <Edit size={15} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                          onClick={() => handleDeleteClick(task)}
                        >
                          <Trash size={15} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* In Progress Column */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  In Progress ({inProgressTasks.length})
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleAddTaskClick("in-progress")}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="space-y-3">
                {inProgressTasks.map(task => (
                  <Card key={task.id} className="task-card hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {task.deadline}
                        </div>
                        <div>{task.assignee}</div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewTask(task)}
                        >
                          <Info size={15} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditTask(task)}
                        >
                          <Edit size={15} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                          onClick={() => handleDeleteClick(task)}
                        >
                          <Trash size={15} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Completed Column */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Completed ({completedTasks.length})
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleAddTaskClick("completed")}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <Card key={task.id} className="task-card hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium line-through text-muted-foreground">{task.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {task.deadline}
                        </div>
                        <div>{task.assignee}</div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewTask(task)}
                        >
                          <Info size={15} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditTask(task)}
                        >
                          <Edit size={15} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                          onClick={() => handleDeleteClick(task)}
                        >
                          <Trash size={15} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Tasks</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar size={14} className="mr-1" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort By
                  </Button>
                </div>
              </div>
              <CardDescription>Manage and track all your tasks in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="todo">To Do</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
                        <div className="col-span-4">Task</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Priority</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-1">Assignee</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                      
                      {tasks.map((task) => (
                        <div key={task.id} className="p-4 grid grid-cols-12 items-center border-t">
                          <div className="col-span-4">
                            <div className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                              {task.title}
                            </div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center">
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                task.status === 'todo' ? 'bg-yellow-500' :
                                task.status === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
                              }`}></span>
                              <span className="text-sm">
                                {task.status === 'todo' ? 'To Do' :
                                 task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Clock size={14} className="mr-1 text-muted-foreground" />
                            <span className="text-sm">{task.deadline}</span>
                          </div>
                          <div className="col-span-1">
                            <div className="text-sm">{task.assignee}</div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleViewTask(task)}
                              >
                                <Info size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleEditTask(task)}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-red-500"
                                onClick={() => handleDeleteClick(task)}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="todo">
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
                        <div className="col-span-4">Task</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Priority</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-1">Assignee</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                      
                      {todoTasks.length > 0 ? todoTasks.map((task) => (
                        <div key={task.id} className="p-4 grid grid-cols-12 items-center border-t">
                          <div className="col-span-4">
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center">
                              <span className="w-2 h-2 rounded-full mr-2 bg-yellow-500"></span>
                              <span className="text-sm">To Do</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Clock size={14} className="mr-1 text-muted-foreground" />
                            <span className="text-sm">{task.deadline}</span>
                          </div>
                          <div className="col-span-1">
                            <div className="text-sm">{task.assignee}</div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleViewTask(task)}
                              >
                                <Info size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleEditTask(task)}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-red-500"
                                onClick={() => handleDeleteClick(task)}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-muted-foreground">
                          No tasks in this category
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="in-progress">
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
                        <div className="col-span-4">Task</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Priority</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-1">Assignee</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                      
                      {inProgressTasks.length > 0 ? inProgressTasks.map((task) => (
                        <div key={task.id} className="p-4 grid grid-cols-12 items-center border-t">
                          <div className="col-span-4">
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center">
                              <span className="w-2 h-2 rounded-full mr-2 bg-blue-500"></span>
                              <span className="text-sm">In Progress</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Clock size={14} className="mr-1 text-muted-foreground" />
                            <span className="text-sm">{task.deadline}</span>
                          </div>
                          <div className="col-span-1">
                            <div className="text-sm">{task.assignee}</div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleViewTask(task)}
                              >
                                <Info size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleEditTask(task)}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-red-500"
                                onClick={() => handleDeleteClick(task)}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-muted-foreground">
                          No tasks in this category
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
                        <div className="col-span-4">Task</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Priority</div>
                        <div className="col-span-2">Deadline</div>
                        <div className="col-span-1">Assignee</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                      
                      {completedTasks.length > 0 ? completedTasks.map((task) => (
                        <div key={task.id} className="p-4 grid grid-cols-12 items-center border-t">
                          <div className="col-span-4">
                            <div className="font-medium line-through text-muted-foreground">{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center">
                              <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                              <span className="text-sm">Completed</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Clock size={14} className="mr-1 text-muted-foreground" />
                            <span className="text-sm">{task.deadline}</span>
                          </div>
                          <div className="col-span-1">
                            <div className="text-sm">{task.assignee}</div>
                          </div>
                          <div className="col-span-1">
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleViewTask(task)}
                              >
                                <Info size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => handleEditTask(task)}
                              >
                                <Edit size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0 text-red-500"
                                onClick={() => handleDeleteClick(task)}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-muted-foreground">
                          No tasks in this category
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Task Form Dialog */}
      <TaskForm
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        onSave={handleSaveTask}
        initialTask={editingTask}
        mode={editingTask ? 'edit' : 'create'}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the task "{taskToDelete?.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTask} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Task Details Dialog */}
      <Dialog open={!!taskToView} onOpenChange={() => setTaskToView(undefined)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{taskToView?.title}</DialogTitle>
            <DialogDescription>
              Task details and information
            </DialogDescription>
          </DialogHeader>
          
          {taskToView && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{taskToView.description || "No description provided"}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      taskToView.status === 'todo' ? 'bg-yellow-500' :
                      taskToView.status === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></span>
                    <span>
                      {taskToView.status === 'todo' ? 'To Do' :
                      taskToView.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Priority</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[taskToView.priority]}`}>
                    {taskToView.priority}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Deadline</h4>
                  <div className="flex items-center text-sm">
                    <Calendar size={14} className="mr-1" />
                    {taskToView.deadline}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Assignee</h4>
                  <p className="text-sm">{taskToView.assignee}</p>
                </div>
              </div>
              
              {taskToView.tags && taskToView.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {taskToView.tags.map((tag, index) => (
                      <div 
                        key={index}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setTaskToView(undefined)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleEditTask(taskToView);
                    setTaskToView(undefined);
                  }}
                >
                  <Edit size={14} className="mr-1" /> Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default TasksPage;
