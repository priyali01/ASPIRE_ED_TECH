"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Shield, Palette, Globe, HelpCircle } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
  })

  const [profile, setProfile] = useState({
    name: "Priyali Chaudhari",
    email: "priiyalichaudhari@gmail.com",
    phone: "9099045613",
    location: "Srinagar, Jammu & Kashmir",
    bio: "Aspiring towards meaningful career choices and learning opportunities.",
    profilePic: "/images/priyali-chaudhari.jpg", // place this file in public/images/
  })

  const handleProfilePhotoChange = (file?: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfile((prev) => ({ ...prev, profilePic: (e.target?.result as string) || "" }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />

      <main className="flex-1 p-6 ml-64">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Help
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      {profile.profilePic ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <AvatarImage src={profile.profilePic} alt="Profile" />
                      ) : (
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      )}
                      <AvatarFallback className="text-lg">PC</AvatarFallback>
                    </Avatar>
                    <div>
                      <label htmlFor="profile-photo" className="mb-2 inline-block">
                        <Button variant="outline" className="bg-transparent">
                          Change Photo
                        </Button>
                      </label>
                      <input
                        id="profile-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleProfilePhotoChange(e.target.files?.[0] ?? null)}
                      />
                      <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button className="gradient-cta text-white">Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Your educational background and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Current Education Level</Label>
                      <Badge variant="secondary">Class 12 - Science</Badge>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Career Field</Label>
                      <Badge variant="secondary">Technology</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Artificial Intelligence</Badge>
                      <Badge>Software Development</Badge>
                      <Badge>Data Science</Badge>
                      <Badge>Robotics</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text messages</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-notifications">Marketing Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional content</p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to mentors</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help improve our services with usage data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Third-party Integrations</Label>
                      <p className="text-sm text-muted-foreground">Allow connections with external services</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base">Theme</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
                        <div className="w-full h-20 bg-white border rounded mb-2"></div>
                        <p className="text-sm text-center">Light</p>
                      </div>
                      <div className="p-4 border rounded-lg cursor-pointer hover:border-primary border-primary">
                        <div className="w-full h-20 bg-gradient-to-br from-blue-50 to-indigo-50 border rounded mb-2"></div>
                        <p className="text-sm text-center">ASPIRE (Default)</p>
                      </div>
                      <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
                        <div className="w-full h-20 bg-slate-900 border rounded mb-2"></div>
                        <p className="text-sm text-center">Dark</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Language & Region</CardTitle>
                  <CardDescription>Set your preferred language and regional settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>English</option>
                      <option>हिंदी (Hindi)</option>
                      <option>اردو (Urdu)</option>
                      <option>ڈوگری (Dogri)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>India</option>
                      <option>Jammu & Kashmir</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Asia/Kolkata (IST)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="help" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Get help and support for using ASPIRE</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                      <h3 className="font-semibold mb-1">User Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn how to use ASPIRE effectively</p>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                      <h3 className="font-semibold mb-1">FAQ</h3>
                      <p className="text-sm text-muted-foreground">Find answers to common questions</p>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                      <h3 className="font-semibold mb-1">Contact Support</h3>
                      <p className="text-sm text-muted-foreground">Get help from our support team</p>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                      <h3 className="font-semibold mb-1">Feedback</h3>
                      <p className="text-sm text-muted-foreground">Share your thoughts and suggestions</p>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
