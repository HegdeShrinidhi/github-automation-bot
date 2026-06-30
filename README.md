#  GitHub Automation Bot

An AI-powered GitHub Automation Bot that listens to GitHub events, sends Slack notifications, generates AI summaries for issues, and writes back to GitHub.

---

##  Features

- GitHub OAuth Login
- Repository Dashboard
- Event Tracking
- Rules Management
- GitHub Webhooks
- Slack Notifications
- Pull Request Comments
- AI Issue Summaries
- Dynamic AI Summary Dashboard
- Supabase Database Integration

---

##  Architecture

GitHub
↓
Webhook API
↓
OpenAI + Supabase
↓
Slack Notifications
↓
GitHub Comments
↓
Dashboard UI

---

## 🛠 Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI

### Backend
- Next.js API Routes
- NextAuth.js
- GitHub OAuth

### Database
- Supabase

### AI
- OpenAI API

### Integrations
- GitHub Webhooks
- Slack Incoming Webhooks

### Deployment
- Render

---

##  Supported Events

| Event | Action |
|------|---------|
| Push | Slack Notification |
| Pull Request | GitHub Comment |
| Issues | AI Summary |

---

##  AI Summary Workflow

1. User creates a GitHub issue.
2. Webhook receives the event.
3. OpenAI generates a summary.
4. Summary is stored in Supabase.
5. Bot comments on GitHub.
6. AI Summary appears in the dashboard.

---

##  Slack Notification

Whenever GitHub events occur, the bot sends notifications to Slack channels.

Example:

 GitHub Event Received

Repository: github-automation-bot

Event: push

Status: received

---

##  GitHub Bot Comment

Example:

 GitHub Automation Bot

Pull Request received successfully.

Slack notification sent successfully.

---

##  AI Summary Example

Issue:

Login page crashes.

AI Summary:

The issue indicates an authentication failure after login. Session handling should be investigated.

---

##  Environment Variables

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

GITHUB_TOKEN=

OPENAI_API_KEY=

SLACK_WEBHOOK_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

Deployment

Live Application:

https://github-automation-bot-rimc.onrender.com/ 

##  Project Structure

src/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── repositories/
│   ├── rules/
│   ├── events/
│   └── ai-summaries/
├── components/
├── lib/
└── auth/


Author

Shrinidhi Hegde

MCA Graduate | Full Stack Developer | AI/ML Enthusiast