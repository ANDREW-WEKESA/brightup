# BrightUp: Software Requirements Specification

**Version:** 1.0  
**Date:** October 18, 2026  
**Author:** @ANDREW

## 1. Introduction

BrightUp is a revision game that turns a student's notes into short questions and letter-scramble puzzles, so key terms are recalled and spelt correctly. Version 1 is built for Year 3 BSc Software Engineering units and accepts notes from any university.

### Purpose
This document defines what version 1 must do, how it will be judged, and what is left for later.

### Vision
Help anyone revise any subject through simple questions, answers, and scrambled word rebuilding.

### Version 1 Scope
- Select Year 3 Software Engineering units
- Paste or upload notes
- Answer questions from term/definition pairs
- Rebuild scrambled terms when wrong
- Track progress per unit

### Out of Scope for V1
AI questions, shared accounts, multiplayer, payments

## 2. Users & Environment

**Primary User:** Year 3 Software Engineering student  
**Operating Environment:** Chrome, Firefox, Safari, Edge on all platforms, 360px+ screens  
**Tech Stack:** JavaScript, Node, Express, React with Vite

## 3. Functional Requirements

See full SRS document in this folder for all 28 requirements (FR-1 to FR-28) covering:
- Unit selection
- Notes import  
- Questions and answers
- Scramble mechanics
- Revision queue
- Progress tracking

## 4. Content Requirements

**Starter Units (73 terms total):**
1. Software Testing and Quality Assurance - 16 terms
2. Software Project Management - 15 terms
3. Software Architecture and Design Patterns - 15 terms
4. Information Security - 15 terms
5. Mobile Application Development - 12 terms

## 5. Non-Functional Requirements

- Speed: <200ms answer feedback
- Page weight: <300KB first load
- Offline: playable without internet once loaded
- Accessibility: WCAG 2.1 AA
- Privacy: No data collection, notes stay on device
- Security: Escaped content, 1MB limit, rate limiting

## 6. Release Plan

1. **V1:** Core game for Year 3 SE
2. **V1.1:** More units, .docx/.pdf import
3. **V2:** Accounts and sharing
4. **V3:** AI teacher

## 7. Acceptance Criteria

9 scenarios must pass before V1 release - see full SRS.
