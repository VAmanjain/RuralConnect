import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Briefcase, DollarSign, Clock, MapPin } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Fallback mock data for jobs
const fallbackJobs = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", salary: "$100k - $150k", type: "Full-time", skills: ["React", "TypeScript", "Node.js"], description: "We are seeking an experienced React developer to join our team and work on cutting-edge web applications..." },
  { id: 2, title: "UX/UI Designer", company: "DesignHub", location: "New York, NY", salary: "$80k - $120k", type: "Contract", skills: ["Figma", "Adobe XD", "Sketch"], description: "Join our creative team to design intuitive and beautiful user interfaces for various client projects..." },
  { id: 3, title: "Data Scientist", company: "AI Innovations", location: "San Francisco, CA", salary: "$120k - $180k", type: "Full-time", skills: ["Python", "Machine Learning", "SQL"], description: "We're looking for a talented data scientist to help us develop advanced AI models and analyze complex datasets..." },
];

export default function JobExplore() {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [selectedJob, setSelectedJob] = useState(fallbackJobs[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/client/dashboard/client/all");
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const data = await response.data;
        setJobs(data); // Assuming the API returns an array of job objects
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Optionally handle error state or show a message
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Explore Jobs</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder="Search jobs, skills, or companies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="full-time">Full-time</TabsTrigger>
                    <TabsTrigger value="contract">Contract</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <JobList jobs={filteredJobs} onSelectJob={setSelectedJob} selectedJob={selectedJob} />
                  </TabsContent>
                  <TabsContent value="full-time">
                    <JobList jobs={filteredJobs.filter(job => job.type === 'Full-time')} onSelectJob={setSelectedJob} selectedJob={selectedJob} />
                  </TabsContent>
                  <TabsContent value="contract">
                    <JobList jobs={filteredJobs.filter(job => job.type === 'Contract')} onSelectJob={setSelectedJob} selectedJob={selectedJob} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-2/3">
            <JobPreview job={selectedJob} />
          </div>
        </div>
      </div>
    </div>
  );
}

// function JobList({ jobs, onSelectJob, selectedJob }) {
//   return (
//     <div className="space-y-4">
//       <AnimatePresence>
//         {jobs.map((job) => (
//           <motion.div
//             key={job.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Card 
//               className={`cursor-pointer transition-all hover:shadow-md ${selectedJob.id === job.id ? 'border-indigo-500 shadow-md' : ''}`}
//               onClick={() => onSelectJob(job)}
//             >
//               <CardContent className="p-4">
//                 <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
//                 <p className="text-sm text-gray-600 mb-2">{job.company}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {job.skills.slice(0, 3).map((skill, index) => (
//                     <Badge key={index} variant="secondary">{skill}</Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }

function JobList({ jobs, onSelectJob, selectedJob }) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {jobs.slice().reverse().map((job) => ( // Reverse the jobs array
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${selectedJob.id === job.id ? 'border-indigo-500 shadow-md' : ''}`}
              onClick={() => onSelectJob(job)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}


function JobPreview({ job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Briefcase className="w-5 h-5" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="w-5 h-5" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{job.type}</span>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Job Description</h4>
            <p className="text-gray-600">{job.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={()=>{toast.success("Job saved successfully!");}}>Save Job</Button>
                <Button onClick={()=>{toast.info("Application submitted!");}}>Apply Now</Button>
            </CardFooter>
            <ToastContainer />
    </Card>
  );
}