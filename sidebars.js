// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Physical AI & Humanoid Robotics',
      items: [
        'intro',
        {
          type: 'category',
          label: 'Module 1: The Robotic Nervous System (ROS 2)',
          items: [
            'module-1/chapter-1-ros2-foundations',
            'module-1/chapter-2-python-ai-control',
          ],
        },
        {
          type: 'category',
          label: 'Module 2: The Digital Twin (Gazebo & Unity)',
          items: [
            'modules/digital-twin/index',
            'modules/digital-twin/chapter-1-physics-simulation-gazebo',
            'modules/digital-twin/chapter-2-high-fidelity-unity',
            'modules/digital-twin/chapter-3-simulation-reality-transfer',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;