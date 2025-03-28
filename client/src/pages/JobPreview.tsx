
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, DollarSign, Clock, MapPin, Star, Calendar, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'


// Mock job data (in a real application, this would be fetched from an API)
const job = {
  id: 1,
  title: "Senior React Developer",
  company: "TechCorp",
  logo: "/placeholder.svg",
  location: "Remote",
  salary: "$100k - $150k",
  type: "Full-time",
  experience: "5+ years",
  postedDate: "2024-03-01",
  applicationDeadline: "2024-04-01",
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
  description: "We are seeking an experienced React developer to join our team and work on cutting-edge web applications. The ideal candidate will have a strong background in front-end development and be passionate about creating high-performance, scalable web applications.",
  responsibilities: [
    "Develop new user-facing features using React.js",
    "Build reusable components and front-end libraries for future use",
    "Translate designs and wireframes into high-quality code",
    "Optimize components for maximum performance across a vast array of web-capable devices and browsers",
    "Participate in code reviews and mentor junior developers"
  ],
  requirements: [
    "5+ years of experience in front-end development",
    "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
    "Thorough understanding of React.js and its core principles",
    "Experience with popular React.js workflows (such as Flux or Redux)",
    "Familiarity with RESTful APIs and GraphQL",
    "Knowledge of modern authorization mechanisms, such as JSON Web Token",
    "Familiarity with modern front-end build pipelines and tools",
    "Experience with common front-end development tools such as Babel, Webpack, NPM, etc.",
    "Ability to understand business requirements and translate them into technical requirements"
  ],
  benefits: [
    "Competitive salary and equity package",
    "Health, dental, and vision insurance",
    "401(k) plan with company match",
    "Flexible work hours and remote work options",
    "Professional development budget",
    "Regular team building events and activities"
  ]
}

export default function JobPreview() {
  const [activeTab, setActiveTab] = useState('details')
  const [isApplying, setIsApplying] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0">
                <img src={job.logo} alt={`${job.company} logo`} className="w-16 h-16 rounded" />
              </div>
              <div className="flex-grow">
                <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.company}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                  <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> {job.salary}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
                </div>
              </div>
              <Button onClick={() => setIsApplying(true)} className="mt-4 sm:mt-0">
                Apply Now
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                  <TabsTrigger value="details">Job Details</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="similar">Similar Jobs</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <JobDetails job={job} />
                </TabsContent>
                <TabsContent value="company">
                  <CompanyInfo company={job.company} />
                </TabsContent>
                <TabsContent value="similar">
                  <SimilarJobs />
                </TabsContent>
                <TabsContent value="reviews">
                  <JobReviews />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {isApplying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ApplicationForm job={job} onClose={() => setIsApplying(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function JobDetails({ job }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-gray-600">{job.description}</p>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {job.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-2">Benefits</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {job.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>
      
      <section className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Posted: {job.postedDate}</span>
        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Application Deadline: {job.applicationDeadline}</span>
      </section>
    </div>
  )
}

function CompanyInfo({ company }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">About {company}</h3>
      <p className="text-gray-600">
        {company} is a leading technology company specializing in innovative software solutions. 
        With a focus on cutting-edge technologies and a commitment to excellence, we strive to 
        create products that make a difference in people's lives.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Founded</h4>
          <p className="text-gray-600">2010</p>
        </div>
        <div>
          <h4 className="font-semibold">Employees</h4>
          <p className="text-gray-600">500-1000</p>
        </div>
        <div>
          <h4 className="font-semibold">Industry</h4>
          <p className="text-gray-600">Information Technology</p>
        </div>
        <div>
          <h4 className="font-semibold">Website</h4>
          <Link to="#" className="text-blue-600 hover:underline">www.techcorp.com</Link>
        </div>
      </div>
    </div>
  )
}

function SimilarJobs() {
  const similarJobs = [
    { id: 2, title: "Frontend Developer", company: "WebTech Inc.", location: "New York, NY" },
    { id: 3, title: "Full Stack Engineer", company: "SoftSolutions", location: "San Francisco, CA" },
    { id: 4, title: "React Native Developer", company: "MobileApps Co.", location: "Remote" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Similar Jobs</h3>
      {similarJobs.map((job) => (
        <Card key={job.id}>
          <CardContent className="p-4">
            <h4 className="font-semibold">{job.title}</h4>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-600">{job.location}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function JobReviews() {
  const reviews = [
    { id: 1, rating: 4, title: "Great work environment", content: "I've been working here for 2 years and love the culture and opportunities for growth." },
    { id: 2, rating: 5, title: "Innovative projects", content: "The company is always working on cutting-edge technologies, which keeps the work exciting." },
    { id: 3, rating: 3, title: "Good, but room for improvement", content: "While the projects are interesting, work-life balance could be better." },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employee Reviews</h3>
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
            </div>
            <h4 className="font-semibold">{review.title}</h4>
            <p className="text-sm text-gray-600">{review.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ApplicationForm({ job, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prevData => ({ ...prevData, resume: file }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // After submission, you might want to show a success message and close the form
    onClose()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for {job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit Application</Button>
      </CardFooter>
    </Card>
  )
}