"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import * as Recharts from "recharts"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function SoftwareEngineeringPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [compareLeft, setCompareLeft] = useState("B.Tech CSE")
  const [compareRight, setCompareRight] = useState("BCA")
  const [maxFee, setMaxFee] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [instType, setInstType] = useState<string>("any")

  const lineData = [
    { year: "2019", india: 8, global: 10 },
    { year: "2020", india: 9, global: 12 },
    { year: "2021", india: 11, global: 14 },
    { year: "2022", india: 12, global: 16 },
    { year: "2023", india: 13, global: 15 },
    { year: "2024", india: 14, global: 17 },
  ]

  const salaryData = [
    { level: "Entry", india: 6, global: 70 },
    { level: "Mid", india: 18, global: 120 },
    { level: "Senior", india: 35, global: 180 },
  ]

  const industryData = [
    { name: "IT Services", value: 28 },
    { name: "Product", value: 32 },
    { name: "FinTech", value: 14 },
    { name: "E-commerce", value: 12 },
    { name: "Healthcare", value: 7 },
    { name: "Other", value: 7 },
  ]

  const chartConfig = {
    india: { label: "India", color: "#2563eb" },
    global: { label: "Global", color: "#60a5fa" },
  }

  const roles = [
    {
      title: "Software Developer",
      description: "Design, build, and maintain applications across frontend, backend, or full‑stack.",
      responsibilities: ["Implement features", "Fix bugs", "Write tests", "Code reviews"],
      skills: ["DSA", "JavaScript/TypeScript", "Git", "Databases", "Problem solving", "Communication"],
    },
    {
      title: "Backend Engineer",
      description: "Build APIs, services, and scalable systems with reliability and security.",
      responsibilities: ["Design schemas", "Write APIs", "Optimize performance", "Monitoring"],
      skills: ["Node/Java/Go", "SQL/NoSQL", "Caching", "Queues", "Cloud", "System design"],
    },
    {
      title: "Frontend Engineer",
      description: "Craft interactive, accessible, high‑performance web/mobile user interfaces.",
      responsibilities: ["UI implementation", "State management", "Accessibility", "Perf tuning"],
      skills: ["React/Next.js", "CSS", "TypeScript", "Testing", "UX collaboration"],
    },
    {
      title: "DevOps / SRE",
      description: "Own CI/CD, observability, scaling, and reliability of production systems.",
      responsibilities: ["Infra as code", "Pipelines", "Incident response", "Capacity planning"],
      skills: ["Linux", "Docker/K8s", "Monitoring", "Cloud", "Networking", "Automation"],
    },
  ]

  const colleges = useMemo(
    () => [
      { name: "IIT Bombay", type: "govt", city: "Mumbai", fee: 240000, avgPackage: 22 },
      { name: "IIIT Hyderabad", type: "pvt", city: "Hyderabad", fee: 300000, avgPackage: 31 },
      { name: "IIT Madras", type: "govt", city: "Chennai", fee: 220000, avgPackage: 25 },
      { name: "VIT Vellore", type: "pvt", city: "Vellore", fee: 210000, avgPackage: 9 },
      { name: "COEP Pune", type: "govt", city: "Pune", fee: 120000, avgPackage: 8 },
    ],
    [],
  )

  const filtered = colleges.filter((c) => {
    const feeOk = maxFee ? c.fee <= Number(maxFee) : true
    const locOk = location ? c.city.toLowerCase().includes(location.toLowerCase()) : true
    const typeOk = instType === "any" ? true : c.type === instType
    return feeOk && locOk && typeOk
  })

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Software Engineering</h1>
            <p className="text-muted-foreground text-lg">Explore analytics, roles, pathways, exams, colleges, and more.</p>
          </div>

          <section className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate (Jobs Demand)</CardTitle>
                <CardDescription>Year-over-year demand growth (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[16/9]">
                  <Recharts.LineChart data={lineData} margin={{ left: 12, right: 12 }}>
                    <Recharts.CartesianGrid strokeDasharray="3 3" />
                    <Recharts.XAxis dataKey="year" />
                    <Recharts.YAxis unit="%" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Recharts.Line type="monotone" dataKey="india" stroke="#2563eb" strokeWidth={2} dot={false} name="India" />
                    <Recharts.Line type="monotone" dataKey="global" stroke="#60a5fa" strokeWidth={2} dot={false} name="Global" />
                  </Recharts.LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Salary Range</CardTitle>
                <CardDescription>Comparison by seniority (₹ LPA vs $k)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[16/9]">
                  <Recharts.BarChart data={salaryData} margin={{ left: 12, right: 12 }}>
                    <Recharts.CartesianGrid strokeDasharray="3 3" />
                    <Recharts.XAxis dataKey="level" />
                    <Recharts.YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Recharts.Bar dataKey="india" fill="#2563eb" radius={[6, 6, 0, 0]} name="India (₹ LPA)" />
                    <Recharts.Bar dataKey="global" fill="#60a5fa" radius={[6, 6, 0, 0]} name="Global ($k)" />
                  </Recharts.BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Top Hiring Industries</CardTitle>
                <CardDescription>Share of roles by industry</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="aspect-[16/9]">
                  <Recharts.PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Recharts.Pie data={industryData} dataKey="value" nameKey="name" outerRadius={95} label>
                      {industryData.map((entry, index) => (
                        <Recharts.Cell
                          key={`cell-${index}`}
                          fill={["#2563eb", "#60a5fa", "#34d399", "#f59e0b", "#ef4444", "#a78bfa"][index % 6]}
                        />
                      ))}
                    </Recharts.Pie>
                  </Recharts.PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Future Outlook</CardTitle>
                <CardDescription>AI, automation, and emerging trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 space-y-2 text-sm text-muted-foreground">
                  <li>Rapid adoption of AI copilots increases developer productivity and demand for code review skills.</li>
                  <li>Cloud-native and platform engineering roles expand as companies standardize internal developer platforms.</li>
                  <li>Cybersecurity, data privacy, and compliance-by-design become core engineering responsibilities.</li>
                  <li>Edge computing, multimodal AI, and wasm open new runtime and product opportunities.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Subfields & Roles</CardTitle>
                <CardDescription>What they do, responsibilities, and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {roles.map((r) => (
                    <Card key={r.title} className="border-muted/60">
                      <CardHeader>
                        <CardTitle className="text-base">{r.title}</CardTitle>
                        <CardDescription>{r.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Daily responsibilities</p>
                            <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
                              {r.responsibilities.map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Required skills</p>
                            <div className="flex flex-wrap gap-2">
                              {r.skills.map((s) => (
                                <Badge key={s} variant="secondary">{s}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Day in the Life</CardTitle>
                <CardDescription>Watch a typical day of a software engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/ig7bC4Foj5I"
                    title="Day in the Life"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roadmap & Pathways</CardTitle>
                <CardDescription>Stream → Courses → Exams → Careers → Promotions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <iframe className="w-full h-full" src="/full-stack.pdf" title="Roadmap" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-1">Study timeline</p>
                    <p>3–4 yrs UG • 1–2 yrs PG • On-the-job learning</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Certifications</p>
                    <p>Cloud, Kubernetes, Security, Frontend/Backend frameworks</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Internships</p>
                    <p>1–2 internships recommended before graduation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Exams & Qualifications</CardTitle>
                <CardDescription>Entrance exams, degree requirements, and calendars</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="india">
                  <TabsList>
                    <TabsTrigger value="india">National</TabsTrigger>
                    <TabsTrigger value="global">International</TabsTrigger>
                  </TabsList>
                  <TabsContent value="india">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="jee">
                        <AccordionTrigger>JEE Main/Advanced</AccordionTrigger>
                        <AccordionContent>
                          Eligibility: Class 12 (PCM). Used for B.Tech admissions at IITs/NITs. Check calendar links on NTA.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="bitsat">
                        <AccordionTrigger>BITSAT</AccordionTrigger>
                        <AccordionContent>
                          Eligibility: Class 12 (PCM). Admissions for B.E. at BITS Pilani campuses.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="gate">
                        <AccordionTrigger>GATE (CS)</AccordionTrigger>
                        <AccordionContent>
                          Eligibility: Final year UG or graduates. For M.Tech/MS admissions and PSU roles.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  <TabsContent value="global">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="sat">
                        <AccordionTrigger>SAT/ACT</AccordionTrigger>
                        <AccordionContent>
                          UG admissions for CS abroad. Check College Board for dates.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="gre">
                        <AccordionTrigger>GRE + TOEFL/IELTS</AccordionTrigger>
                        <AccordionContent>
                          PG admissions (MS CS/SE). University-specific cutoffs; verify program pages.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
                  <Card className="border-muted/60"><CardHeader><CardTitle className="text-base">Degree Requirements</CardTitle><CardDescription>UG: B.Tech/BE (CSE/IT) • PG: M.Tech/MS/ME • Diplomas acceptable for some roles</CardDescription></CardHeader></Card>
                  <Card className="border-muted/60"><CardHeader><CardTitle className="text-base">Typical Cutoffs</CardTitle><CardDescription>Highly variable by institute; top IITs require top percentiles/ranks</CardDescription></CardHeader></Card>
                  <Card className="border-muted/60"><CardHeader><CardTitle className="text-base">Exam Calendars</CardTitle><CardDescription>Use official portals: NTA, JoSAA, university pages</CardDescription></CardHeader></Card>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Top Colleges & Institutions</CardTitle>
                <CardDescription>Filter by type, location, and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-3 mb-4">
                  <Select value={instType} onValueChange={setInstType}>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="govt">Govt</SelectItem>
                      <SelectItem value="pvt">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Max annual fee (₹)" value={maxFee} onChange={(e) => setMaxFee(e.target.value)} />
                  <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  <Link href="/colleges" className="inline-flex"><Button className="w-full">Explore Colleges</Button></Link>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>College</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Annual Fee</TableHead>
                        <TableHead>Avg Package (₹ LPA)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((c) => (
                        <TableRow key={c.name}>
                          <TableCell>{c.name}</TableCell>
                          <TableCell className="uppercase">{c.type}</TableCell>
                          <TableCell>{c.city}</TableCell>
                          <TableCell>₹{c.fee.toLocaleString("en-IN")}</TableCell>
                          <TableCell>{c.avgPackage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Course Comparison</CardTitle>
                <CardDescription>Compare two programs side by side</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <Select value={compareLeft} onValueChange={setCompareLeft}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B.Tech CSE">B.Tech CSE</SelectItem>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="B.Sc CS">B.Sc CS</SelectItem>
                      <SelectItem value="MCA">MCA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={compareRight} onValueChange={setCompareRight}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B.Tech CSE">B.Tech CSE</SelectItem>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="B.Sc CS">B.Sc CS</SelectItem>
                      <SelectItem value="MCA">MCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Criteria</TableHead>
                        <TableHead>{compareLeft}</TableHead>
                        <TableHead>{compareRight}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Duration</TableCell>
                        <TableCell>4 years</TableCell>
                        <TableCell>{compareRight === "MCA" ? "2 years" : compareRight === "BCA" ? "3 years" : "3 years"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Estimated Cost</TableCell>
                        <TableCell>₹6L–₹15L</TableCell>
                        <TableCell>{compareRight === "BCA" ? "₹2L–₹6L" : compareRight === "MCA" ? "₹2L–₹8L" : "₹2L–₹5L"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Admission Difficulty</TableCell>
                        <TableCell>High (JEE/BITSAT)</TableCell>
                        <TableCell>Moderate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Career Prospects</TableCell>
                        <TableCell>Excellent</TableCell>
                        <TableCell>Good</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Global Demand</TableCell>
                        <TableCell>Very High</TableCell>
                        <TableCell>High</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship & Alumni Insights</CardTitle>
                <CardDescription>Stories and guidance from professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-muted/60">
                    <CardHeader>
                      <CardTitle className="text-base">Alumni Story #{i}</CardTitle>
                      <CardDescription>
                        From student to engineer: breakthroughs, challenges, and tips.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-start gap-2">
                        <Button variant="secondary" size="sm">Read story</Button>
                        <Button size="sm">Request mentorship</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}


