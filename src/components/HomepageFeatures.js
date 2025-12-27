import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Physical AI Integration',
    description: (
      <>
        Learn how to connect AI intelligence to humanoid robot bodies through middleware systems like ROS 2,
        enabling sensing, decision-making, and actuation.
      </>
    ),
  },
  {
    title: 'ROS 2 Foundations',
    description: (
      <>
        Master the Robotic Operating System (ROS 2) as the nervous system connecting AI to physical robot systems.
      </>
    ),
  },
  {
    title: 'Digital Twins & Simulation',
    description: (
      <>
        Explore physics simulation with Gazebo and high-fidelity environments in Unity for safe AI development.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}