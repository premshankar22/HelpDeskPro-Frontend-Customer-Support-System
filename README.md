🧩 HelpDeskPro — Frontend Customer Support System

HelpDeskPro is a production-style frontend application built using React, Material UI (MUI), and React Router.
It simulates a real-world customer support / helpdesk platform similar to Zendesk, Freshdesk, or Jira Service Desk, focusing on frontend architecture, UX, and realistic workflows.

⚠️ This is a frontend-only project.
All authentication, tickets, chat flows, and APIs are mocked to demonstrate frontend logic and design patterns.

🚀 Project Overview

HelpDeskPro demonstrates how a professional support system works from the frontend perspective:

Customers raise, track, and manage support tickets

Admins monitor operations, assign agents, escalate issues, and supervise chats

Role-based routing ensures users see only what they’re allowed to see

UI/UX closely mirrors enterprise SaaS dashboards

The goal of this project is to build a scalable, clean, and interview-ready React application.


✨ Key Features
🔐 Authentication & Authorization

1. Login & Register pages

2. Fake authentication service (simulated backend)

3. Global auth state using Context API

4. Session persistence using localStorage

5. Role-based route protection

6. Admin vs Customer redirection after login

7. Fake JWT token simulation


👤 Customer Features
📊 Customer Dashboard

1. Ticket statistics (Open / In Progress / Resolved)

2. Recent ticket activity

3. Skeleton loaders for async UX

4. Quick “Create Ticket” CTA

5. Responsive card-based layout
   

🎟️ Ticket Management

1. Create support tickets with:

    [i] Auto-generated Ticket ID

    [ii] Auto timestamps (created / updated)

    [iii] Smart category suggestion (Account / Billing / Technical)

    [iv] Priority selection (Low / Medium / High)

    [v] Description & attachments

2. View tickets with:

    [i] Search (debounced)

    [ii] Status & priority filters

    [iii] Pagination

    [iv] Visual chips for status & priority

3. Ticket details dialog with full information


   💬 Smart Support Chat

1. Bot-first conversation

2. Automatic handoff to human agent

3. Chat modes:

🤖 Bot

⏳ Handoff

🧑‍💻 Agent

4. Typing delay simulation

5. Auto-scroll to latest message

6. Distinct UI for user / bot / agent messages

7. All logic encapsulated in a custom hook



👤 Profile & Settings

1. Auth-aware profile page

2. Displays:

Name, email, role, join date

3. Gradient header with avatar

4. Accordion-based sections

5. Settings page with:

Notifications

Appearance

Security

About

6. Frontend-only preference simulation





🛠️ Admin Features
📈 Admin Dashboard

1. Operational KPIs:

Open tickets

SLA risk

Active agents

Live chats

2. System health indicators

3. SLA confidence visualization

4. Actionable insight panels

5. Executive-style dashboard UI



🎫 Admin Ticket Management

1. Centralized ticket list

2. Search & status filtering

3. SLA countdown indicators

4. Bulk select & bulk actions

5. Assign tickets to agents

6. Escalate tickets & priorities

7. Real-time UI updates via Context API



🧑‍💼 Agent Management

1. Agent list with roles

2. Online / Busy / Offline status

3. Workload tracking

4. SLA overload risk detection

5. Role updates (Junior / Agent / Senior)

6. Enable / disable agents

7. Agent activity & capacity dialog

8. Skill tags per agent



📌 Ticket Assignment System

View unassigned tickets

SLA risk highlighting

Smart agent suggestion (lowest workload)

Manual agent assignment

Confirmation dialogs

Snackbar feedback for actions

🖥️ Live Chat Monitoring

Monitor all ongoing chats

Chat status tracking:

Waiting

Active

Escalated

Assign agents to chats

Escalate conversations

View full chat transcripts

Drawer-based conversation viewer

Priority flags for urgent chats




🧠 Architecture Overview
🔹 Context API

AuthContext

Authentication state

Login / Logout

Role handling

TicketsContext

Fetching tickets

Creating tickets

Updating tickets

Bulk updates

Loading state

🔹 Custom Hooks
useTickets

Debounced search

Status & priority filtering

Pagination safety

Reset filters

Memoized computations (useMemo)

useSupportChat

Bot logic

Agent handoff

Message queue

Auto-scroll handling

Time-based simulated replies






🔹 Mock API Layer

Simulated backend behavior using in-memory data and delays:

fetchTickets()
createTicket()
updateTicket()
deleteTicket()
fakeLogin()
fakeRegister()


Mimics real REST APIs without a backend.



🛠️ Tech Stack
Technology	Purpose
React	: Component-based UI
Material UI (MUI)	: Design system
React Router	:  Routing & protection
Context API	:  Global state
Custom Hooks  : 	Business logic
JavaScript (ES6+)  : 	Core logic




📂 Folder Structure (Simplified)
src/
│
├── Auth/
│   ├── AuthContext.js
│   ├── authService.js
│   └── fakeUsers.js
│
├── api/
│   └── tickets.api.js
│
├── context/
│   └── TicketsContext.js
│
├── hooks/
│   ├── useTickets.js
│   └── useSupportChat.js
│
├── pages/
│   ├── Login/
│   ├── customer/
│   └── admin/
│
├── layouts/
│
├── utils/
│
└── data/




🎯 What This Project Demonstrates

Real-world React project structure

Role-based access control (frontend)

Enterprise dashboard UX

State management without Redux

Clean custom hook design

Async UI simulation

Admin operational workflows

Separation of logic & presentation

▶️ Run Locally
npm install
npm start

🔮 Future Enhancements

Backend integration (Node.js + Express)

Real authentication (JWT)

Database persistence (MongoDB / PostgreSQL)

WebSocket-based live chat

SLA timers & escalation automation

Dark mode support

Unit & integration testing

📝 License

This project is intended for learning, portfolio, and demonstration purposes.

🙌 Author

Built with ❤️ using React & Material UI
Designed to reflect real SaaS helpdesk systems



*****************************************************************************************
                                                                                        *
🔐 Demo Credentials                                                                    * 
Admin                                                                                   *
Email: admin@supporthub.com                                                             *
Password: admin123                                                                      *
                                                                                        *
Customer                                                                                *
Email: customer@supporthub.com                                                          *
Password: customer123                                                                   *
                                                                                        *
*****************************************************************************************



