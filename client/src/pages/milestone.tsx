import React, { useState, useEffect } from 'react';
//import Web3 from 'web3';
import './milestone.css';

declare let window: any;

interface Milestone {
  name: string;
  deadline: string;
  price: number;
}

const Milestone: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [milestoneCount, setMilestoneCount] = useState<number>(1);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const contractAddress = '0xBFE8fD30511637f9ceA3E286aAA06A1e9797bC5B';
  const contractABI =  [
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
  ];

  useEffect(() => {
    const loadWeb3AndContract = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setWeb3(web3Instance);
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error("Failed to load Web3 or contract:", error);
        }
      } else {
        alert("Please install MetaMask to interact with the blockchain.");
      }
    };
    loadWeb3AndContract();
  }, []);

  const handleMilestoneCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value);
    setMilestoneCount(count);

    const initialMilestones: Milestone[] = Array.from({ length: count }, () => ({
      name: '',
      deadline: '',
      price: 0,
    }));
    setMilestones(initialMilestones);
  };

  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string | number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setMilestones(updatedMilestones);
  };

  const renderMilestones = () => {
    return milestones.map((milestone, index) => (
      <div key={index} className="milestone-item">
        <label>
          Milestone {index + 1} Name:
          <input
            type="text"
            value={milestone.name}
            onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            value={milestone.deadline}
            onChange={(e) => handleMilestoneChange(index, 'deadline', e.target.value)}
          />
        </label>
        <label>
          Price (in Ether):
          <input
            type="number"
            value={milestone.price}
            onChange={(e) => handleMilestoneChange(index, 'price', parseFloat(e.target.value))}
          />
        </label>
      </div>
    ));
  };

  const handleSubmit = async () => {
    if (!web3 || !contract || !account) {
      alert("Web3 or contract is not loaded.");
      return;
    }

    try {
      for (let milestone of milestones) {
        const amountInWei = web3.utils.toWei(milestone.price.toString(), 'ether');
        const dueDateTimestamp = Math.floor(new Date(milestone.deadline).getTime() / 1000);

        await contract.methods
          .createMilestone(account, amountInWei, dueDateTimestamp)
          .send({ from: account, value: amountInWei });
      }

      alert("Milestones created successfully on the blockchain.");
    } catch (error: any) {
      console.error("Error creating milestones on blockchain:", error);
      if (error.code === 4001) { // MetaMask error code for user denied
        alert("Transaction denied by user.");
      } else {
        alert("Failed to create milestones on blockchain.");
      }
    }
  };

  return (
    <div className="milestone-container">
      <h2><strong>Milestone Setup</strong></h2>

      <label>
        Number of Milestones:
        <input
          type="number"
          min="1"
          value={milestoneCount}
          onChange={handleMilestoneCountChange}
        />
      </label>

      {renderMilestones()}

      <button onClick={handleSubmit}>Save Milestones</button>
    </div>
  );
};

export default Milestone;
