/**
 * Built-in Year 3 Software Engineering units with starter content
 */

// Import all study materials
import { comprehensiveUnits } from './comprehensive-units.js';
import { expandedUnits } from './expanded-units.js';
import { year4Advanced } from './year4-advanced.js';
import { specializedTopics } from './specialized-topics.js';

export const units = [
  {
    id: 'software-testing',
    name: 'Software Testing and Quality Assurance',
    termCount: 16,
    terms: [
      { term: 'Unit testing', definition: 'testing of individual functions or components in isolation from the rest of the system' },
      { term: 'Integration testing', definition: 'testing of combined components or modules to verify they work together correctly' },
      { term: 'Regression testing', definition: 'retesting of software after changes to ensure existing functionality still works' },
      { term: 'Black box testing', definition: 'testing technique that examines functionality without knowledge of internal code structure' },
      { term: 'White box testing', definition: 'testing technique that uses knowledge of internal code structure and logic paths' },
      { term: 'Test driven development', definition: 'software development approach where tests are written before the actual code implementation' },
      { term: 'Code coverage', definition: 'measurement of the percentage of code executed during automated testing' },
      { term: 'Acceptance testing', definition: 'testing performed to determine if software meets business requirements and user needs' },
      { term: 'System testing', definition: 'testing of the complete integrated system to verify it meets specified requirements' },
      { term: 'Smoke testing', definition: 'preliminary testing to check if basic functionality works before more rigorous testing' },
      { term: 'Load testing', definition: 'testing that examines system behavior under expected maximum workload conditions' },
      { term: 'Stress testing', definition: 'testing that pushes system beyond normal operational capacity to find breaking points' },
      { term: 'Test automation', definition: 'use of software tools to execute tests automatically without manual intervention' },
      { term: 'Bug severity', definition: 'classification of how seriously a defect impacts system functionality or user experience' },
      { term: 'Alpha testing', definition: 'testing performed by internal users before releasing software to external beta testers' },
      { term: 'Beta testing', definition: 'testing performed by external users in real-world conditions before final release' }
    ]
  },
  {
    id: 'software-project-management',
    name: 'Software Project Management',
    termCount: 15,
    terms: [
      { term: 'Critical path', definition: 'sequence of project tasks that determines the minimum time needed to complete the project' },
      { term: 'Sprint', definition: 'time-boxed iteration in Agile development typically lasting one to four weeks' },
      { term: 'Scrum', definition: 'Agile framework that organizes work into sprints with daily standup meetings and iterative delivery' },
      { term: 'Product backlog', definition: 'prioritized list of features and requirements that need to be developed for a product' },
      { term: 'Burndown chart', definition: 'graph that shows amount of work remaining over time during a sprint or project' },
      { term: 'Stakeholder', definition: 'person or organization with interest in or affected by the outcome of a project' },
      { term: 'Velocity', definition: 'measure of amount of work a team completes during a sprint in Agile development' },
      { term: 'Daily standup', definition: 'brief daily meeting where team members share progress obstacles and plans' },
      { term: 'Sprint retrospective', definition: 'meeting at end of sprint where team reflects on process and identifies improvements' },
      { term: 'Work breakdown structure', definition: 'hierarchical decomposition of project into smaller more manageable components' },
      { term: 'Gantt chart', definition: 'bar chart that illustrates project schedule showing tasks durations and dependencies' },
      { term: 'Risk management', definition: 'process of identifying assessing and controlling threats to project objectives' },
      { term: 'Scope creep', definition: 'uncontrolled expansion of project scope without adjustments to time cost and resources' },
      { term: 'Milestone', definition: 'significant checkpoint or achievement that marks completion of major project phase' },
      { term: 'Resource allocation', definition: 'assignment and scheduling of personnel equipment and materials to project tasks' }
    ]
  },
  {
    id: 'software-architecture',
    name: 'Software Architecture and Design Patterns',
    termCount: 15,
    terms: [
      { term: 'Model View Controller', definition: 'design pattern that separates application into data layer presentation layer and control logic' },
      { term: 'Singleton pattern', definition: 'design pattern that ensures a class has only one instance with global access point' },
      { term: 'Factory pattern', definition: 'creational design pattern that provides interface for creating objects without specifying exact class' },
      { term: 'Observer pattern', definition: 'behavioral pattern where object maintains list of dependents and notifies them of state changes' },
      { term: 'Dependency injection', definition: 'technique where object receives its dependencies from external source rather than creating them' },
      { term: 'Microservices', definition: 'architectural style that structures application as collection of loosely coupled services' },
      { term: 'Monolithic architecture', definition: 'traditional software design where all components are interconnected and interdependent in single program' },
      { term: 'RESTful API', definition: 'web service architecture that uses HTTP methods and follows REST principles for client-server communication' },
      { term: 'Layered architecture', definition: 'design approach that organizes system into horizontal layers with distinct responsibilities' },
      { term: 'Service oriented architecture', definition: 'architectural pattern where application components provide services through communication protocol' },
      { term: 'Event driven architecture', definition: 'design pattern where flow of program is determined by events and event handlers' },
      { term: 'Design by contract', definition: 'approach that defines formal precise specifications for software components using preconditions and postconditions' },
      { term: 'SOLID principles', definition: 'five design principles for object-oriented programming that promote maintainable and scalable code' },
      { term: 'Domain driven design', definition: 'software development approach that focuses on modeling software to match business domain' },
      { term: 'Facade pattern', definition: 'structural pattern that provides simplified interface to complex subsystem or library' }
    ]
  },
  {
    id: 'information-security',
    name: 'Information Security',
    termCount: 15,
    terms: [
      { term: 'Encryption', definition: 'process of converting data into coded format that requires key for decryption' },
      { term: 'Authentication', definition: 'process of verifying identity of user device or system before granting access' },
      { term: 'Authorization', definition: 'process of granting or denying specific permissions to authenticated user or system' },
      { term: 'SQL injection', definition: 'security vulnerability where malicious SQL code is inserted into application queries' },
      { term: 'Cross site scripting', definition: 'security vulnerability that allows attackers to inject malicious scripts into web pages' },
      { term: 'Public key cryptography', definition: 'encryption system using pairs of keys where one encrypts and other decrypts messages' },
      { term: 'Hash function', definition: 'algorithm that converts input data into fixed-size string that cannot be reversed' },
      { term: 'Digital signature', definition: 'cryptographic technique that verifies authenticity and integrity of digital message or document' },
      { term: 'Firewall', definition: 'network security system that monitors and controls incoming and outgoing network traffic' },
      { term: 'Two factor authentication', definition: 'security process requiring two different forms of identification to verify user identity' },
      { term: 'Certificate authority', definition: 'trusted entity that issues digital certificates to verify identity of websites and organizations' },
      { term: 'Security audit', definition: 'systematic evaluation of system security by measuring how well it conforms to established criteria' },
      { term: 'Penetration testing', definition: 'authorized simulated attack on system to evaluate security and identify vulnerabilities' },
      { term: 'Access control list', definition: 'list of permissions attached to system resource that specifies which users can access it' },
      { term: 'Intrusion detection system', definition: 'device or software that monitors network for malicious activity or policy violations' }
    ]
  },
  {
    id: 'mobile-development',
    name: 'Mobile Application Development',
    termCount: 12,
    terms: [
      { term: 'Native app', definition: 'mobile application developed specifically for one platform using platform-specific programming languages' },
      { term: 'Cross platform development', definition: 'approach to building mobile apps that work on multiple platforms from single codebase' },
      { term: 'Progressive web app', definition: 'web application that uses modern capabilities to deliver app-like experience in browser' },
      { term: 'Mobile responsive design', definition: 'web design approach that ensures content adapts smoothly to different screen sizes' },
      { term: 'Push notification', definition: 'message sent from app to device that appears even when app is not actively running' },
      { term: 'Offline first', definition: 'development strategy where app functionality works without internet connection as primary mode' },
      { term: 'App lifecycle', definition: 'series of states that mobile application goes through from launch to termination' },
      { term: 'Touch gesture', definition: 'user input method on mobile device using finger movements like tap swipe or pinch' },
      { term: 'Adaptive layout', definition: 'user interface design that detects screen size and loads appropriate layout version' },
      { term: 'Background service', definition: 'process that runs on mobile device without user interface performing tasks in background' },
      { term: 'App permissions', definition: 'authorization that users grant to mobile apps to access device features and data' },
      { term: 'Platform fragmentation', definition: 'challenge in mobile development caused by variety of devices OS versions and screen sizes' }
    ]
  }
];

// Merge all study materials
const allUnits = [...units, ...comprehensiveUnits, ...expandedUnits, ...year4Advanced, ...specializedTopics];

export function getAllUnits() {
  return allUnits.map(unit => ({
    id: unit.id,
    name: unit.name,
    description: unit.description || '',
    termCount: unit.termCount
  }));
}

export function getUnitById(id) {
  return allUnits.find(unit => unit.id === id);
}
