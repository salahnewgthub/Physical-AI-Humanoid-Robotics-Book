# Data Model: Digital Twin Module (Gazebo & Unity)

## Core Entities

### Digital Twin Concept

- **Definition**: Virtual replica of a physical system used for simulation and testing
- **Attributes**:
  - Purpose: Simulation, testing, validation
  - Components: Physics model, visual model, sensor model
  - Properties: Accuracy, fidelity, update frequency
- **Relationships**: Connected to physical system, simulation environment

### Physics Simulation Model

- **Definition**: Computational representation of physical laws and behaviors
- **Attributes**:
  - Physics engine: ODE, Bullet, DART
  - Forces: Gravity, collisions, friction
  - Parameters: Mass, inertia, damping
- **Relationships**: Part of digital twin, connects to ROS 2

### Visual Simulation Model

- **Definition**: High-fidelity rendering of environments and interactions
- **Attributes**:
  - Rendering quality: Low, medium, high, ultra
  - Environment: Indoor, outdoor, mixed
  - Interaction type: Human-robot, robot-environment
- **Relationships**: Part of digital twin, may connect to ROS 2

### Sensor Simulation Model

- **Definition**: Virtual representation of physical sensors
- **Attributes**:
  - Sensor type: LiDAR, camera, IMU, force/torque
  - Accuracy: Noise parameters, range, resolution
  - Output format: Point cloud, image, orientation data
- **Relationships**: Connected to physics and visual models

### Simulation Platform

- **Definition**: Software environment for digital twin implementation
- **Types**: Gazebo, Unity
- **Attributes**:
  - Primary function: Physics simulation (Gazebo), Visual simulation (Unity)
  - Integration: ROS 2 connectivity
  - Fidelity: Physics accuracy, visual quality
- **Relationships**: Contains models, connects to ROS 2

### ROS 2 Integration Layer

- **Definition**: Communication bridge between simulation and control systems
- **Attributes**:
  - Communication protocol: DDS-based messaging
  - Message types: Sensor data, control commands
  - Synchronization: Real-time, simulation time
- **Relationships**: Connects simulation platforms to control systems

## Relationships

### Digital Twin Composition

- Digital Twin Concept "contains" Physics Simulation Model
- Digital Twin Concept "contains" Visual Simulation Model
- Digital Twin Concept "contains" Sensor Simulation Model

### Platform Capabilities

- Simulation Platform "implements" Physics Simulation Model (Gazebo primary)
- Simulation Platform "implements" Visual Simulation Model (Unity primary)
- Simulation Platform "supports" Sensor Simulation Model (both platforms)

### Integration Pattern

- Simulation Platform "connects to" ROS 2 Integration Layer
- ROS 2 Integration Layer "transports" Sensor Simulation Model data
- ROS 2 Integration Layer "receives" control commands

## State Transitions

### Simulation States

- **Configuration**: Setting up models, parameters, and connections
- **Initialization**: Loading models, starting physics engines
- **Running**: Active simulation with data exchange
- **Paused**: Simulation suspended but state preserved
- **Terminated**: Simulation stopped, resources released

### Data Flow States

- **Idle**: No data being processed
- **Processing**: Data from simulated sensors being generated
- **Transmitting**: Data being sent via ROS 2 topics/services
- **Receiving**: Control commands being received from ROS 2
- **Synchronized**: Data exchange coordinated between platforms

## Validation Rules

### Conceptual Integrity

- Each digital twin must include both physics and visual components
- Sensor models must be consistent with physical properties
- Integration layer must maintain real-time or simulation-time accuracy

### Platform Appropriateness

- Physics simulation models should be implemented in Gazebo
- Visual simulation models should be implemented in Unity
- Complex sensor simulation may require both platforms

### Educational Relevance

- All entities must be relevant to humanoid robotics simulation
- Complexity must match target audience knowledge level
- Concepts must be explainable without hands-on implementation
