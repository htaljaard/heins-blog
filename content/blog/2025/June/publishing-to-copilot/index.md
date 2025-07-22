---
title: "Publishing to Microsoft 365 Copilot and Teams: A Developer’s Guide to Going Live"
date: "2025-06-19"
slug: "creating-your-first-agent-copilot-studio"
video: "https://www.youtube.com/embed/Y9kl2laZrgA?si=wON3m8DCB6RR0lfJ"
hero_image: ""
hero_image_alt: ""
hero_image_credit_text: ""
hero_image_credit_link: ""
related_posts: []
series: "Copilot Studio"
stack: ["Copilot Studio"]
next: ""
previous: ""
---


# 🚀 Publishing to Microsoft 365 Copilot and Teams: A Developer’s Guide to Going Live

In our last adventure, we built a recruitment agent powered by SharePoint data. Now, it’s time to take that agent from development to deployment—specifically, publishing it to Microsoft Teams and Microsoft 365 Copilot. This post walks through the publishing process, the behind-the-scenes mechanics, and a few gotchas to watch out for.

## 🎯 Why Focus on Teams and Copilot?

While there are multiple publishing channels available in Copilot Studio, Teams and Microsoft 365 Copilot are the most relevant for enterprise use cases. Whether you're building internal tools or client-facing assistants, these platforms offer the most seamless integration into daily workflows.

---

## 🛠️ Step-by-Step: Publishing Your Agent

### 1. **Start with a Clean Agent**
For this demo, we used a simple sharing agent—no data connections, just the basics. This helps isolate the publishing process without backend distractions.

### 2. **Add Channels**
In Copilot Studio, under “My Channels,” add:
- **Microsoft Teams**
- **Microsoft 365 Copilot**

These channels enable your agent to be shared and consumed in both environments.

### 3. **Set Descriptions Thoughtfully**
When publishing, the short and long descriptions, along with the icon, are visible to both users and admins. Don’t leave them blank or generic—use this space to clearly communicate the agent’s purpose.

Example:
- **Short Description**: “People Leader Assistant”
- **Long Description**: “An internal tool to help people leaders manage recruitment workflows.”

---

## 🔐 Access Control: Who Gets to Use It?

By default, only the creator has access. If another user tries to open the agent, they’ll see a “You do not have access” message.

### To Share:
1. Add the user (e.g., John Doe) under availability options.
2. **Important**: You must **republish** the agent after adding users. This step is easy to forget!

---

## 🧪 Testing the User Experience

### In Microsoft Teams:
- Paste the agent link into Teams.
- It may take a few seconds for Teams to recognize the app.
- If it doesn’t load properly (especially in the browser client), try switching to the desktop app or use Copilot chat instead.

### In Microsoft 365 Copilot Chat:
- As the developer, open the agent in M365 Copilot.
- Copy the URL from your browser.
- Share it with the user (e.g., John Doe).
- The user can now install and use the agent directly in Copilot chat.

---

## 🔍 What Happens Behind the Scenes?

Publishing isn’t magic—it’s infrastructure.

### Here’s what’s created:
- **App Registration in Entra**: No special API permissions or authentication by default.
- **Default Power Platform Solution**: The agent is added here automatically.
- **M365 Admin Center Visibility**: The agent appears under “Shared Agents,” showing who created and published it.

You can also **block** the agent from the admin center, instantly revoking access for all users.

---

## 🧭 What’s Next?

In the next session, we’ll explore:
- Publishing to the entire organization
- Admin controls in Teams
- Packaging agents into solution files
- Adding actions, triggers, and more advanced features

---

## 💡 Final Thoughts

Publishing to Copilot and Teams is straightforward once you understand the flow. The key is to be intentional about access, descriptions, and testing. And remember—every agent you publish is a reflection of your team’s professionalism and attention to detail.

---

