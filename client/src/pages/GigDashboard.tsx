import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Briefcase, DollarSign, Clock, Star, ChevronRight, Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'


// Mock data for the dashboard
const activeJobs = [
  { id: 1, title: "E-commerce Website Redesign", client: "TechCorp", progress: 75, dueDate: "2024-04-15" },
  { id: 2, title: "Mobile App UI Design", client: "StartupX", progress: 40, dueDate: "2024-05-20" },
  { id: 3, title: "Logo Design for Restaurant", client: "FoodieInc", progress: 90, dueDate: "2024-03-31" },
]

const recentEarnings = [
  { id: 1, description: "Payment for E-commerce Website", amount: 2500, date: "2024-03-15" },
  { id: 2, title: "Milestone Payment for Mobile App UI", amount: 1000, date: "2024-03-10" },
  { id: 3, title: "Logo Design Project Completion", amount: 800, date: "2024-03-01" },
]

const earningsData = [
  { month: 'Jan', amount: 3000 },
  { month: 'Feb', amount: 3500 },
  { month: 'Mar', amount: 4300 },
  { month: 'Apr', amount: 3800 },
  { month: 'May', amount: 4500 },
  { month: 'Jun', amount: 5000 },
]

export default function GigWorkerDashboard() {
  const {id } = useParams();
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
          <div className='gap-2'>


          <Link  to="/explore">
          <Button>
            <Search className="mr-2 h-4 w-4" /> Find New Jobs
          </Button>
          </Link>

          <Link  to={`/profile/gig/${id}`}>
          <Button>
            View Profile
          </Button>
          </Link>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Briefcase} title="Active Jobs" value="3" />
              <StatCard icon={DollarSign} title="Total Earnings" value="$12,800" />
              <StatCard icon={Clock} title="Avg. Completion Time" value="10 days" />
              <StatCard icon={Star} title="Rating" value="4.9" />
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {activeJobs.map((job) => (
                      <li key={job.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.client}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{job.progress}%</p>
                          <Progress value={job.progress} className="w-20" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Your Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {activeJobs.map((job) => (
                    <li key={job.id}>
                      <JobCard job={job} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentEarnings.map((earning) => (
                    <li key={earning.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{earning.description}</p>
                        <p className="text-sm text-gray-500">{earning.date}</p>
                      </div>
                      <p className="font-medium text-green-600">${earning.amount}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Your Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {['Web Development Project', 'Mobile App Design', 'Content Writing for Blog', 'SEO Optimization', 'Social Media Management'].map((proposal, index) => (
                    <li key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{proposal}</p>
                        <p className="text-sm text-gray-500">Submitted: {new Date().toLocaleDateString()}</p>
                      </div>
                      <Badge variant={index === 0 ? "success" : index === 1 ? "warning" : "default"}>
                        {index === 0 ? "Accepted" : index === 1 ? "Pending" : "Submitted"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <Icon className="h-8 w-8 text-cyan-600 mb-2" />
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

function JobCard({ job }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.client}</p>
          </div>
          <Badge variant={job.progress >= 90 ? "success" : job.progress >= 50 ? "warning" : "default"}>
            {job.progress}% Complete
          </Badge>
        </div>
        <Progress value={job.progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>Due: {job.dueDate}</span>
          <Link to="#" className="text-cyan-600 hover:underline">View Details</Link>
        </div>
      </CardContent>
    </Card>
  )
}