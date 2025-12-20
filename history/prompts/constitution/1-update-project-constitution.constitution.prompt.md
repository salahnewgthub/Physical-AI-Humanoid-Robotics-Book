---
model: claude-sonnet-4-5-20250929
name: Update Project Constitution
description: Update project constitution for AI-Spec Driven Book
---

## Prompt

Project:
AI-Spec Driven Book with Embedded RAG Chatbot

Core Principles

Spec-first development using Spec-Kit Plus

Technical accuracy and verifiability

Clear, developer-focused writing

Fully reproducible build and deployment

Tight integration of content, code, and AI systems

Key Standards
Book Creation

Framework: Docusaurus

Authored via Claude Code

All content governed by Spec-Kit Plus specs

Instructional, implementation-oriented style

RAG Chatbot

Stack: OpenAI Agents/ChatKit, FastAPI, Neon Postgres, Qdrant Cloud (Free)

Answers strictly from book content

Supports user-selected text–only Q&A

Explicitly refuses out-of-scope queries

Accuracy & Sources

No hallucinated APIs or features

Versions and assumptions stated

Claims traceable to official documentation

Deployment

Hosted on GitHub Pages

Reproducible repo with README and setup steps

Constraints

Static site only

Free-tier services only

Public, documented dependencies

Success Criteria

Book builds and deploys correctly

RAG chatbot functions as specified

Project reproducible by an independent developer

## Response snapshot

# AI-Spec Driven Book with Embedded RAG Chatbot Constitution

## Core Principles

### Spec-first Development Using Spec-Kit Plus
All features and functionality must be specified using Spec-Kit Plus before implementation begins. Every addition to the codebase must have a corresponding specification document that defines requirements, interfaces, and acceptance criteria before development starts.

### Technical Accuracy and Verifiability
All content and code must be technically accurate and verifiable. No hallucinated APIs, features, or capabilities should be introduced. All claims must be traceable to official documentation with versions and assumptions clearly stated.

### Clear, Developer-Focused Writing
Documentation and code comments must be written with developers in mind. Content should be instructional and implementation-oriented, focusing on practical application rather than theoretical concepts.

### Fully Reproducible Build and Deployment
All build and deployment processes must be fully reproducible by an independent developer. Setup steps, dependencies, and deployment procedures must be documented and tested to ensure anyone can recreate the project successfully.

### Tight Integration of Content, Code, and AI Systems
Content, code, and AI systems must be tightly integrated. The RAG chatbot must strictly answer from book content only, supporting user-selected text Q&A and explicitly refusing out-of-scope queries.

## Additional Constraints

Technology Stack Requirements:
- Book Framework: Docusaurus
- RAG Stack: OpenAI Agents/ChatKit, FastAPI, Neon Postgres, Qdrant Cloud (Free tier)
- Deployment: GitHub Pages
- Static site only (no dynamic server-side rendering)
- Free-tier services only to maintain accessibility
- Public, documented dependencies to ensure transparency

Content Standards:
- All content authored via Claude Code
- All content governed by Spec-Kit Plus specifications
- Instructional, implementation-oriented style
- Strict adherence to technical accuracy

## Development Workflow

Code Review Requirements:
- All pull requests must verify compliance with constitution principles
- Specifications must be reviewed and approved before implementation
- Technical accuracy must be validated against official documentation
- Build and deployment processes must be tested for reproducibility

Quality Gates:
- Book must build and deploy correctly
- RAG chatbot must function as specified
- Project must be reproducible by an independent developer
- All dependencies and setup steps must be documented

Testing Requirements:
- Functional testing of RAG chatbot Q&A capabilities
- Build process validation
- Deployment verification
- Cross-browser compatibility for static site

## Governance

This constitution supersedes all other development practices and guidelines. All team members must adhere to these principles during development. Any deviation from these principles must be documented with justification and approved by the project maintainers.

Amendments to this constitution require:
1. Documentation of the proposed changes with rationale
2. Approval from project maintainers
3. Review and update of all dependent artifacts and templates
4. Communication of changes to all team members

All pull requests and code reviews must verify compliance with these principles. Complexity must be justified against the core principles, particularly regarding technical accuracy and reproducibility.

**Version**: 1.0.0 | **Ratified**: 2025-12-20 | **Last Amended**: 2025-12-20

## Outcome

- ✅ Impact: Created new project constitution with 5 core principles and governance structure
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with complete constitution
- 🔁 Next prompts: Plan and spec creation for AI-Spec Driven Book
- 🧠 Reflection: Constitution successfully created based on provided specifications with proper governance structure

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - Constitution properly formatted and comprehensive
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Create feature specification for book creation