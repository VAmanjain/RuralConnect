import { Link, Route, Routes } from "react-router-dom";
import LandingPage1 from "./pages/Landing1";
import Products from "./pages/BrouseProduct";
import Markets from "./pages/MarketPlace";
import Courses from "./pages/ExploreCourses";
import GigWorkerDashboard from "./pages/GigDashboard";
import ClientDashboard from "./pages/ClinetDashboard";
import JobExplore from "./pages/Explore";
import JobCreate from "./pages/Form";
import JobPreview from "./pages/JobPreview";
import AuthPage from "./pages/Login";
import { ClientProfile } from "./pages/ClientProfile";
import GigWorkerProfile from "./pages/GigWorkProfile";
import Milestone from "./pages/milestone";
import FreelancingAssistant from "./pages/FreelancingAssistant";
import { Button } from "./components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import HowItWorks from "./pages/Work";

const App = () => {
  return (
    <>
    {/* <div className='bg-[#0f0f28]'> */}
      <div className='text-black'>

<div  className="fixed bottom-5 right-5" >
  <Link to="/chat">
  <Button>
    <ChatBubbleIcon/>
  </Button>
  </Link>
</div>
      {/* <Navbar /> */}
      <Routes> 
        <Route path="/" element={<LandingPage1 />} />
        <Route path="/dashboard/gig/:id" element={<GigWorkerDashboard />} />
        <Route path="/dashboard/client/:id" element={<ClientDashboard />} />
        <Route path="/explore" element={<JobExplore />} />
        <Route path="/brouseProduct" element={< Products />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/work" element={<HowItWorks/>} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile/gig/:id" element={<GigWorkerProfile  />} />
        <Route path="/preview/:id" element={<JobPreview />} />
        <Route path="/profile/client/:id" element={<ClientProfile />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/chat" element={<FreelancingAssistant   />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        <Route path="/post-jobs/:id" element={<JobCreate />} />
        {/* <Route path="/certificate-submission" element={<CertificateSubmissionComponent />} /> */}
        {/* <Route path="/register" element={<RegisterationPage />} /> */}
        <Route path="/milestone" element={<Milestone />} />
      </Routes>
      
    </div>
    </>
  );
}

export default App;