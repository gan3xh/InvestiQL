# InvestiQL 

**InvestiQL** is an innovative educational platform that gamifies SQL learning through interactive crime-solving scenarios. Developed as part of a comprehensive database systems course project, this application transforms traditional SQL education into an engaging detective experience.

> **💡 Deployment Status**: While the application is fully developed and functional, live deployment has been postponed due to anticipated operational costs. Initial cost analysis revealed that hosting with expected user volumes would require approximately $150-200/month for database operations, CDN, and compute resources. As a student project developed for academic purposes, securing sustainable funding for ongoing operational expenses remains a challenge. The application is optimized for local development and can be deployed to personal cloud infrastructure.

## 📖 Project Overview

### Core Concept

The platform addresses the common challenge of making SQL education engaging by creating immersive crime-solving scenarios where users must write SQL queries to analyze evidence, track suspects, and solve mysteries.

## 📸 Screenshots

![Main Dashboard](https://github.com/user-attachments/assets/49796898-fdf9-449a-8a9e-adf63c1d8161)
*Main game interface showing available cases and detective progress*

![Case Selection](https://github.com/user-attachments/assets/46eda2d3-3c9d-4aaa-8fd3-0d148cde0b6c)
*Case selection screen with difficulty levels and XP rewards*

![SQL Editor Interface](https://github.com/user-attachments/assets/e37e8fd0-a224-4c0c-aa55-b6dab129a792)
*Interactive SQL editor with syntax highlighting and query execution*

![Results Dashboard](https://github.com/user-attachments/assets/9bc55008-aab4-4b58-9f70-23c7958c6173)
*Query results and case-solving feedback interface*

![Detective Profile](https://github.com/user-attachments/assets/9e3df75f-2a27-4773-a569-0a2b8f666db8)
*User profile showing achievements, rank progression, and statistics*

## 🎥 Demo Video

[![InvestiQL Demo Video](https://github.com/user-attachments/assets/8c02f9af-2513-4ca4-b8d2-ed55b44bfdbc)](https://github.com/user-attachments/assets/c34597b9-89b0-4267-9fc7-8c911b0ca7d5)
*2-minute demonstration of complete case-solving workflow from rookie to detective level*

**Video Contents:**
- Platform overview and navigation
- Solving a rookie-level case step-by-step
- Advanced query techniques demonstration
- Achievement system and progression mechanics
- Database schema exploration tools

## 📚 Project Documentation

📋 **[Complete Project Documentation](https://github.com/user-attachments/files/20510704/220103020_InvestiQL_Ganesh_Kumar.pdf)**

**Documentation Includes:**
- **Database Schema Design**: ERD diagrams and table relationships
- **API Endpoints Reference**: Complete REST API documentation
- **Architecture Decisions**: Technical choices and implementation rationale
- **Performance Analysis**: Query optimization strategies and benchmarks
- **Security Implementation**: Authentication and data protection measures
- **Testing Strategy**: Unit, integration, and user acceptance testing approaches
- **Deployment Guide**: Infrastructure setup and CI/CD pipeline configuration

## 🎯 Features & Functionality

### Game Mechanics
- **Case-Based Learning**: Each mystery presents real-world data analysis challenges
- **Progressive Difficulty System**: Structured learning path from beginner to advanced
- **Instant Query Validation**: Real-time feedback on SQL syntax and logic
- **Achievement System**: XP points and detective ranks to motivate learning
- **Comprehensive Scoring**: Performance metrics based on query efficiency and accuracy

### Educational Components
- **Guided Tutorials**: Interactive SQL concepts introduction
- **Hint System**: Contextual assistance without giving away solutions
- **Query Optimization Challenges**: Advanced scenarios focusing on performance
- **Error Analysis**: Detailed feedback on common SQL mistakes
- **Progress Tracking**: Individual learning analytics and improvement metrics

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Vite build system
- **Backend**: Supabase (PostgreSQL with real-time capabilities)
- **Authentication**: Supabase Auth with social login integration
- **Styling**: Tailwind CSS with custom detective theme
- **State Management**: React Context API with custom hooks
- **Deployment**: Originally deployed on Vercel with Supabase cloud

### Database Design
- **Normalized Schema**: Implements 3NF with carefully designed relationships
- **Realistic Data Sets**: Crime scenarios with authentic data patterns
- **Query Performance**: Optimized indexes and database structure
- **Data Integrity**: Comprehensive constraints and validation rules

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase CLI**
- **Git**

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/gan3xh/InvestiQL.git
cd InvestiQL
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Supabase**
   - Create a new project at [Supabase](https://supabase.com/)
   - Navigate to Settings → API to find your credentials
   - Create `.env.local` in the project root:
```bash
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_URL=your_project_url_here
```

4. **Set Up Database**
```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login and link project
supabase login
supabase link

# Deploy database schema and seed data
supabase db push
```

5. **Launch Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎮 How to Play

### Getting Started
1. **Create Account**: Register using email or social authentication
2. **Choose Your First Case**: Start with Rookie-level mysteries
3. **Analyze the Evidence**: Review case details and database schema
4. **Write SQL Queries**: Use the integrated editor to investigate
5. **Solve the Mystery**: Submit your solution and earn XP

### Case Difficulty Levels
- 🟢 **Rookie Detective** (50-100 XP): Basic SELECT, WHERE, and JOIN queries
- 🟡 **Detective** (100-200 XP): Subqueries, aggregations, and GROUP BY
- 🔴 **Inspector** (200-300 XP): Window functions, CTEs, and complex joins
- ⚫ **Chief Inspector** (300+ XP): Advanced optimization and analytical queries

## 📚 Educational Impact

### Learning Outcomes
Students using InvestiQL demonstrate improved:
- SQL query writing proficiency
- Database design understanding
- Problem-solving methodology
- Logical thinking application
- Data analysis skills

### Classroom Integration
The platform can be integrated into database coursework as:
- **Homework Assignments**: Case-based SQL practice
- **Lab Exercises**: Hands-on learning sessions
- **Assessment Tool**: Skills evaluation through gamified testing
- **Project Framework**: Starting point for student database projects

## 🔧 Current Status & Future Development

### Project Status
- **Development Phase**: Complete and functional
- **Testing**: Comprehensive test suite implemented
- **Deployment**: Currently offline due to operational costs
- **Maintenance**: Actively maintained for local development

### Planned Enhancements
- **Mobile Responsive Design**: Enhanced mobile experience
- **Multiplayer Competitions**: Team-based solving challenges
- **Instructor Dashboard**: Tools for educators to track student progress
- **Extended Case Library**: Additional mystery scenarios across various difficulty levels
- **Performance Analytics**: Advanced query performance insights

## 📄 License & Academic Use

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

## 🙏 Acknowledgments

- **Supabase Team**: For the excellent backend-as-a-service platform
- **[Awwwards](https://www.awwwards.com/)**: For frontend design inspiration and modern web aesthetics
- **Open Source Community**: For the tools and libraries that made this project possible

---
