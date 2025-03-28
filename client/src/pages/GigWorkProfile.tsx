import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Briefcase, DollarSign, Edit, Globe, Mail, MapPin, Phone, Plus, Save, Star, Wallet } from "lucide-react";
import { ethers , BrowserProvider} from "ethers";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function GigWorkerProfile() {
  const {id} = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [workerData, setWorkerData] = useState({
    name: "Jatin(Guide Profile) ",
    title: "Full Stack Developer",
    location: "New York, NY",
    email: "jatin@email.com",
    phone: "+1 (555) 987-6543",
    website: "www.jatin.dev",
    bio: "Passionate full stack developer with 5+ years of experience. Specialized in React, Node.js, and cloud technologies. Always eager to take on new challenges and deliver high-quality solutions.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL", "MongoDB"],
    hourlyRate: "$75",
  });
  const [newSkill, setNewSkill] = useState({ name: "", proofOfWork: null });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  // const [provider, setProvider] = useState(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  // const [signer, setSigner] = useState<ethers.Signer | null>(null);


  // Set up Ethereum provider
  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.BrowserProvider(window.ethereum));
    } else {
      alert("Please install MetaMask");
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated worker data:", workerData);
    setIsEditing(false);
    setNewSkill({ name: "", proofOfWork: null });
    setPreviewUrl("");
  };

  const handleNewSkillChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proofOfWork" && files && files[0]) {
      setNewSkill((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setNewSkill((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConnectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.listAccounts(); // Check if any accounts are already connected
        
        if (accounts.length > 0) {
          // If already connected, set the wallet address directly
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          console.log("Wallet already connected:", accounts[0]);
        } else {
          // If not connected, request accounts
          const newAccounts = await provider.send("eth_requestAccounts", []);
          setWalletAddress(newAccounts[0]);
          setIsWalletConnected(true);
          console.log("Connected with accounts:", newAccounts);
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.error("Provider is not available.");
    }
  };
  
  

  const handleAddSkill = async () => {
    if (newSkill.name && newSkill.proofOfWork && walletAddress) {
      try {
        // Upload Proof of Work to IPFS
        const formData = new FormData();
        formData.append("proofOfWorkFile", newSkill.proofOfWork);

        const ipfsResponse = await axios.post("http://localhost:5000/uploadProofOfWork", formData);
        const ipfsHash = ipfsResponse.data.hash;
        console.log("Proof of Work IPFS Hash:", ipfsHash);

        // Interact with the Smart Contract
        const contractAddress = '0xBFE8fD30511637f9ceA3E286aAA06A1e9797bC5B';
        const contractABI =
        [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "client",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              }
            ],
            "name": "DisputeRaised",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "freelancer",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              }
            ],
            "name": "DisputeResolved",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "freelancer",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              }
            ],
            "name": "MilestoneCompleted",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "client",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "dueDate",
                "type": "uint256"
              }
            ],
            "name": "MilestoneCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "freelancer",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "PaymentReleased",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "skillName",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
              }
            ],
            "name": "SkillAdded",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "milestoneCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "milestones",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "dueDate",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isCompleted",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "isDisputed",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "skills",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "skillName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
              }
            ],
            "name": "addSkill",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "user",
                "type": "address"
              }
            ],
            "name": "getSkills",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "ipfsHash",
                    "type": "string"
                  }
                ],
                "internalType": "struct SkillVerification.Skill[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "freelancer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "dueDate",
                "type": "uint256"
              }
            ],
            "name": "createMilestone",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "client",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              }
            ],
            "name": "completeMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address payable",
                "name": "freelancer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              }
            ],
            "name": "releasePayment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              }
            ],
            "name": "raiseDispute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "client",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "milestoneId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "freelancer",
                "type": "address"
              }
            ],
            "name": "resolveDispute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]; // Replace with actual contract ABI
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        
        const tx = await contract.addSkill(walletAddress, newSkill.name, ipfsHash);
        await tx.wait();

        setWorkerData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.name],
        }));

        console.log("Skill added to blockchain:", tx);
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg?text=JS" alt={workerData.name} />
              <AvatarFallback>{workerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-grow text-center sm:text-left">
              <CardTitle className="text-2xl mb-2">{workerData.name}</CardTitle>
              <p className="text-gray-500">{workerData.title}</p>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">{workerData.location}</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Link to={`/dashboard/gig/${id}`}>
            <Button>
              View Dashboard
            </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="mt-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={workerData.bio}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={workerData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={workerData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={workerData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Hourly Rate</Label>
                        <Input
                          id="hourlyRate"
                          name="hourlyRate"
                          value={workerData.hourlyRate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{workerData.bio}</p>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{workerData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{workerData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-2" />
                        <a href={`https://${workerData.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
                          {workerData.website}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{workerData.hourlyRate}/hour</span>
                      </div>
                    </>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {workerData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Skill
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Skill</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="skillName">Skill Name</Label>
                                <Input
                                  id="skillName"
                                  name="name"
                                  value={newSkill.name}
                                  onChange={handleNewSkillChange}
                                />
                              </div>
                              {!isWalletConnected ? (
                                <>
                                  <Alert>
                                    <AlertDescription>
                                      Connecting your wallet gives your skill more priority.
                                    </AlertDescription>
                                  </Alert>
                                  <Button onClick={handleConnectWallet} className="w-full">
                                    <Wallet className="mr-2 h-4 w-4" />
                                    Connect Wallet
                                  </Button>
                                </>
                              ) : (
                                <div>
                                  <Label htmlFor="proofOfWork">Proof of Work</Label>
                                  <Input
                                    id="proofOfWork"
                                    name="proofOfWork"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleNewSkillChange}
                                  />
                                  {previewUrl && (
                                    <div className="mt-4">
                                      <Label>Preview</Label>
                                      <div className="mt-2 relative w-full h-48">
                                        <img
                                          src={previewUrl}
                                          alt="Proof of Work Preview"
                                          style={{ objectFit: 'contain' }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              <Button onClick={handleAddSkill} disabled={!isWalletConnected || !newSkill.name || !newSkill.proofOfWork}>
                                Add Skill
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="portfolio">
                <div className="space-y-4">
                  {['E-commerce Website', 'Social Media Dashboard', 'Task Management App'].map((project, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{project}</h3>
                        <p className="text-sm text-gray-500">Completed: {new Date().toLocaleDateString()}</p>
                        <div className="flex items-center mt-2">
                          <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{['React, Node.js, MongoDB', 'Vue.js, Express, PostgreSQL', 'React Native, Firebase'][index]}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="space-y-4">
                  {['TechCorp', 'StartupX', 'DesignPro'].map((client, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{client[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{client}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < 5 - index * 0.5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {index === 0 ? "Jane is an exceptional developer. Her work on our e-commerce platform exceeded our expectations." :
                           index === 1 ? "Great communication and problem-solving skills. Delivered the project ahead of schedule." :
                           "Highly skilled and professional. Would definitely hire again for future projects."}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}