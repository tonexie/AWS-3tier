# AWS 3-Tier Architecture Project

This project demonstrates the implementation of a 3-tier architecture on AWS, consisting of the presentation layer, application layer, and database layer. It utilizes various AWS services to build a scalable, reliable, and secure web application infrastructure.

## Project Overview

- **Frontend**: The presentation layer is built using a React application served by NGINX. This layer is deployed on an EC2 instance and configured to handle static content and proxy API requests to the backend server.
- **Backend**: The application layer is implemented with a Node.js server that handles business logic and data processing. It is deployed behind an AWS Application Load Balancer (ALB) to ensure fault tolerance and scalability.
- **Database**: The data layer uses a MySQL database hosted on Amazon RDS, providing persistent storage and high availability for the application's data.

## Features

- **Scalable Architecture**: Built to scale across multiple instances with the use of AWS Elastic Load Balancing.
- **High Availability**: Utilizes Amazon RDS for a highly available and fault-tolerant database solution.
- **Secure Communication**: Reverse proxy setup with NGINX reduces the need for CORS, enhancing security.

## Prerequisites

- AWS account with necessary IAM permissions
- EC2 instances configured in the appropriate VPC
- Node.js, npm, and NGINX installed on the EC2 instances
- MySQL database setup in Amazon RDS
