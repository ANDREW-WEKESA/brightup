/**
 * Comprehensive study materials for Year 3 Software Engineering
 * Based on Kisii University course content
 * Includes: System Security, Mobile Development, API Design, and more
 */

export const comprehensiveUnits = [
  {
    id: 'soen-301-security',
    name: 'SOEN 301 - Computer Security (System Security)',
    description: 'Introduction to System Security - foundations, CIA triad, security principles',
    termCount: 45,
    terms: [
      // Basic Terminologies
      { term: 'System security', definition: 'coordinated protection of hardware software data networks users and services from unauthorized access misuse disruption modification or destruction' },
      { term: 'Asset', definition: 'something valuable that needs protection such as database physical hardware or confidential data' },
      { term: 'Threat', definition: 'anything with potential to cause harm to information system or asset such as hackers malware or natural disasters' },
      { term: 'Vulnerability', definition: 'weakness in system that could be exploited by threat such as weak passwords outdated software or unencrypted data' },
      { term: 'Exploit', definition: 'method technique or program used to take advantage of vulnerability in system' },
      { term: 'Attack', definition: 'intentional attempt to compromise system such as phishing ransomware DDoS or password attacks' },
      { term: 'Risk', definition: 'possibility that threat will exploit vulnerability and cause harm calculated as likelihood times impact' },
      { term: 'Control', definition: 'safeguard or countermeasure implemented to minimize risk detect threats or recover from security incidents' },
      
      // CIA Triad
      { term: 'Confidentiality', definition: 'security principle ensuring only authorized users can view information' },
      { term: 'Integrity', definition: 'security principle ensuring information remains in original correct and complete state' },
      { term: 'Availability', definition: 'security principle ensuring information is accessible when needed' },
      { term: 'CIA triad', definition: 'three core principles of information security confidentiality integrity and availability' },
      
      // Supporting Principles
      { term: 'Authentication', definition: 'process that verifies identity asking who are you through credentials or biometrics' },
      { term: 'Authorization', definition: 'process that controls allowed actions determining what user can do after authentication' },
      { term: 'Accountability', definition: 'principle that links actions to responsible users through logging and audit trails' },
      { term: 'Non repudiation', definition: 'security principle providing evidence that action occurred so it cannot be denied later' },
      { term: 'Privacy', definition: 'principle controlling appropriate collection and use of personal data' },
      
      // Core Design Principles
      { term: 'Least privilege', definition: 'security principle where users receive only permissions necessary to perform assigned tasks' },
      { term: 'Need to know', definition: 'security principle where users access information only when required for their duties' },
      { term: 'Separation of duties', definition: 'security principle dividing critical tasks among different individuals so one person lacks excessive control' },
      { term: 'Defense in depth', definition: 'security strategy using multiple layers of protection rather than relying on single control' },
      { term: 'Fail safe defaults', definition: 'security principle where systems deny access by default unless permission explicitly granted' },
      { term: 'Minimize attack surface', definition: 'reducing all possible points through which attacker could interact with or compromise system' },
      { term: 'Attack surface', definition: 'all possible points through which attacker could interact with or compromise system' },
      
      // Security Architecture Layers
      { term: 'Physical security layer', definition: 'first layer of security architecture using locks guards CCTV and physical access controls' },
      { term: 'Endpoint security layer', definition: 'security layer focused on hardening patching and anti-malware protection for devices' },
      { term: 'Application security layer', definition: 'security layer involving secure coding input validation and security testing' },
      { term: 'Network security layer', definition: 'security layer using firewalls VPNs and network segmentation to protect communications' },
      { term: 'Data security layer', definition: 'security layer employing encryption access controls and backups to protect information' },
      { term: 'Identity and access management', definition: 'security layer handling authentication authorization and multi-factor authentication' },
      { term: 'Security architecture', definition: 'structured arrangement of controls policies technologies and responsibilities protecting information system' },
      
      // Additional Security Concepts
      { term: 'Security by design', definition: 'considering and integrating security requirements from earliest stages of system architecture rather than adding afterwards' },
      { term: 'Digital dependence', definition: 'organizational reliance on online services cloud platforms databases and interconnected networks' },
      { term: 'Risk exposure', definition: 'potential for weak systems to lead to data breaches fraud downtime and reputational loss' },
      { term: 'Multi factor authentication', definition: 'security mechanism requiring two or more verification factors to gain access to resource' },
      { term: 'Firewall', definition: 'network security device monitoring and controlling incoming and outgoing traffic based on security rules' },
      { term: 'VPN', definition: 'virtual private network creating encrypted connection over less secure network like internet' },
      { term: 'Network segmentation', definition: 'dividing computer network into smaller parts to improve performance and security' },
      { term: 'CCTV', definition: 'closed-circuit television system used for surveillance and monitoring physical security' },
      { term: 'Anti malware', definition: 'software designed to detect prevent and remove malicious software from computer systems' },
      { term: 'Input validation', definition: 'process of testing user input against predefined patterns to prevent injection attacks' },
      { term: 'Security testing', definition: 'process of evaluating system security to identify vulnerabilities and weaknesses' },
      { term: 'Access controls', definition: 'security techniques regulating who or what can view or use resources in computing environment' },
      { term: 'RBAC', definition: 'role-based access control method restricting system access based on user roles within organization' }
    ]
  },

  {
    id: 'soen-350-mobile',
    name: 'SOEN 350 - Mobile Application Development',
    description: 'Android development, mobile computing, app lifecycle, UI design, and deployment',
    termCount: 75,
    terms: [
      // Week 1: Introduction and Platform
      { term: 'Mobile computing', definition: 'ability to access process exchange and manage information using portable devices while moving between locations' },
      { term: 'Mobile application ecosystem', definition: 'interconnected environment of people technologies platforms tools and services used to create distribute and use mobile apps' },
      { term: 'Android', definition: 'mobile operating system and software platform providing complete environment for building touchscreen device applications' },
      { term: 'AOSP', definition: 'Android Open Source Project making Android source code available for inspection modification and distribution' },
      { term: 'Android SDK', definition: 'software development kit containing tools libraries documentation and APIs for developing Android applications' },
      { term: 'Android Studio', definition: 'primary integrated development environment for Android providing tools to write design debug and build apps' },
      { term: 'APK', definition: 'Android Package Kit file format used to distribute and install applications on Android operating system' },
      { term: 'AAB', definition: 'Android App Bundle optimized publishing format containing all compiled code and resources for app' },
      { term: 'AVD', definition: 'Android Virtual Device configuration letting emulator simulate specific Android device for testing' },
      
      // Mobile Device Characteristics
      { term: 'Device portability', definition: 'mobile device characteristic of being small lightweight and easy to carry' },
      { term: 'Context awareness', definition: 'mobile device ability to gather information from sensors like GPS accelerometer and camera' },
      { term: 'Touch based interaction', definition: 'primary input method for mobile devices using touchscreens and gestures' },
      { term: 'Device fragmentation', definition: 'challenge of differing screen sizes hardware Android versions and manufacturers across devices' },
      { term: 'Limited battery power', definition: 'mobile device constraint requiring apps to be energy efficient to avoid draining battery quickly' },
      { term: 'Variable network connectivity', definition: 'mobile constraint of slow connections interruptions and coverage gaps requiring graceful handling' },
      
      // Android Architecture
      { term: 'Android architecture', definition: 'layered structure consisting of applications framework runtime libraries hardware abstraction and Linux kernel' },
      { term: 'Activity Manager', definition: 'Android framework service managing activity lifecycle and navigation stack' },
      { term: 'ART', definition: 'Android Runtime handling app execution memory management and runtime optimization' },
      { term: 'HAL', definition: 'Hardware Abstraction Layer providing standard interface between Android OS and device hardware' },
      { term: 'Linux kernel', definition: 'foundation layer of Android providing process management memory management security and device drivers' },
      
      // Week 2: App Structure and Manifest
      { term: 'AndroidManifest.xml', definition: 'required XML file declaring essential app information including components permissions and features' },
      { term: 'Activity', definition: 'single focused screen with user interface representing entry point for user interaction' },
      { term: 'Service', definition: 'component performing long-running operations in background without user interface' },
      { term: 'Broadcast Receiver', definition: 'component listening for and responding to system-wide or app-specific broadcast messages' },
      { term: 'Content Provider', definition: 'component managing access to structured data and providing standard interface for data sharing' },
      { term: 'Application Context', definition: 'object providing access to application-level resources distinct from Activity context' },
      
      // Activity Lifecycle
      { term: 'onCreate', definition: 'activity lifecycle method called when activity is being created for initializing UI' },
      { term: 'onStart', definition: 'activity lifecycle method called when activity is becoming visible to user' },
      { term: 'onResume', definition: 'activity lifecycle method called when activity is in foreground and interactive' },
      { term: 'onPause', definition: 'activity lifecycle method called when activity is partially obscured for saving lightweight state' },
      { term: 'onStop', definition: 'activity lifecycle method called when activity is no longer visible to user' },
      { term: 'onDestroy', definition: 'activity lifecycle method called when activity is being destroyed for final cleanup' },
      { term: 'Activity lifecycle', definition: 'defined set of callback methods managing activity as it moves between created visible focused and destroyed states' },
      
      // Week 3: UI Design
      { term: 'View', definition: 'base class for UI components occupying screen space and handling drawing and user events' },
      { term: 'ViewGroup', definition: 'invisible container holding and arranging child Views and ViewGroups acting as layout' },
      { term: 'LinearLayout', definition: 'layout arranging children in single row or column based on orientation attribute' },
      { term: 'RelativeLayout', definition: 'layout positioning children relative to each other or to parent container' },
      { term: 'ConstraintLayout', definition: 'layout positioning children using flexible constraints recommended for complex flat view hierarchies' },
      { term: 'Button', definition: 'UI widget triggering action when user clicks or taps it' },
      { term: 'TextView', definition: 'UI widget displaying read-only text to user' },
      { term: 'EditText', definition: 'UI widget allowing user to type and edit text input' },
      
      // Week 4: Advanced UI
      { term: 'Custom View', definition: 'extending View class and overriding onDraw method to render custom graphics' },
      { term: 'Property animation', definition: 'flexible animation system animating actual object properties over time using ValueAnimator or ObjectAnimator' },
      { term: 'Drawable resource', definition: 'graphic that can be drawn including bitmaps shapes state lists and vector graphics' },
      { term: 'Vector drawable', definition: 'scalable XML-based graphic resource that maintains quality at different sizes' },
      
      // Week 5: Intents and Lifecycle
      { term: 'Intent', definition: 'messaging object used to request action from another app component or communicate between components' },
      { term: 'Explicit Intent', definition: 'intent specifying exact component class to start used within same application' },
      { term: 'Implicit Intent', definition: 'intent declaring general action letting system find suitable component to handle it' },
      { term: 'Intent Filter', definition: 'expression in manifest declaring types of intents component can respond to' },
      
      // Week 6: Data Storage
      { term: 'SharedPreferences', definition: 'key-value storage mechanism for small amounts of primitive data persisted across app sessions' },
      { term: 'SQLite', definition: 'lightweight embedded relational database built into Android suited for structured queryable data' },
      { term: 'SQLiteOpenHelper', definition: 'helper class managing database creation and version management for SQLite databases' },
      { term: 'Room', definition: 'persistence library providing abstraction layer over SQLite for easier database access' },
      
      // Week 7: Phone Features
      { term: 'Runtime permissions', definition: 'dangerous permissions that must be requested at runtime not just declared in manifest' },
      { term: 'Fused Location Provider', definition: 'Google Play services API giving accurate battery-efficient access to device location' },
      { term: 'SensorManager', definition: 'API exposing hardware sensors like accelerometer gyroscope proximity and light sensors' },
      { term: 'MediaPlayer', definition: 'API for playing audio and video files in Android applications' },
      
      // Week 8: Networking
      { term: 'Retrofit', definition: 'type-safe HTTP client mapping REST APIs to Java interfaces commonly paired with Gson for JSON parsing' },
      { term: 'Volley', definition: 'Google library simplifying networking request queuing and caching for typical app needs' },
      { term: 'HttpURLConnection', definition: 'low-level built-in Java API for HTTP requests that is verbose to use directly' },
      { term: 'JSON', definition: 'JavaScript Object Notation lightweight data format commonly used for API responses' },
      
      // Week 9: Resources and Localization
      { term: 'Localization', definition: 'supporting multiple languages by providing alternative resource sets allowing app to adapt to device locale' },
      { term: 'strings.xml', definition: 'XML resource file centralizing text strings for reuse translation and localization' },
      { term: 'Drawable densities', definition: 'providing different image resources for different screen densities like mdpi hdpi xhdpi' },
      
      // Week 10: Testing and Publishing
      { term: 'Unit testing Android', definition: 'testing individual classes and methods in isolation using JUnit framework' },
      { term: 'Espresso', definition: 'testing framework for writing UI tests that run on actual device or emulator' },
      { term: 'Logcat', definition: 'tool for viewing runtime logs error traces and debug messages from Android device or emulator' },
      { term: 'Signed APK', definition: 'Android package file signed with keystore certificate required for publishing to Google Play' },
      { term: 'Google Play Console', definition: 'platform for managing app listings uploads screenshots privacy policies and releases' }
    ]
  },

  {
    id: 'soen-255-api',
    name: 'SOEN 255 - API Design and Implementation',
    description: 'REST architecture, API specifications, OAuth, security, and Apigee platform',
    termCount: 50,
    terms: [
      // Topic 1: API Specifications
      { term: 'API', definition: 'Application Programming Interface defining rules and specifications for software components to communicate' },
      { term: 'Data structure specification', definition: 'API definition of exact shape of data including field names types and constraints' },
      { term: 'Remote call', definition: 'invoking function or procedure that executes on different process or machine like RPC or web service' },
      { term: 'POSIX', definition: 'family of OS-level API standards ensuring compatibility between different Unix-like operating systems' },
      { term: 'Windows API', definition: 'Microsoft native API Win32 for building applications that interact with Windows operating system' },
      { term: 'ASPI', definition: 'Advanced SCSI Programming Interface legacy API standard for communicating with SCSI hardware devices' },
      
      // Topic 2: Documentation
      { term: 'API documentation', definition: 'reference describing how to use API including endpoints parameters request-response formats and error codes' },
      { term: 'Swagger', definition: 'tool for API documentation using OpenAPI specification to describe REST APIs with interactive interface' },
      { term: 'OpenAPI', definition: 'specification standard for describing REST APIs allowing design to be reviewed and mocked before implementation' },
      { term: 'Postman', definition: 'tool for testing APIs and generating collections serving as interactive documentation' },
      
      // Topic 3: REST Architecture
      { term: 'REST', definition: 'Representational State Transfer architectural style for networked applications built around resources and HTTP methods' },
      { term: 'Statelessness', definition: 'REST principle where each request contains all needed information server holds no client session state between requests' },
      { term: 'Uniform interface', definition: 'REST principle of consistent resource identification representation and use of standard HTTP methods' },
      { term: 'Cacheability', definition: 'REST principle where responses define themselves as cacheable or not to improve performance' },
      { term: 'Layered system', definition: 'REST principle where client cannot tell if connected directly to server or through intermediary' },
      { term: 'Client server separation', definition: 'REST principle separating UI concerns from data storage allowing independent evolution' },
      
      // Topic 4: HTTP and Modern APIs
      { term: 'HTTP GET', definition: 'HTTP method for retrieving resource from server without modifying it' },
      { term: 'HTTP POST', definition: 'HTTP method for creating new resource or submitting data to server' },
      { term: 'HTTP PUT', definition: 'HTTP method for replacing entire resource at specified URI' },
      { term: 'HTTP PATCH', definition: 'HTTP method for partially updating resource with only changed fields' },
      { term: 'HTTP DELETE', definition: 'HTTP method for removing resource from server' },
      { term: 'HTTP status 200', definition: 'OK status code indicating request succeeded and response contains requested data' },
      { term: 'HTTP status 201', definition: 'Created status code indicating request succeeded and new resource was created' },
      { term: 'HTTP status 400', definition: 'Bad Request status code indicating client sent invalid or malformed request' },
      { term: 'HTTP status 401', definition: 'Unauthorized status code indicating authentication is required or failed' },
      { term: 'HTTP status 404', definition: 'Not Found status code indicating requested resource does not exist on server' },
      { term: 'HTTP status 500', definition: 'Internal Server Error status code indicating server encountered unexpected condition' },
      { term: 'SOAP', definition: 'Simple Object Access Protocol strict XML-based messaging protocol with formal contract and enterprise features' },
      { term: 'REST vs SOAP', definition: 'REST is lightweight JSON-based and flexible while SOAP is formal XML-based with built-in security for enterprise' },
      
      // Topic 5: API Modeling
      { term: 'API modeling', definition: 'process of designing API structure before implementation defining resources relationships and operations' },
      { term: 'Data contract', definition: 'defined schema specifying request and response structure including required optional fields and types' },
      { term: 'Resource', definition: 'entity or noun in API design representing data object that can be manipulated via HTTP methods' },
      { term: 'API Blueprint', definition: 'high-level API description language for designing web APIs before implementation' },
      
      // Topic 6: Integration Patterns
      { term: 'Adapter pattern', definition: 'wrapping third-party API behind own interface isolating codebase from external API changes' },
      { term: 'Facade pattern', definition: 'exposing simplified interface over one or more complex third-party APIs' },
      { term: 'Circuit breaker', definition: 'pattern handling third-party failures gracefully preventing cascading failures when dependency is down' },
      { term: 'API gateway', definition: 'centralized entry point managing cross-cutting concerns like authentication rate limiting and logging for multiple APIs' },
      { term: 'Webhook', definition: 'event-driven integration where service pushes notifications to subscribed endpoints rather than being polled' },
      
      // Topic 7: API Selection
      { term: 'SLA', definition: 'Service Level Agreement defining reliability uptime guarantees and support commitments from API provider' },
      { term: 'Rate limiting', definition: 'restricting number of API requests client can make within time period to prevent abuse' },
      { term: 'API versioning', definition: 'strategy for managing changes to API while maintaining backward compatibility for existing clients' },
      
      // Topic 8: Security
      { term: 'Data in motion', definition: 'data being transmitted between systems protected primarily via TLS HTTPS and secure gateways' },
      { term: 'Data at rest', definition: 'data stored in databases or files protected via encryption access controls and key management' },
      { term: 'TLS', definition: 'Transport Layer Security cryptographic protocol encrypting data transmitted over network' },
      { term: 'Input sanitization', definition: 'cleaning and validating user input to prevent injection attacks and malicious data' },
      { term: 'API throttling', definition: 'controlling rate of API requests to prevent overload and ensure fair resource allocation' },
      
      // Topic 9: OAuth
      { term: 'OAuth', definition: 'authorization framework allowing third-party apps to obtain limited access to user resources without exposing credentials' },
      { term: 'Access token', definition: 'credential issued by authorization server that client presents to access protected resources with limited scope and lifetime' },
      { term: 'Authorization Server', definition: 'OAuth component that authenticates user and issues access tokens to client applications' },
      { term: 'Resource Server', definition: 'OAuth component hosting protected data and APIs that accepts valid access tokens' },
      { term: 'Authorization Code flow', definition: 'OAuth grant type using redirect-based flow with authorization code exchange for web and mobile apps' },
      { term: 'Client Credentials', definition: 'OAuth grant type for machine-to-machine access without user involvement' },
      { term: 'OpenID Connect', definition: 'identity layer built on OAuth 2.0 adding proper user authentication to authorization framework' },
      
      // Topic 10: Apigee
      { term: 'Apigee', definition: 'Google Cloud full lifecycle API management platform for designing securing deploying monitoring and monetizing APIs' },
      { term: 'API Proxy', definition: 'managed layer in Apigee sitting between clients and backend services providing controlled documented API' },
      { term: 'API Policy', definition: 'reusable Apigee configuration for authentication rate limiting transformation and caching without changing backend code' },
      { term: 'Developer Portal', definition: 'self-service platform where external developers discover APIs read documentation and obtain credentials' },
      { term: 'API monetization', definition: 'supporting usage-based billing and rate plans for APIs offered as commercial product' }
    ]
  },

  {
    id: 'soen-201-data-structures',
    name: 'SOEN 201 - Data Structures and Algorithms',
    description: 'Arrays, trees, graphs, sorting, searching, and algorithm analysis',
    termCount: 35,
    terms: [
      { term: 'Array', definition: 'data structure storing fixed-size sequential collection of elements of same type' },
      { term: 'Linked list', definition: 'linear data structure where elements are stored in nodes with pointers to next node' },
      { term: 'Stack', definition: 'linear data structure following Last In First Out LIFO principle for element access' },
      { term: 'Queue', definition: 'linear data structure following First In First Out FIFO principle for element access' },
      { term: 'Binary tree', definition: 'hierarchical data structure where each node has at most two children left and right' },
      { term: 'BST', definition: 'Binary Search Tree where left subtree contains smaller values and right contains larger values' },
      { term: 'AVL tree', definition: 'self-balancing binary search tree where heights of left and right subtrees differ by at most one' },
      { term: 'Heap', definition: 'complete binary tree where parent node is always greater or smaller than children depending on max-heap or min-heap' },
      { term: 'Graph', definition: 'non-linear data structure consisting of vertices nodes and edges connections between nodes' },
      { term: 'BFS', definition: 'Breadth First Search graph traversal algorithm exploring all neighbors before moving to next level' },
      { term: 'DFS', definition: 'Depth First Search graph traversal algorithm exploring as far as possible before backtracking' },
      { term: 'Dijkstra algorithm', definition: 'algorithm finding shortest path from source vertex to all other vertices in weighted graph' },
      { term: 'Spanning tree', definition: 'subgraph of graph that is tree connecting all vertices with minimum possible edges' },
      { term: 'Hash table', definition: 'data structure implementing associative array mapping keys to values using hash function' },
      { term: 'Hash function', definition: 'function mapping data of arbitrary size to fixed-size values for efficient lookup' },
      { term: 'Collision', definition: 'situation where hash function maps two different keys to same index in hash table' },
      { term: 'Quicksort', definition: 'efficient divide-and-conquer sorting algorithm with average time complexity O n log n' },
      { term: 'Mergesort', definition: 'stable divide-and-conquer sorting algorithm dividing array into halves recursively then merging sorted halves' },
      { term: 'Heapsort', definition: 'comparison-based sorting algorithm using binary heap data structure with time complexity O n log n' },
      { term: 'Binary search', definition: 'efficient search algorithm finding target value in sorted array by repeatedly dividing search interval in half' },
      { term: 'Big O notation', definition: 'mathematical notation describing upper bound of algorithm time or space complexity as input grows' },
      { term: 'Time complexity', definition: 'measure of amount of time algorithm takes to complete as function of input size' },
      { term: 'Space complexity', definition: 'measure of amount of memory algorithm uses as function of input size' },
      { term: 'Recursion', definition: 'technique where function calls itself directly or indirectly to solve problem by breaking into subproblems' },
      { term: 'Divide and conquer', definition: 'algorithm design paradigm breaking problem into smaller subproblems solving recursively and combining solutions' },
      { term: 'Dynamic programming', definition: 'optimization technique solving complex problems by breaking into overlapping subproblems and storing results' },
      { term: 'Greedy algorithm', definition: 'algorithm making locally optimal choice at each step hoping to find global optimum' },
      { term: 'Adjacency matrix', definition: 'graph representation using 2D array where cell i j indicates edge between vertices i and j' },
      { term: 'Adjacency list', definition: 'graph representation using array of lists where each list contains neighbors of vertex' },
      { term: 'In-order traversal', definition: 'tree traversal visiting left subtree then root then right subtree' },
      { term: 'Pre-order traversal', definition: 'tree traversal visiting root then left subtree then right subtree' },
      { term: 'Post-order traversal', definition: 'tree traversal visiting left subtree then right subtree then root' },
      { term: 'O n', definition: 'linear time complexity where algorithm runtime grows proportionally with input size' },
      { term: 'O log n', definition: 'logarithmic time complexity where algorithm runtime grows logarithmically with input size' },
      { term: 'O n squared', definition: 'quadratic time complexity where algorithm runtime grows proportionally to square of input size' }
    ]
  },

  {
    id: 'soen-303-component',
    name: 'SOEN 303 - Component Development',
    description: 'Component-based software engineering, modularity, interfaces, and testing',
    termCount: 20,
    terms: [
      { term: 'Component based software engineering', definition: 'approach designing reusable modular software components with well-defined interfaces' },
      { term: 'Software component', definition: 'self-contained unit of code with defined interface that can be composed with other components' },
      { term: 'Reusability', definition: 'ability to use existing software components in new applications without modification' },
      { term: 'Modularity', definition: 'design principle dividing system into separate independent modules with specific functionality' },
      { term: 'Interface', definition: 'contract defining how component interacts with other components specifying methods and data types' },
      { term: 'Component contract', definition: 'formal specification defining preconditions postconditions and invariants for component behavior' },
      { term: 'Middleware', definition: 'software layer providing common services and capabilities between operating system and applications' },
      { term: 'Plugin architecture', definition: 'design pattern allowing application functionality to be extended through pluggable components' },
      { term: 'Dependency management', definition: 'controlling and tracking external libraries and components application depends on' },
      { term: 'Semantic versioning', definition: 'versioning scheme using MAJOR MINOR PATCH numbers to communicate compatibility of releases' },
      { term: 'Component versioning', definition: 'managing different versions of component to maintain compatibility and track changes' },
      { term: 'Unit testing components', definition: 'testing individual component in isolation to verify it behaves correctly independently' },
      { term: 'Mocking', definition: 'creating simulated objects that mimic behavior of real components for testing purposes' },
      { term: 'Component integration', definition: 'process of combining individual software components into complete working system' },
      { term: 'Third party component', definition: 'software component developed by external vendor or open source project' },
      { term: 'Loose coupling', definition: 'design principle minimizing dependencies between components for better maintainability' },
      { term: 'Tight coupling', definition: 'situation where components have many dependencies making system rigid and hard to change' },
      { term: 'Component composition', definition: 'combining multiple components together to create more complex functionality' },
      { term: 'Black box component', definition: 'component where internal implementation is hidden and only interface is visible' },
      { term: 'White box component', definition: 'component where internal implementation is visible and accessible for modification' }
    ]
  },

  {
    id: 'soen-305-java-oop',
    name: 'SOEN 305 - Object Oriented Programming (Java II)',
    description: 'Advanced OOP, design patterns, collections, multithreading, and testing',
    termCount: 30,
    terms: [
      { term: 'Inheritance', definition: 'OOP mechanism allowing class to inherit properties and methods from parent class' },
      { term: 'Polymorphism', definition: 'OOP ability for objects of different classes to respond to same method call differently' },
      { term: 'Encapsulation', definition: 'OOP principle bundling data and methods operating on data within single unit or class' },
      { term: 'Abstraction', definition: 'OOP principle hiding complex implementation details and showing only essential features' },
      { term: 'Interface Java', definition: 'reference type in Java defining contract of methods that class must implement' },
      { term: 'Abstract class', definition: 'class that cannot be instantiated and may contain abstract methods without implementation' },
      { term: 'Singleton pattern', definition: 'design pattern ensuring class has only one instance with global point of access' },
      { term: 'Factory pattern', definition: 'creational pattern providing interface for creating objects without specifying exact class' },
      { term: 'Observer pattern', definition: 'behavioral pattern where object maintains list of dependents notifying them of state changes' },
      { term: 'Strategy pattern', definition: 'behavioral pattern defining family of algorithms making them interchangeable at runtime' },
      { term: 'Exception handling', definition: 'mechanism for detecting and responding to runtime errors in structured way' },
      { term: 'Try catch block', definition: 'Java construct for handling exceptions where try contains code that may throw exception' },
      { term: 'Finally block', definition: 'Java block always executed after try-catch whether exception thrown or not for cleanup' },
      { term: 'Collections framework', definition: 'unified architecture in Java for representing and manipulating groups of objects' },
      { term: 'List Java', definition: 'ordered collection interface in Java allowing duplicate elements with positional access' },
      { term: 'Set Java', definition: 'collection interface in Java that does not allow duplicate elements' },
      { term: 'Map Java', definition: 'object mapping keys to values with no duplicate keys allowed' },
      { term: 'ArrayList', definition: 'resizable array implementation of List interface providing fast random access' },
      { term: 'HashMap', definition: 'hash table based implementation of Map interface providing constant-time performance for basic operations' },
      { term: 'Generics', definition: 'Java feature enabling types to be parameters when defining classes interfaces and methods' },
      { term: 'Type parameter', definition: 'placeholder for type that is specified when generic class interface or method is used' },
      { term: 'Thread', definition: 'smallest unit of execution within process allowing concurrent execution of code' },
      { term: 'Multithreading', definition: 'concurrent execution of multiple threads within single process sharing same memory space' },
      { term: 'Synchronization', definition: 'mechanism controlling access of multiple threads to shared resources to prevent race conditions' },
      { term: 'Race condition', definition: 'situation where behavior depends on timing of uncontrollable events like thread scheduling' },
      { term: 'File I O', definition: 'input output operations for reading from and writing to files in Java' },
      { term: 'Serialization', definition: 'converting object into byte stream for storage or transmission over network' },
      { term: 'Deserialization', definition: 'reconstructing object from byte stream previously created through serialization' },
      { term: 'JUnit', definition: 'unit testing framework for Java providing annotations and assertions for writing tests' },
      { term: 'Test driven development', definition: 'software development approach where tests are written before implementing actual code' }
    ]
  },

  {
    id: 'soen-320-special-topics',
    name: 'SOEN 320 - Special Topics in Software Engineering',
    description: 'DevOps, CI/CD, microservices, cloud-native, and Agile practices',
    termCount: 25,
    terms: [
      { term: 'DevOps', definition: 'cultural and technical movement combining software development and IT operations for faster delivery' },
      { term: 'CI CD', definition: 'Continuous Integration and Continuous Delivery automated pipeline building testing and deploying code changes' },
      { term: 'Continuous Integration', definition: 'practice of frequently merging code changes into shared repository with automated builds and tests' },
      { term: 'Continuous Delivery', definition: 'practice ensuring code is always in deployable state through automated testing and release processes' },
      { term: 'Continuous Deployment', definition: 'practice automatically deploying every change that passes tests to production environment' },
      { term: 'Microservices architecture', definition: 'architectural style structuring application as collection of loosely coupled independently deployable services' },
      { term: 'Service independence', definition: 'microservices principle where each service can be developed deployed and scaled independently' },
      { term: 'API Gateway microservices', definition: 'entry point for client requests routing them to appropriate microservices' },
      { term: 'Service discovery', definition: 'automatic detection of services and their network locations in microservices architecture' },
      { term: 'Cloud native', definition: 'approach building and running applications leveraging cloud computing advantages like scalability and resilience' },
      { term: 'Container', definition: 'lightweight isolated runtime environment packaging application with its dependencies' },
      { term: 'Docker', definition: 'platform for developing shipping and running applications in containers' },
      { term: 'Kubernetes', definition: 'container orchestration platform automating deployment scaling and management of containerized applications' },
      { term: 'Infrastructure as Code', definition: 'managing and provisioning infrastructure through machine-readable definition files rather than manual processes' },
      { term: 'Agile methodology', definition: 'iterative approach to software development emphasizing flexibility collaboration and customer feedback' },
      { term: 'Scrum framework', definition: 'Agile framework organizing work into sprints with defined roles ceremonies and artifacts' },
      { term: 'Sprint planning', definition: 'Scrum ceremony where team plans work to be completed during upcoming sprint' },
      { term: 'Daily standup', definition: 'brief daily meeting where team synchronizes activities and plans work for next 24 hours' },
      { term: 'Sprint review', definition: 'Scrum ceremony where team demonstrates completed work to stakeholders' },
      { term: 'Sprint retrospective', definition: 'Scrum ceremony where team reflects on sprint and identifies process improvements' },
      { term: 'Product Owner', definition: 'Scrum role responsible for maximizing product value and managing product backlog' },
      { term: 'Scrum Master', definition: 'Scrum role facilitating Scrum process and removing impediments for development team' },
      { term: 'Development Team', definition: 'self-organizing group of professionals doing work of delivering product increment' },
      { term: 'Technical debt', definition: 'implied cost of additional rework caused by choosing quick solution now instead of better approach' },
      { term: 'Refactoring', definition: 'restructuring existing code without changing external behavior to improve readability and maintainability' }
    ]
  },

  {
    id: 'soen-370-design-development',
    name: 'SOEN 370 - Design and Development of Software',
    description: 'SOLID principles, architecture patterns, UML, SDLC, and quality assurance',
    termCount: 30,
    terms: [
      { term: 'SOLID principles', definition: 'five design principles for object-oriented programming promoting maintainable and scalable code' },
      { term: 'Single Responsibility', definition: 'SOLID principle stating class should have only one reason to change' },
      { term: 'Open Closed Principle', definition: 'SOLID principle that software entities should be open for extension but closed for modification' },
      { term: 'Liskov Substitution', definition: 'SOLID principle that objects of superclass should be replaceable with objects of subclass without breaking application' },
      { term: 'Interface Segregation', definition: 'SOLID principle that no client should be forced to depend on methods it does not use' },
      { term: 'Dependency Inversion', definition: 'SOLID principle that high-level modules should not depend on low-level modules both should depend on abstractions' },
      { term: 'Coupling', definition: 'measure of how closely connected different modules or components are to each other' },
      { term: 'Cohesion', definition: 'measure of how closely related and focused responsibilities of single module are' },
      { term: 'MVC pattern', definition: 'Model View Controller pattern separating application into data layer presentation layer and control logic' },
      { term: 'Layered architecture', definition: 'architectural pattern organizing system into horizontal layers with distinct responsibilities' },
      { term: 'Microservices pattern', definition: 'architectural pattern structuring application as collection of loosely coupled services' },
      { term: 'Requirements engineering', definition: 'process of defining documenting and maintaining requirements for software system' },
      { term: 'Functional requirements', definition: 'specifications defining what system should do describing specific behaviors or functions' },
      { term: 'Non-functional requirements', definition: 'specifications defining how system should perform covering quality attributes like performance and security' },
      { term: 'UML', definition: 'Unified Modeling Language standardized visual language for modeling software systems' },
      { term: 'Class diagram', definition: 'UML diagram showing static structure of system including classes attributes methods and relationships' },
      { term: 'Sequence diagram', definition: 'UML diagram showing how objects interact in particular sequence of time' },
      { term: 'Use case diagram', definition: 'UML diagram representing functional requirements showing actors and their interactions with system' },
      { term: 'Activity diagram', definition: 'UML diagram depicting workflow of stepwise activities and actions with support for choice iteration and concurrency' },
      { term: 'Waterfall model', definition: 'sequential SDLC approach where progress flows downward through phases like requirements design implementation testing' },
      { term: 'Agile model', definition: 'iterative SDLC approach emphasizing flexibility collaboration and rapid delivery of working software' },
      { term: 'Spiral model', definition: 'SDLC combining iterative nature with systematic aspects of waterfall model focusing on risk analysis' },
      { term: 'Software quality assurance', definition: 'systematic process ensuring software meets specified requirements and quality standards' },
      { term: 'Verification', definition: 'process checking if software is being built correctly according to specifications' },
      { term: 'Validation', definition: 'process checking if right software is being built meeting actual user needs' },
      { term: 'Code review', definition: 'systematic examination of source code to find and fix mistakes overlooked in development phase' },
      { term: 'Version control', definition: 'system recording changes to files over time allowing recall of specific versions later' },
      { term: 'Git', definition: 'distributed version control system tracking changes in source code during software development' },
      { term: 'Branching', definition: 'version control feature creating separate line of development diverging from main codebase' },
      { term: 'Merging', definition: 'version control operation integrating changes from one branch into another branch' }
    ]
  }
];

// Helper function to get all units including original + comprehensive
export function getAllUnits(originalUnits) {
  return [...originalUnits, ...comprehensiveUnits];
}

// Export for direct use
export default comprehensiveUnits;
