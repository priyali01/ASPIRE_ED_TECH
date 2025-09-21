"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Mail, Phone, Calendar, Award, Target, BookOpen, TrendingUp, Star, Clock, Users } from "lucide-react"

export default function ProfilePage() {
  const achievements = [
    { name: "Career Explorer", description: "Completed career assessment", icon: Target, earned: true },
    { name: "College Hunter", description: "Explored 10+ colleges", icon: BookOpen, earned: true },
    { name: "Scholarship Seeker", description: "Applied to 5 scholarships", icon: Award, earned: false },
    { name: "Mentor Connect", description: "Connected with a mentor", icon: Users, earned: true },
    { name: "Goal Setter", description: "Set career goals", icon: TrendingUp, earned: true },
    { name: "Early Bird", description: "Joined ASPIRE in first month", icon: Clock, earned: true },
  ]

  const recentActivity = [
    { action: "Completed Career Assessment", time: "2 hours ago", type: "assessment" },
    { action: "Saved IIT Delhi to favorites", time: "1 day ago", type: "college" },
    { action: "Applied for INSPIRE Scholarship", time: "3 days ago", type: "scholarship" },
    { action: "Messaged mentor Dr. Priya Sharma", time: "5 days ago", type: "mentorship" },
    { action: "Updated profile information", time: "1 week ago", type: "profile" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />

      <main className="flex-1 p-6 ml-64">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">Track your progress and manage your ASPIRE journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl">AS</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold mb-1">Arjun Sharma</h2>
                    <p className="text-muted-foreground mb-4">Aspiring Software Engineer</p>

                    <div className="w-full space-y-3 text-left">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>Srinagar, Jammu & Kashmir</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>arjun.sharma@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Joined March 2024</span>
                      </div>
                    </div>

                    <Button className="w-full mt-6 gradient-cta text-white">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Completion</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Career Exploration</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>College Research</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Scholarship Applications</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Academic Information */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Current Education</h4>
                          <Badge variant="secondary">Class 12 - Science Stream</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Board</h4>
                          <Badge variant="secondary">JKBOSE</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Subjects</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge size="sm">Physics</Badge>
                            <Badge size="sm">Chemistry</Badge>
                            <Badge size="sm">Mathematics</Badge>
                            <Badge size="sm">Computer Science</Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Expected Graduation</h4>
                          <Badge variant="secondary">May 2024</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Career Interests */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Career Interests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Primary Interest</h4>
                          <Badge className="bg-primary text-primary-foreground">Software Engineering</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Secondary Interests</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Data Science</Badge>
                            <Badge variant="outline">Artificial Intelligence</Badge>
                            <Badge variant="outline">Cybersecurity</Badge>
                            <Badge variant="outline">Web Development</Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Python</Badge>
                            <Badge variant="secondary">JavaScript</Badge>
                            <Badge variant="secondary">React</Badge>
                            <Badge variant="secondary">Machine Learning</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Saved Items */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Saved Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">12</div>
                          <div className="text-sm text-muted-foreground">Colleges</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">8</div>
                          <div className="text-sm text-muted-foreground">Scholarships</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">3</div>
                          <div className="text-sm text-muted-foreground">Mentors</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Achievements & Badges</CardTitle>
                      <CardDescription>Track your progress and unlock new achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${
                              achievement.earned ? "bg-primary/10 border-primary/20" : "bg-muted/50 border-muted"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${
                                  achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <achievement.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{achievement.name}</h4>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              </div>
                              {achievement.earned && <Star className="w-5 h-5 text-yellow-500 ml-auto" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your recent actions on ASPIRE</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">{activity.time}</p>
                            </div>
                            <Badge variant="outline" size="sm">
                              {activity.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="goals" className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Career Goals</CardTitle>
                      <CardDescription>Set and track your career objectives</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg border border-primary/20 bg-primary/10">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Get into IIT for Computer Science</h4>
                          <Badge>In Progress</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Target: JEE Advanced 2024</p>
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">75% complete</p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Secure Merit Scholarship</h4>
                          <Badge variant="outline">Planned</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Apply to top 5 scholarship programs</p>
                        <Progress value={40} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">40% complete</p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Build Programming Portfolio</h4>
                          <Badge variant="outline">Planned</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Create 5 projects showcasing skills</p>
                        <Progress value={20} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">20% complete</p>
                      </div>

                      <Button className="w-full gradient-cta text-white">Add New Goal</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
