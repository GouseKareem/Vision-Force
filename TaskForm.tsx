
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: Task) => void;
  initialTask?: Task;
  mode: 'create' | 'edit';
}

const defaultTask: Task = {
  id: Date.now(),
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  deadline: new Date().toISOString().split('T')[0],
  assignee: "You",
  tags: []
};

export default function TaskForm({ open, onOpenChange, onSave, initialTask, mode }: TaskFormProps) {
  const [task, setTask] = useState<Task>(initialTask || {...defaultTask, id: Date.now()});
  const [tagInput, setTagInput] = useState("");
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !task.tags.includes(tagInput.trim())) {
      setTask(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTask(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }
    
    onSave(task);
    toast({
      title: mode === 'create' ? "Task Created" : "Task Updated",
      description: `Successfully ${mode === 'create' ? 'created' : 'updated'} task: ${task.title}`,
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new task to your board.' 
              : 'Make changes to your task here.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              name="title" 
              value={task.title} 
              onChange={handleInputChange} 
              placeholder="Task title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={task.description} 
              onChange={handleInputChange}
              placeholder="Describe your task"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={task.status} 
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={task.priority} 
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input 
                id="deadline" 
                name="deadline" 
                type="date"
                value={task.deadline} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select 
                value={task.assignee} 
                onValueChange={(value) => handleSelectChange("assignee", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="You">You</SelectItem>
                  <SelectItem value="Alex">Alex</SelectItem>
                  <SelectItem value="Sarah">Sarah</SelectItem>
                  <SelectItem value="Mike">Mike</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex space-x-2">
              <Input 
                value={tagInput} 
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag" 
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
            
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {task.tags.map((tag, index) => (
                  <div 
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center text-sm"
                  >
                    {tag}
                    <button 
                      type="button"
                      className="ml-1 text-primary hover:text-primary/80"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Task' : 'Update Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
