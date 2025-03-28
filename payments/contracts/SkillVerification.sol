// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillVerification {
    struct Skill {
        string name;
        string ipfsHash;
    }

    struct Milestone {
        uint256 amount;
        uint256 dueDate;
        bool isCompleted;
        bool isDisputed;
    }

    mapping(address => Skill[]) public skills;
    mapping(address => mapping(uint256 => Milestone)) public milestones;
    mapping(address => uint256) public milestoneCount;

    event SkillAdded(address indexed user, string skillName, string ipfsHash);
    event MilestoneCreated(address indexed client, uint256 milestoneId, uint256 amount, uint256 dueDate);
    event MilestoneCompleted(address indexed freelancer, uint256 milestoneId);
    event PaymentReleased(address indexed freelancer, uint256 milestoneId, uint256 amount);
    event DisputeRaised(address indexed client, uint256 milestoneId);
    event DisputeResolved(address indexed freelancer, uint256 milestoneId);

    // Skill verification functions
    function addSkill(address user, string memory skillName, string memory ipfsHash) public {
        skills[user].push(Skill(skillName, ipfsHash));
        emit SkillAdded(user, skillName, ipfsHash);
    }

    function getSkills(address user) public view returns (Skill[] memory) {
        return skills[user];
    }

    // Escrow functions for milestone payments
    function createMilestone(address freelancer, uint256 amount, uint256 dueDate) public payable {
        require(msg.value == amount, "Amount sent must match milestone amount");

        uint256 milestoneId = milestoneCount[msg.sender]++;
        milestones[msg.sender][milestoneId] = Milestone({
            amount: amount,
            dueDate: dueDate,
            isCompleted: false,
            isDisputed: false
        });

        emit MilestoneCreated(msg.sender, milestoneId, amount, dueDate);
    }

    function completeMilestone(address client, uint256 milestoneId) public {
        Milestone storage milestone = milestones[client][milestoneId];
        require(!milestone.isCompleted, "Milestone already completed");
        require(!milestone.isDisputed, "Milestone is disputed");

        milestone.isCompleted = true;
        emit MilestoneCompleted(msg.sender, milestoneId);
    }

    function releasePayment(address payable freelancer, uint256 milestoneId) public {
        Milestone storage milestone = milestones[msg.sender][milestoneId];
        require(milestone.isCompleted, "Milestone is not completed");
        require(!milestone.isDisputed, "Milestone is disputed");

        uint256 amount = milestone.amount;
        milestone.amount = 0; // Set to zero to avoid reentrancy issues
        freelancer.transfer(amount);

        emit PaymentReleased(freelancer, milestoneId, amount);
    }

    function raiseDispute(uint256 milestoneId) public {
        Milestone storage milestone = milestones[msg.sender][milestoneId];
        require(!milestone.isDisputed, "Milestone already disputed");

        milestone.isDisputed = true;
        emit DisputeRaised(msg.sender, milestoneId);
    }

    function resolveDispute(address client, uint256 milestoneId, address payable freelancer) public {
        Milestone storage milestone = milestones[client][milestoneId];
        require(milestone.isDisputed, "Milestone is not in dispute");

        milestone.isDisputed = false;
        uint256 amount = milestone.amount;
        milestone.amount = 0; // Set to zero to avoid reentrancy issues
        freelancer.transfer(amount);

        emit DisputeResolved(freelancer, milestoneId);
    }
}
