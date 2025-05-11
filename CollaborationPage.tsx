
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MessageSquare, Users, Calendar } from 'lucide-react';

// Mock data
const mockTeams = [
  {
    id: 1,
    name: "Product Development",
    members: 8,
    boards: 5,
    activity: "High",
    lastActive: "Just now"
  },
  {
    id: 2,
    name: "Marketing Campaign",
    members: 5,
    boards: 3,
    activity: "Medium",
    lastActive: "2 hours ago"
  },
  {
    id: 3,
    name: "Website Redesign",
    members: 4,
    boards: 2,
    activity: "High",
    lastActive: "30 minutes ago"
  },
  {
    id: 4,
    name: "Customer Success",
    members: 6,
    boards: 4,
    activity: "Low",
    lastActive: "1 day ago"
  }
];

const mockSharedBoards = [
  {
    id: 1,
    name: "Q2 Roadmap",
    team: "Product Development",
    owner: "Alex Chen",
    lastEdited: "10 minutes ago",
    status: "Active"
  },
  {
    id: 2,
    name: "Content Calendar",
    team: "Marketing Campaign",
    owner: "Sarah Johnson",
    lastEdited: "1 hour ago",
    status: "Active"
  },
  {
    id: 3,
    name: "UI Component Library",
    team: "Website Redesign",
    owner: "You",
    lastEdited: "Yesterday",
    status: "Active"
  },
  {
    id: 4,
    name: "User Onboarding Flow",
    team: "Customer Success",
    owner: "Mike Wang",
    lastEdited: "3 days ago",
    status: "Archived"
  }
];

const mockTeamMembers = [
  { id: 1, name: "Alex Chen", role: "Product Manager", avatar: "AC", status: "online" },
  { id: 2, name: "Sarah Johnson", role: "UX Designer", avatar: "SJ", status: "online" },
  { id: 3, name: "Mike Wang", role: "Developer", avatar: "MW", status: "offline" },
  { id: 4, name: "Lisa Park", role: "Content Writer", avatar: "LP", status: "away" }
];

const mockComments = [
  {
    id: 1,
    user: { name: "Sarah Johnson", avatar: "SJ" },
    task: "Homepage Redesign",
    comment: "I've updated the color palette based on our last discussion. Let me know what you think!",
    time: "10 minutes ago"
  },
  {
    id: 2,
    user: { name: "Alex Chen", avatar: "AC" },
    task: "Analytics Dashboard",
    comment: "The new chart component looks great. Can we add filtering capability?",
    time: "1 hour ago"
  },
  {
    id: 3,
    user: { name: "Mike Wang", avatar: "MW" },
    task: "API Integration",
    comment: "I've encountered an issue with the authentication flow. Need to discuss with the backend team.",
    time: "3 hours ago"
  }
];

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500"
};

const activityColors: Record<string, string> = {
  High: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
  Medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
  Low: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
};

const CollaborationPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  
  const selectBoard = (boardId: number) => {
    setSelectedBoard(selectedBoard === boardId ? null : boardId);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container pt-32 pb-16">
        <h1 className="text-3xl font-bold mb-6">Collaboration</h1>
        
        <Tabs defaultValue="boards" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="boards">Shared Boards</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                <Plus size={16} className="mr-1" /> Create New
              </Button>
            </div>
          </div>
          
          <TabsContent value="boards" className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Shared Boards</CardTitle>
                <CardDescription>Boards you've created or been invited to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-4 grid grid-cols-12 font-medium">
                    <div className="col-span-4">Board Name</div>
                    <div className="col-span-3">Team</div>
                    <div className="col-span-2">Owner</div>
                    <div className="col-span-2">Last Edited</div>
                    <div className="col-span-1">Status</div>
                  </div>
                  
                  {mockSharedBoards.map(board => (
                    <div key={board.id} className={`p-4 grid grid-cols-12 items-center border-t transition-colors ${
                      selectedBoard === board.id ? 'bg-secondary/50' : ''
                    } hover:bg-secondary/30 cursor-pointer`}
                    onClick={() => selectBoard(board.id)}>
                      <div className="col-span-4 font-medium">{board.name}</div>
                      <div className="col-span-3">{board.team}</div>
                      <div className="col-span-2">{board.owner}</div>
                      <div className="col-span-2 text-sm text-muted-foreground">{board.lastEdited}</div>
                      <div className="col-span-1">
                        <Badge variant={board.status === 'Active' ? 'default' : 'secondary'}>
                          {board.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {selectedBoard && (
              <Card className="glass-card animate-scale-in">
                <CardHeader className="pb-2">
                  <CardTitle>{mockSharedBoards.find(b => b.id === selectedBoard)?.name}</CardTitle>
                  <CardDescription>
                    Team: {mockSharedBoards.find(b => b.id === selectedBoard)?.team}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Members</h3>
                        <div className="flex flex-wrap gap-2">
                          {mockTeamMembers.map(member => (
                            <div key={member.id} className="flex items-center">
                              <div className="relative">
                                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium">
                                  {member.avatar}
                                </div>
                                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-background ${statusColors[member.status]}`}></span>
                              </div>
                            </div>
                          ))}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                            <Plus size={12} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Last Updated</h3>
                        <p className="text-sm">
                          {mockSharedBoards.find(b => b.id === selectedBoard)?.lastEdited} by{' '}
                          {mockSharedBoards.find(b => b.id === selectedBoard)?.owner}
                        </p>
                      </div>
                      
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Actions</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <MessageSquare size={14} className="mr-1" /> Comment
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <Users size={14} className="mr-1" /> Share
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Tasks</h3>
                        <Button variant="outline" size="sm">
                          <Plus size={14} className="mr-1" /> Add Task
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          { id: 1, title: "Design homepage wireframes", assignee: "Sarah", status: "In Progress", dueDate: "Tomorrow" },
                          { id: 2, title: "Create component library", assignee: "You", status: "Todo", dueDate: "Next week" },
                          { id: 3, title: "Implement dark mode", assignee: "Mike", status: "In Progress", dueDate: "Friday" }
                        ].map(task => (
                          <div key={task.id} className="bg-background/50 rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">Assigned to {task.assignee}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant={
                                task.status === 'Todo' ? 'outline' :
                                task.status === 'In Progress' ? 'secondary' : 'default'
                              }>
                                {task.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Calendar size={12} className="mr-1" /> {task.dueDate}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Comments</h3>
                      <div className="space-y-4 mb-4">
                        {mockComments.slice(0, 2).map(comment => (
                          <div key={comment.id} className="bg-secondary/50 rounded-lg p-3">
                            <div className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-medium mr-3">
                                {comment.user.avatar}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium">{comment.user.name}</p>
                                  <span className="text-xs text-muted-foreground ml-2">{comment.time}</span>
                                </div>
                                <p className="text-sm mt-1">{comment.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {showCommentInput ? (
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <textarea
                            className="w-full p-2 rounded-md bg-background border border-border focus:outline-none focus:ring-1 focus:ring-purple-500"
                            rows={3}
                            placeholder="Add your comment..."
                          ></textarea>
                          <div className="flex justify-end mt-2 space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setShowCommentInput(false)}>
                              Cancel
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center"
                          onClick={() => setShowCommentInput(true)}
                        >
                          <MessageSquare size={14} className="mr-2" /> Add Comment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTeams.map(team => (
                <Card key={team.id} className="glass-card task-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">{team.members} members</p>
                      </div>
                      <Badge className={activityColors[team.activity]}>
                        {team.activity} Activity
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Members</p>
                        <div className="flex -space-x-2">
                          {Array.from({ length: Math.min(team.members, 5) }).map((_, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-xs font-medium border-2 border-background"
                            >
                              {i < 4 ? mockTeamMembers[i]?.avatar || "U" : `+${team.members - 4}`}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Boards</p>
                          <p>{team.boards} active boards</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Last Active</p>
                          <p>{team.lastActive}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end border-t border-border">
                        <Button variant="outline" size="sm" className="mr-2">
                          <Users size={14} className="mr-1" /> Manage
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                          <Plus size={14} className="mr-1" /> New Board
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="glass-card border-dashed border-2 flex items-center justify-center h-64">
                <div className="text-center p-6">
                  <div className="mb-4 bg-secondary w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Plus size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Create New Team</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start collaborating with your colleagues</p>
                  <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                    <Plus size={16} className="mr-1" /> New Team
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Recent updates across all your teams and boards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Sarah Johnson", action: "commented on", item: "Homepage Redesign", time: "10 minutes ago", avatar: "SJ" },
                    { user: "Alex Chen", action: "created a task", item: "Implement Authentication", time: "1 hour ago", avatar: "AC" },
                    { user: "You", action: "completed", item: "Update Documentation", time: "3 hours ago", avatar: "YO" },
                    { user: "Mike Wang", action: "updated", item: "API Integration", time: "5 hours ago", avatar: "MW" },
                    { user: "Lisa Park", action: "joined team", item: "Product Development", time: "1 day ago", avatar: "LP" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-sm font-medium mr-3">
                        {activity.avatar}
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.item}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 text-center">
                    <Button variant="outline">
                      Load More Activities
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CollaborationPage;
