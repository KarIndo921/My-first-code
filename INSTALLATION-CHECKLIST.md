# Installation Checklist - Print & Follow! ✅

## 🚀 Pre-Installation Requirements

Before you start, make sure you have:

- [ ] Microsoft Azure account (free tier OK)
- [ ] Microsoft Teams account
- [ ] Administrator access to Teams (for org-wide deployment)
- [ ] This GitHub repository cloned locally
- [ ] Node.js 14+ installed

---

## 📋 PHASE 1: Azure Bot Setup

### Create Azure Bot Service

- [ ] Go to https://portal.azure.com
- [ ] Click "+ Create a resource"
- [ ] Search for "Azure Bot"
- [ ] Click Create
- [ ] Fill in form:
  - [ ] Resource group: `lonawala-bot-rg`
  - [ ] Bot name: `lonawala-location-bot`
  - [ ] Pricing tier: `Free (F0)`
  - [ ] Runtime stack: `Node.js`
  - [ ] Runtime version: `18 LTS`
- [ ] Click "Review + create"
- [ ] Click "Create"
- [ ] Wait 1-2 minutes for deployment

### Get & Save Credentials

- [ ] Go to your bot resource in Azure
- [ ] Click "Configuration" in left menu
- [ ] Copy and save in **secure location**:
  ```
  App ID:       _______________________________
  App Password: _______________________________
  ```
- [ ] ⚠️ IMPORTANT: Don't share these credentials!
- [ ] ⚠️ Click "Manage" to set password if not shown

---

## 📦 PHASE 2: Deploy Bot Code

### Choose One Deployment Method

#### METHOD A: Azure CLI (Recommended)

- [ ] Install Azure CLI: https://aka.ms/installazurecli
- [ ] Open terminal/command prompt
- [ ] Run: `az login`
- [ ] Browser opens → Sign in with Azure account
- [ ] Return to terminal → Should show: "Azure CLI login successful"
- [ ] Navigate to bot folder: `cd My-first-code`
- [ ] Run deployment command:
  ```bash
  az deployment group create \
    --resource-group lonawala-bot-rg \
    --template-file deployment.json \
    --parameters botName=lonawala-location-bot location=eastus
  ```
- [ ] Wait for completion (3-5 minutes)
- [ ] Note the output: Save the App Service URL
  ```
  App Service URL: https://lonawala-location-bot-xxx.azurewebsites.net
  ```

#### METHOD B: GitHub Integration

- [ ] Push this repository to GitHub
- [ ] Go to Azure Portal → App Service
- [ ] Click "Deployment Center"
- [ ] Select "GitHub"
- [ ] Authorize GitHub
- [ ] Select your repository and branch
- [ ] Click "Save"
- [ ] Automatic deployment starts
- [ ] Wait for completion

#### METHOD C: ZIP Upload

- [ ] Create ZIP file with all code (except node_modules)
- [ ] Go to App Service → "Advanced Tools" (Kudu)
- [ ] Click "Go"
- [ ] Go to Debug Console → CMD
- [ ] Navigate to /site/wwwroot
- [ ] Upload ZIP file
- [ ] Extract it
- [ ] App will start automatically

---

## ⚙️ PHASE 3: Configure Azure Settings

### Set Messaging Endpoint

- [ ] Go to Azure Bot resource
- [ ] Click "Configuration"
- [ ] Find "Messaging endpoint"
- [ ] Replace with your app URL:
  ```
  https://lonawala-location-bot-xxx.azurewebsites.net/api/messages
  ```
- [ ] Click "Apply"

### Add Microsoft Teams Channel

- [ ] Still in Azure Bot
- [ ] Click "Channels"
- [ ] Click "Microsoft Teams" icon
- [ ] Click "Save"
- [ ] Wait for configuration to complete
- [ ] Check status shows ✓ Configured

### Verify Credentials

- [ ] Go to "Configuration"
- [ ] Check "Microsoft App ID" is filled
- [ ] Click "Manage" next to App ID
- [ ] Create new client secret if needed
- [ ] Copy the secret value to save

---

## 🔧 PHASE 4: Set Environment Variables

### Add to App Service

- [ ] Go to your App Service (not Bot)
- [ ] Click "Configuration" in left menu
- [ ] Click "+ New application setting"
- [ ] Add each setting:

| Setting Name | Value | Status |
|---|---|---|
| `MicrosoftAppId` | Your App ID | [ ] |
| `MicrosoftAppPassword` | Your App Password | [ ] |
| `BotOpenIdMetadataUrl` | https://login.botframework.com/.well-known/openidmetadata | [ ] |
| `NODE_ENV` | production | [ ] |
| `PORT` | 3978 | [ ] |

- [ ] Click "Save"
- [ ] Confirm dialog: Click "Continue"
- [ ] Wait for app to restart (1-2 minutes)
- [ ] Check "Overview" → Status shows "Running"

---

## 🧪 PHASE 5: Test with Emulator

### Download & Install

- [ ] Download Bot Framework Emulator: https://aka.ms/botframework-emulator
- [ ] Install it
- [ ] Open Emulator

### Connect to Bot

- [ ] Click "Open Bot"
- [ ] Enter Bot URL:
  ```
  https://lonawala-location-bot-xxx.azurewebsites.net/api/messages
  ```
- [ ] Enter Microsoft App ID: (Your App ID)
- [ ] Enter Microsoft App Password: (Your Password)
- [ ] Click "Connect"

### Test Commands

| Command | Expected Response | Status |
|---|---|---|
| `Hello` | Greeting message | [ ] |
| `Suggest me locations` | 3 location cards | [ ] |
| `Show me maps` | Map links | [ ] |
| `What are beautiful places?` | Location list | [ ] |
| `Help` | Help menu | [ ] |

- [ ] All commands working? → Ready for Teams!
- [ ] Any errors? → Check TROUBLESHOOTING section

---

## 📲 PHASE 6: Add to Microsoft Teams

### Get Bot from Store

**Choose one method:**

#### METHOD A: Bot Framework Developer Portal

- [ ] Go to https://dev.botframework.com
- [ ] Sign in
- [ ] Find your bot in list
- [ ] Click "Add to Teams" button
- [ ] Teams opens
- [ ] Click "Add a bot to a chat"
- [ ] Select team/channel/group chat
- [ ] Click "Install"
- [ ] Go to that chat in Teams

#### METHOD B: Direct Teams Upload

- [ ] Open Microsoft Teams
- [ ] Click "Apps" (bottom left)
- [ ] Click "Upload a custom app"
- [ ] Click "Upload for [Your Organization]"
- [ ] Select bot package file
- [ ] Click "Add"
- [ ] Choose where to add (team/channel/chat)

#### METHOD C: Teams App Store

- [ ] Search for your bot in Teams App Store
- [ ] If admin approved it:
  - [ ] Click "Add"
  - [ ] Select team/channel
  - [ ] Click "Install"

---

## 🎉 PHASE 7: Start Chatting!

### First Message Test

- [ ] Go to Teams chat where bot was added
- [ ] Type: `@bot Hello`
- [ ] Bot responds with greeting
- [ ] Type: `@bot Suggest me locations`
- [ ] Bot shows 3 locations with maps
- [ ] Type: `@bot Help`
- [ ] Bot shows help menu

### Share with Team

- [ ] Bot is now visible to all in that chat
- [ ] Team members can type `@bot [command]`
- [ ] Bot will respond to everyone
- [ ] Anyone can add to other teams/chats

### Test More Commands

- [ ] `Show me maps`
- [ ] `What are beautiful places?`
- [ ] `How do I reach Duke's Nose?`
- [ ] `Best trekking spots?`

---

## 🔍 Verification Checklist

### Everything Working?

- [ ] Bot responds in Teams chat
- [ ] Location suggestions appear with images
- [ ] Map links open in browser
- [ ] Help command shows all options
- [ ] Multiple team members can chat with bot
- [ ] Bot is available 24/7

### Performance Check

- [ ] Bot responds within 2-3 seconds
- [ ] No error messages in chat
- [ ] Buttons and links work
- [ ] Images load correctly

---

## 🚨 Troubleshooting Quick Guide

### Bot not responding

**Quick fixes:**
- [ ] Check bot is added to chat (look for bot in members)
- [ ] Try `@bot Help` command
- [ ] Check App Service is running (Azure Portal)
- [ ] Check environment variables are set
- [ ] Wait 2 minutes and try again

### "Bot not found" in Teams

- [ ] Check bot is installed in this chat
- [ ] Try adding it again from Teams Apps
- [ ] In Azure Bot, verify Teams channel is "Configured"

### Emulator works but Teams doesn't

- [ ] Check Messaging endpoint has correct URL
- [ ] Verify it ends with `/api/messages`
- [ ] Check for typos in App ID or Password
- [ ] Restart the App Service

### Getting "Unauthorized" error

- [ ] Verify App ID matches in Azure Portal
- [ ] Check App Password is correct
- [ ] Try regenerating password (Azure Portal)
- [ ] Update App Service environment variables
- [ ] Restart App Service

---

## 📞 When You Need Help

**Check these resources in order:**

1. [ ] Review "TEAMS-INSTALLATION.md" section for your issue
2. [ ] Check "DEPLOYMENT-FLOWCHART.md" for visual reference
3. [ ] Look at Azure Bot logs:
   - App Service → "Log stream"
4. [ ] Test with Emulator to isolate problem
5. [ ] Check:
   - [ ] Azure Service Status: https://status.azure.com
   - [ ] Teams Status: https://status.microsoft.com

---

## 📝 Notes & Credentials Storage

### IMPORTANT: Keep This Safe!

```
Bot Name: lonawala-location-bot
App ID: ___________________________________
App Password: ___________________________________
Resource Group: lonawala-bot-rg
App Service URL: ___________________________________
Messaging Endpoint: ___________________________________
```

⚠️ **SECURITY**: Store these securely, never commit to Git!

---

## 🎯 Success Milestone

### You're Done When:

✅ Azure Bot Service created  
✅ Code deployed to App Service  
✅ Environment variables configured  
✅ Emulator testing passed  
✅ Bot added to Teams  
✅ Chat messages working  
✅ All commands responding  
✅ Team members can use bot  

---

## 🎉 Congratulations!

Your Lonawala Location Bot is now live in Microsoft Teams!

### Next Steps:

- [ ] Share bot with your team
- [ ] Get feedback from users
- [ ] Add more locations if desired
- [ ] Monitor usage in Analytics
- [ ] Update bot responses based on feedback

---

**Need customization?** Check the README.md for:
- Adding new locations
- Changing responses
- Integrating new features
- Adding your own branding

---

**Questions?** Refer to:
- TEAMS-INSTALLATION.md - Detailed steps
- DEPLOYMENT-FLOWCHART.md - Visual process
- README.md - Complete documentation

**Good luck and happy deploying!** 🚀

