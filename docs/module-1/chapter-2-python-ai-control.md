---
title: Chapter 2 - Python AI to Humanoid Control
description: Creating ROS 2 nodes with rclpy and bridging Python AI logic to robot controllers
sidebar_label: Chapter 2 - Python AI to Humanoid Control
sidebar_position: 3
tags: [ros2, python, ai, robotics, rclpy, nodes, topics, publishing, subscribing, motion-topics, sensor-topics, ai-control, robot-controllers, urdf, links, joints, humanoid-robotics, python-ai, robot-communication]
---

# Chapter 2: Python AI to Humanoid Control

## Table of Contents
- [Learning Objectives](#learning-objectives)
- [Creating ROS 2 Nodes with rclpy](#creating-ros-2-nodes-with-rclpy)
  - [Basic Node Structure](#basic-node-structure)
- [Bridging Python AI Logic to Robot Controllers](#bridging-python-ai-logic-to-robot-controllers)
  - [The Bridge Pattern](#the-bridge-pattern)
  - [Example: AI Decision to Motor Command](#example-ai-decision-to-motor-command)
- [Publishing to Motion and Sensor Topics](#publishing-to-motion-and-sensor-topics)
  - [Motion Command Publishing](#motion-command-publishing)
  - [Sensor Data Publishing](#sensor-data-publishing)
- [Subscribing to Motion and Sensor Topics](#subscribing-to-motion-and-sensor-topics)
  - [Sensor Data Subscription](#sensor-data-subscription)
  - [Motion Data Subscription](#motion-data-subscription)
- [Practical Examples of Python-to-Robot Communication](#practical-examples-of-python-to-robot-communication)
  - [Complete Obstacle Avoidance Node](#complete-obstacle-avoidance-node)
- [URDF Basics for Humanoid Robots](#urdf-basics-for-humanoid-robots)
  - [Links and Joints](#links-and-joints)
  - [Basic URDF Structure](#basic-urdf-structure)
  - [Key URDF Concepts](#key-urdf-concepts)
- [Reference: Interpreting URDF Files](#reference-interpreting-urdf-files)
  - [Links Structure](#links-structure)
  - [Joints Structure](#joints-structure)
  - [Common URDF Patterns](#common-urdf-patterns)
- [Key Takeaways](#key-takeaways)
- [Next Steps](#next-steps)

## Learning Objectives

After completing this chapter, you will be able to:
- Create ROS 2 nodes using the rclpy Python client library
- Bridge Python AI logic to robot controllers
- Publish and subscribe to motion and sensor topics
- Implement practical examples of Python-to-robot communication

## Creating ROS 2 Nodes with rclpy

The `rclpy` library is the Python client library for ROS 2. It provides the Python API for developing ROS 2 nodes, allowing Python developers to leverage their existing knowledge while connecting to robot systems. Think of `rclpy` as the bridge between your Python code and the ROS 2 ecosystem.

If you're familiar with Python development, you'll find `rclpy` intuitive since it follows Python conventions while providing access to ROS 2's powerful features for robotics. The library handles the complex communication protocols and system integration, so you can focus on implementing your AI logic and robot control algorithms.

`rclpy` provides all the functionality you need to create nodes that can publish data to topics, subscribe to data from topics, call services, provide services, and work with actions - all the core communication patterns in ROS 2.

### Basic Node Structure

Here's the basic structure of a ROS 2 node in Python:

```python
import rclpy
from rclpy.node import Node

class AINode(Node):
    def __init__(self):
        super().__init__('ai_node')
        self.get_logger().info('AI Node initialized')

def main(args=None):
    rclpy.init(args=args)
    ai_node = AINode()
    rclpy.spin(ai_node)
    ai_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This structure is the foundation for any Python-based AI node that needs to interact with ROS 2 systems.

## Bridging Python AI Logic to Robot Controllers

One of the key strengths of ROS 2 is its ability to bridge high-level AI logic written in Python with low-level robot controllers. This connection allows sophisticated AI algorithms to control physical robot behavior. Think of this as the "brain" (your AI) communicating with the "body" (the robot's motors and sensors) through a common language (ROS 2 messages).

This bridge is essential because:
- AI algorithms typically run on more powerful computers and use high-level concepts
- Robot controllers often run on embedded systems and need precise, low-level commands
- ROS 2 provides standardized message formats that both sides can understand

### The Bridge Pattern

The bridge between AI logic and robot controllers typically involves:

1. **AI Processing Node**: Runs Python AI algorithms, processes sensor data, makes high-level decisions (e.g., "navigate to the kitchen")
2. **Translation Layer**: Converts high-level AI decisions into specific robot-appropriate commands (e.g., converting "go forward" to specific motor speeds)
3. **Controller Interface**: Communicates with robot controllers via ROS 2 topics/services to execute the commands (e.g., sending motor speed commands to the hardware)

This pattern allows you to change either the AI algorithm or the robot hardware without affecting the other, as long as they both use the same ROS 2 message interfaces.

### Example: AI Decision to Motor Command

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float64MultiArray
from sensor_msgs.msg import LaserScan

class AIBridgeNode(Node):
    def __init__(self):
        super().__init__('ai_bridge_node')

        # Publisher to send motor commands to robot
        self.motor_pub = self.create_publisher(Float64MultiArray, '/motor_commands', 10)

        # Subscriber to receive sensor data
        self.sensor_sub = self.create_subscription(
            LaserScan,
            '/laser_scan',
            self.sensor_callback,
            10
        )

        # Timer for AI processing loop
        self.timer = self.create_timer(0.1, self.ai_processing_loop)

    def sensor_callback(self, msg):
        # Store sensor data for AI processing
        self.latest_scan = msg

    def ai_processing_loop(self):
        if hasattr(self, 'latest_scan'):
            # Run AI logic to determine next action
            motor_commands = self.run_ai_decision(self.latest_scan)

            # Publish commands to robot
            command_msg = Float64MultiArray()
            command_msg.data = motor_commands
            self.motor_pub.publish(command_msg)

    def run_ai_decision(self, scan_data):
        # Placeholder for actual AI logic
        # This could be a neural network, rule-based system, etc.
        return [0.0, 0.0, 0.0]  # Default: stop

def main(args=None):
    rclpy.init(args=args)
    ai_bridge = AIBridgeNode()
    rclpy.spin(ai_bridge)
    ai_bridge.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This example shows how Python AI logic can be integrated with robot control systems through ROS 2 messaging.

## Publishing to Motion and Sensor Topics

In ROS 2, publishing to topics is how nodes send information to other nodes. For AI systems, this often involves sending commands to actuators or sharing processed sensor data.

### Motion Command Publishing

To control robot movement, your AI node would publish to topics that robot controllers are subscribed to. Here's an example of publishing velocity commands:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class MotionCommandNode(Node):
    def __init__(self):
        super().__init__('motion_command_node')

        # Publisher for velocity commands (commonly used with differential drive robots)
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        # Timer to send commands at regular intervals
        self.timer = self.create_timer(0.1, self.send_motion_command)

        self.get_logger().info('Motion Command Node initialized')

    def send_motion_command(self):
        # Create a twist message (linear and angular velocities)
        twist_msg = Twist()

        # Set linear velocity (forward/backward)
        twist_msg.linear.x = 0.5  # Move forward at 0.5 m/s

        # Set angular velocity (rotation)
        twist_msg.angular.z = 0.2  # Rotate counter-clockwise at 0.2 rad/s

        # Publish the command
        self.cmd_vel_pub.publish(twist_msg)
        self.get_logger().info(f'Published velocity command: linear.x={twist_msg.linear.x}, angular.z={twist_msg.angular.z}')

def main(args=None):
    rclpy.init(args=args)
    motion_node = MotionCommandNode()
    rclpy.spin(motion_node)
    motion_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Sensor Data Publishing

Your AI system might also need to publish processed sensor data for other nodes to consume:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
from sensor_msgs.msg import LaserScan

class SensorProcessingNode(Node):
    def __init__(self):
        super().__init__('sensor_processing_node')

        # Subscribe to raw sensor data
        self.raw_scan_sub = self.create_subscription(
            LaserScan,
            '/raw_scan',
            self.scan_callback,
            10
        )

        # Publisher for processed sensor data
        self.processed_data_pub = self.create_publisher(Float32, '/obstacle_distance', 10)

        self.get_logger().info('Sensor Processing Node initialized')

    def scan_callback(self, msg):
        # Process the raw scan data
        # For example, find the minimum distance in the forward direction
        if len(msg.ranges) > 0:
            # Get distances in front of the robot (simplified)
            front_distances = msg.ranges[len(msg.ranges)//2-10:len(msg.ranges)//2+10]
            min_distance = min([d for d in front_distances if d > msg.range_min and d < msg.range_max])

            # Publish processed data
            processed_msg = Float32()
            processed_msg.data = float(min_distance)
            self.processed_data_pub.publish(processed_msg)

def main(args=None):
    rclpy.init(args=args)
    sensor_node = SensorProcessingNode()
    rclpy.spin(sensor_node)
    sensor_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

These examples demonstrate how AI systems can publish motion commands and processed sensor data in ROS 2.

## Subscribing to Motion and Sensor Topics

Subscribing to topics allows your AI node to receive data from sensors and other nodes in the system. This is crucial for AI systems that need to react to the environment or receive information from other components.

### Sensor Data Subscription

Here's an example of subscribing to common sensor topics:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Imu, JointState
from nav_msgs.msg import Odometry

class SensorSubscriberNode(Node):
    def __init__(self):
        super().__init__('sensor_subscriber_node')

        # Subscribe to laser scan data (for obstacle detection)
        self.scan_sub = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )

        # Subscribe to IMU data (for orientation)
        self.imu_sub = self.create_subscription(
            Imu,
            '/imu',
            self.imu_callback,
            10
        )

        # Subscribe to joint states (for robot configuration)
        self.joint_sub = self.create_subscription(
            JointState,
            '/joint_states',
            self.joint_callback,
            10
        )

        # Subscribe to odometry (for position tracking)
        self.odom_sub = self.create_subscription(
            Odometry,
            '/odom',
            self.odom_callback,
            10
        )

        self.get_logger().info('Sensor Subscriber Node initialized')

    def scan_callback(self, msg):
        # Process laser scan data
        if len(msg.ranges) > 0:
            min_range = min([r for r in msg.ranges if r >= msg.range_min and r <= msg.range_max])
            self.get_logger().info(f'Closest obstacle: {min_range:.2f}m')

    def imu_callback(self, msg):
        # Process IMU data for orientation
        orientation = msg.orientation
        self.get_logger().info(f'Orientation: ({orientation.x}, {orientation.y}, {orientation.z}, {orientation.w})')

    def joint_callback(self, msg):
        # Process joint states
        for i, name in enumerate(msg.name):
            position = msg.position[i]
            self.get_logger().info(f'Joint {name}: {position:.2f} rad')

    def odom_callback(self, msg):
        # Process odometry data for position
        position = msg.pose.pose.position
        self.get_logger().info(f'Position: ({position.x:.2f}, {position.y:.2f}, {position.z:.2f})')

def main(args=None):
    rclpy.init(args=args)
    sensor_node = SensorSubscriberNode()
    rclpy.spin(sensor_node)
    sensor_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Motion Data Subscription

You might also need to subscribe to motion-related topics to monitor robot behavior:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32

class MotionSubscriberNode(Node):
    def __init__(self):
        super().__init__('motion_subscriber_node')

        # Subscribe to velocity commands to monitor what's being sent
        self.cmd_vel_sub = self.create_subscription(
            Twist,
            '/cmd_vel',
            self.cmd_vel_callback,
            10
        )

        # Subscribe to motor feedback
        self.motor_feedback_sub = self.create_subscription(
            Float32,
            '/motor_feedback',
            self.motor_callback,
            10
        )

        self.get_logger().info('Motion Subscriber Node initialized')

    def cmd_vel_callback(self, msg):
        # Monitor velocity commands
        self.get_logger().info(f'Received velocity command: linear.x={msg.linear.x}, angular.z={msg.angular.z}')

    def motor_callback(self, msg):
        # Monitor motor feedback
        self.get_logger().info(f'Motor feedback: {msg.data}')

def main(args=None):
    rclpy.init(args=args)
    motion_node = MotionSubscriberNode()
    rclpy.spin(motion_node)
    motion_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

These examples show how AI systems can subscribe to various sensor and motion topics to gather information about the robot and its environment.

## Practical Examples of Python-to-Robot Communication

Let's look at a complete example that combines publishing and subscribing to create a simple AI behavior: obstacle avoidance.

### Complete Obstacle Avoidance Node

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
import math

class ObstacleAvoidanceNode(Node):
    def __init__(self):
        super().__init__('obstacle_avoidance_node')

        # Publisher for velocity commands
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        # Subscriber for laser scan data
        self.scan_sub = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )

        # Timer for control loop
        self.timer = self.create_timer(0.1, self.control_loop)

        # Robot state
        self.scan_data = None
        self.safe_distance = 0.5  # meters
        self.forward_speed = 0.3   # m/s
        self.rotation_speed = 0.5  # rad/s

        self.get_logger().info('Obstacle Avoidance Node initialized')

    def scan_callback(self, msg):
        self.scan_data = msg

    def control_loop(self):
        if self.scan_data is None:
            return

        # Process scan data to find minimum distance in front
        # Assuming front is in the middle of the scan range
        front_scan = self.scan_data.ranges[len(self.scan_data.ranges)//2-10:len(self.scan_data.ranges)//2+10]

        # Filter out invalid ranges
        valid_distances = [d for d in front_scan if self.scan_data.range_min < d < self.scan_data.range_max]

        if not valid_distances:
            return

        min_distance = min(valid_distances)

        # Create velocity command
        cmd = Twist()

        if min_distance < self.safe_distance:
            # Too close to obstacle - turn
            cmd.linear.x = 0.0
            cmd.angular.z = self.rotation_speed
        else:
            # Path clear - move forward
            cmd.linear.x = self.forward_speed
            cmd.angular.z = 0.0

        # Publish command
        self.cmd_vel_pub.publish(cmd)

def main(args=None):
    rclpy.init(args=args)
    avoidance_node = ObstacleAvoidanceNode()
    rclpy.spin(avoidance_node)
    avoidance_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This complete example demonstrates how Python AI logic can be used to create a simple but effective robot behavior by processing sensor data and generating appropriate motor commands.

## URDF Basics for Humanoid Robots

URDF (Unified Robot Description Format) is an XML format used in ROS to describe robot models. Think of URDF as a blueprint that tells ROS 2 everything about a robot's physical structure - its shape, size, how parts connect, and how they can move. Understanding URDF is crucial for AI engineers working with humanoid robots as it defines the robot's physical structure and helps your AI understand the robot's capabilities.

URDF files are important because they allow:
- Simulation of the robot before running on real hardware
- Visualization of the robot in tools like RViz
- Understanding of the robot's kinematic structure for motion planning
- Collision detection and avoidance

### Links and Joints

A robot model in URDF consists of two fundamental elements:

- **Links**: Rigid bodies that represent physical parts of the robot (e.g., torso, arms, legs, head). Each link has visual properties (how it looks) and collision properties (how it interacts with other objects).
- **Joints**: Connections between links that allow relative motion. Joints define how one part of the robot can move relative to another part.

### Basic URDF Structure

Here's a simple example of a humanoid robot arm in URDF:

```xml
<?xml version="1.0"?>
<robot name="simple_arm">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.1" radius="0.05"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.1" radius="0.05"/>
      </geometry>
    </collision>
  </link>

  <!-- Upper arm link -->
  <link name="upper_arm">
    <visual>
      <geometry>
        <cylinder length="0.3" radius="0.03"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.3" radius="0.03"/>
      </geometry>
    </collision>
  </link>

  <!-- Joint connecting base to upper arm -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="upper_arm"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>
</robot>
```

### Key URDF Concepts

1. **Links** define the rigid bodies of the robot and their visual/collision properties
2. **Joints** define how links connect and move relative to each other
3. **Joint types** include revolute (rotational), prismatic (linear), fixed, continuous, and others
4. **Origin** specifies the position and orientation of a joint relative to its parent
5. **Axis** defines the axis of rotation or translation for the joint

For humanoid robots, URDF files typically describe the entire kinematic chain from the base to the end effectors (hands, feet).

## Reference: Interpreting URDF Files

When reading URDF files, focus on these key elements:

### Links Structure
- Each `<link>` element defines a rigid body
- Contains `<visual>` and `<collision>` sub-elements that define appearance and collision properties
- Geometry types include `<box>`, `<cylinder>`, `<sphere>`, and `<mesh>`

### Joints Structure
- Each `<joint>` element connects two links
- Joint types: `revolute` (rotational with limits), `prismatic` (linear with limits), `fixed` (no movement), `continuous` (rotational without limits), `planar`, and `floating`
- Contains `<parent>` and `<child>` elements that specify the connected links
- `<axis>` element defines the joint's axis of motion
- `<limit>` element specifies movement constraints (for revolute and prismatic joints)

### Common URDF Patterns
- The robot structure forms a tree (no loops in the kinematic chain)
- The first link is typically named something like `base_link` or `base_footprint`
- Joint limits define the robot's physical capabilities
- Inertial properties may be included for dynamics simulation

## Key Takeaways

- rclpy is the Python client library for ROS 2
- It enables Python developers to create nodes that interact with robot systems
- The basic node structure provides the foundation for AI-to-robot communication
- AI logic can be bridged to robot controllers through a translation layer
- Publishing to topics allows AI systems to send commands and data to other nodes
- Subscribing to topics allows AI systems to receive sensor and motion data
- Complete AI behaviors combine both publishing and subscribing in control loops
- URDF describes robot structure with links (rigid bodies) and joints (connections)
- URDF files can be interpreted by focusing on links, joints, and their properties

## Next Steps

Now that you understand how to create ROS 2 nodes with Python and bridge AI logic to robot controllers, you may want to review [Chapter 1: ROS 2 Foundations](./chapter-1-ros2-foundations.md) if you need a refresher on the core concepts of ROS 2 (nodes, topics, services, actions).