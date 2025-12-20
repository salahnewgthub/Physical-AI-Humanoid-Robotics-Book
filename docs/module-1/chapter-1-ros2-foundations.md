---
title: Chapter 1 - ROS 2 Foundations
description: Understanding ROS 2 as middleware connecting AI intelligence to humanoid robot bodies
sidebar_label: Chapter 1 - ROS 2 Foundations
sidebar_position: 2
tags: [ros2, middleware, ai, robotics, nodes, topics, services, actions, publish-subscribe, message-passing, robotic-nervous-system, physical-ai, humanoid-robotics, rclpy, communication-patterns]
---

# Chapter 1: ROS 2 Foundations

## Table of Contents
- [Learning Objectives](#learning-objectives)
- [What is ROS 2 and Why It Matters for Physical AI](#what-is-ros-2-and-why-it-matters-for-physical-ai)
  - [The Middleware Role](#the-middleware-role)
- [ROS 2 Nodes](#ros-2-nodes)
  - [Creating a Simple Node](#creating-a-simple-node)
- [ROS 2 Topics and Message Passing](#ros-2-topics-and-message-passing)
  - [Publisher and Subscriber Model](#publisher-and-subscriber-model)
  - [Example: Publisher Node](#example-publisher-node)
  - [Example: Subscriber Node](#example-subscriber-node)
- [ROS 2 Services and Actions](#ros-2-services-and-actions)
  - [Services](#services)
  - [Actions](#actions)
- [ROS 2 as a Robotic Nervous System](#ros-2-as-a-robotic-nervous-system)
  - [Sensing (Sensory Neurons)](#sensing-sensory-neurons)
  - [Decision-Making (Brain/Spinal Cord)](#decision-making-brainspinal-cord)
  - [Actuation (Motor Neurons)](#actuation-motor-neurons)
- [Key Takeaways](#key-takeaways)
- [Next Steps](#next-steps)

## Learning Objectives

After completing this chapter, you will be able to:
- Explain what ROS 2 is and why it matters for Physical AI
- Describe the core concepts of ROS 2 (nodes, topics, services, actions)
- Understand how ROS 2 functions as a robotic nervous system
- Explain how ROS 2 coordinates robot behavior through its distributed architecture

## What is ROS 2 and Why It Matters for Physical AI

ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. Think of it as a collection of tools, libraries, and conventions that simplify the task of creating complex and robust robot behavior across a wide variety of robot platforms. Despite the name "Operating System," ROS 2 is not an actual operating system - it's a middleware framework that runs on top of real operating systems like Linux, Windows, or macOS.

For AI engineers working with humanoid robots, ROS 2 serves as the critical middleware that connects your AI intelligence to the physical robot body. It enables your AI systems to sense the environment, make decisions, and actuate the robot's movements. Without ROS 2, you would need to write complex communication protocols and hardware interfaces from scratch - ROS 2 provides standardized ways to handle these challenges.

### The Middleware Role

ROS 2 acts as middleware (a software layer that connects different applications) between:
- Your AI algorithms and decision-making systems (typically running in Python)
- The robot's hardware controllers and sensors
- The communication systems that coordinate different robot components

This middleware approach allows AI engineers to focus on intelligence while ROS 2 handles the complex task of connecting that intelligence to the physical robot. Think of it like a universal translator that allows different parts of a robot to communicate with each other, regardless of what programming language they're written in or what hardware they're running on.

## ROS 2 Nodes

Nodes are the fundamental building blocks of a ROS 2 system. Think of a node as a single program or process that performs a specific task and communicates with other nodes to accomplish a larger goal. In a typical robot system, you might have different nodes for:

- Sensor processing (reading data from cameras, LIDAR, etc.)
- Motion control (controlling motors and actuators)
- Path planning (determining how to move through space)
- AI decision making (using machine learning to make choices)
- User interfaces (displaying information or accepting commands)

Each node runs independently and communicates with other nodes through ROS 2's messaging system. This modular approach allows you to develop, test, and maintain different parts of your robot system separately.

### Creating a Simple Node

Here's a minimal example of a ROS 2 node in Python:

```python
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')
        self.get_logger().info('Hello from minimal node!')

def main(args=None):
    rclpy.init(args=args)
    node = MinimalNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

Let's break down this code:

- `import rclpy` and `from rclpy.node import Node`: These import the ROS 2 Python client library and the Node class
- `class MinimalNode(Node)`: This creates a new class that inherits from ROS 2's Node class
- `super().__init__('minimal_node')`: This initializes the parent Node class with a name for our node
- `self.get_logger().info('Hello from minimal node!')`: This prints a message to the ROS 2 log system
- The `main` function initializes ROS 2, creates the node, starts it running (`rclpy.spin`), and handles cleanup when the program ends

This example demonstrates the basic structure of a ROS 2 node using the `rclpy` library (the Python client library for ROS 2).

## ROS 2 Topics and Message Passing

Topics enable asynchronous communication between nodes through a publish/subscribe model. This is one of the most common communication patterns in ROS 2 systems. Think of it like a message board where one node can "post" messages (publish) and other nodes can "read" those messages (subscribe) without needing to know about each other directly.

### Publisher and Subscriber Model

In the publish/subscribe model:
- Publishers send messages to a topic (like posting on a bulletin board)
- Subscribers receive messages from a topic (like reading posts on the bulletin board)
- Multiple nodes can publish to or subscribe from the same topic
- Communication is decoupled: publishers don't know who subscribes, and subscribers don't know who publishes
- This allows for flexible, scalable robot systems where components can be added or removed without affecting others

### Example: Publisher Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

Let's break down this publisher code:

- `self.create_publisher(String, 'topic', 10)`: Creates a publisher that sends String messages to the topic named 'topic', with a queue size of 10 messages
- `self.create_timer(timer_period, self.timer_callback)`: Creates a timer that calls `timer_callback` every 0.5 seconds
- `self.timer_callback`: This method runs periodically, creates a message, and publishes it to the topic

### Example: Subscriber Node

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

And the subscriber code:

- `self.create_subscription(String, 'topic', self.listener_callback, 10)`: Creates a subscription to the 'topic' that receives String messages, with a queue size of 10
- `self.listener_callback`: This method automatically gets called whenever a new message arrives on the topic

These examples show how two nodes can communicate through a topic named 'topic'. The publisher sends messages at regular intervals (every 0.5 seconds), and the subscriber receives and processes them as they arrive. The two nodes don't need to know about each other - they just need to agree on the topic name and message type.

## ROS 2 Services and Actions

While topics provide asynchronous, decoupled communication (like posting on a message board), ROS 2 also provides other communication patterns for different use cases that require more structured interactions.

### Services

Services provide synchronous request/response communication between nodes, similar to making a web API call. When a client sends a request to a service, it waits for a response before continuing execution. This is useful when you need a specific answer to a specific question.

Example service client:

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalClientAsync(Node):
    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClientAsync()
    response = minimal_client.send_request(1, 2)
    minimal_client.get_logger().info(f'Result: {response.sum}')
    minimal_client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This example shows a service that adds two integers together. The client sends a request with two numbers (1 and 2) and waits for the service to return the sum (3). Services are useful for operations that have a clear beginning and end, like asking a sensor for its current reading or commanding a robot to move to a specific position.

### Actions

Actions are designed for long-running tasks that require feedback and the ability to cancel, such as moving a robot arm to a specific position or navigating to a location. They combine features of both topics and services, providing:
- Initial request (like services)
- Continuous feedback during execution (like topics)
- Final result (like services)
- Ability to cancel the action (unique to actions)

Actions are ideal for tasks like navigation, where you want to know the progress of reaching a goal (e.g., "I'm 50% of the way to the destination") and potentially cancel if needed (e.g., if an obstacle appears).

## ROS 2 as a Robotic Nervous System

Thinking of ROS 2 as a robotic nervous system provides a helpful analogy for understanding its role in robotics:

### Sensing (Sensory Neurons)
Like sensory neurons that detect stimuli from the environment, ROS 2 nodes process data from various sensors:
- Cameras (vision)
- LIDAR (distance sensing)
- IMUs (inertial measurement)
- Force/torque sensors
- Touch sensors

These sensors publish data to topics that other nodes can subscribe to, similar to how sensory information travels through a nervous system.

### Decision-Making (Brain/Spinal Cord)
The AI and control algorithms act as the "brain" of the robot, processing sensor information and making decisions. These nodes might:
- Plan paths through environments
- Process visual information to identify objects
- Make high-level behavioral decisions
- Coordinate multiple subsystems

### Actuation (Motor Neurons)
Like motor neurons that activate muscles, ROS 2 nodes send commands to actuators:
- Joint controllers
- Grippers
- Wheels or other locomotion systems
- Any device that affects the robot's interaction with the environment

This distributed architecture allows for robust, flexible robot behavior where different components can be developed and tested independently while working together as a cohesive system.

## Key Takeaways

- ROS 2 is a middleware framework that connects AI systems to robot hardware
- It enables sensing, decision-making, and actuation in robotic systems
- It provides standardized communication patterns for robot components
- Nodes are the fundamental building blocks of ROS 2 systems
- Topics enable asynchronous communication through publish/subscribe model
- Services provide synchronous request/response communication
- Actions are for long-running tasks with feedback and cancellation
- ROS 2 functions as a nervous system connecting sensing, decision-making, and actuation

## Next Steps

Now that you understand the foundational concepts of ROS 2, continue to [Chapter 2: Python AI to Humanoid Control](./chapter-2-python-ai-control.md) to learn how to create ROS 2 nodes with Python and bridge AI logic to robot controllers.