# Install Lonawala Bot in Microsoft Teams 🎯

## Complete Step-by-Step Installation Guide

### **Phase 1: Create Azure Bot Service** (10 minutes)

#### Step 1: Go to Azure Portal
1. Open [Azure Portal](https://portal.azure.com)
2. Sign in with your Microsoft account
3. Click **+ Create a resource**

#### Step 2: Create Azure Bot
1. Search for **"Azure Bot"**
2. Click **Create**
3. Fill in the form:
   ```
   Resource group: Create new or select existing
   Bot name: lonawala-location-bot
   Pricing tier: Free (F0)
   Runtime stack: Node.js
   Runtime version: 18 LTS
   ```
4. Click **Review + create** → **Create**
5. Wait for deployment to complete (1-2 minutes)

#### Step 3: Get Bot Credentials
1. Go to your newly created bot resource
2. Click **Configuration** in left menu
3. Copy and save these **IMPORTANT**:
   ```
   Microsoft App ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   Microsoft App Password: (click Manage Password)
   ```
4. ⚠️ **Save these credentials securely!**

---

### **Phase 2: Deploy Bot Code to Azure** (10-15 minutes)

#### Option A: Deploy Using Azure CLI (Recommended)

1. **Install Azure CLI**
```bash
# Windows: 
https://aka.ms/installazurecliwindows

# Mac:
brew install azure-cli

# Linux:
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

2. **Login to Azure**
```bash
az login
# Browser will open - sign in with your Azure account
```

3. **Create Resource Group**
```bash
az group create --name lonawala-bot-rg --location eastus
```

4. **Deploy the bot**
```bash
# From project root directory
az deployment group create \
  --resource-group lonawala-bot-rg \
  --template-file deployment.json \
  --parameters botName=lonawala-location-bot location=eastus
```

5. **Note the output URLs** - you'll need the App Service URL

#### Option B: Deploy Using VS Code (Alternative)

1. **Install Azure App Service extension in VS Code**
2. **Right-click project folder** → Deploy to App Service
3. **Create new App Service** in Azure
4. **Select Node.js runtime**
5. Wait for deployment

#### Option C: Deploy Manually (Without CLI)

1. **Create App Service Plan**
   - Azure Portal → Create Resource → App Service Plan
   - Select Free (F1) tier

2. **Create App Service**
   - Runtime: Node.js 18 LTS
   - Operating System: Linux

3. **Deploy Code**
   - Option 1: Use GitHub integration
   - Option 2: ZIP deploy via Kudu

---

### **Phase 3: Configure Bot Settings** (5 minutes)

#### Step 1: Set Messaging Endpoint
1. Go to your **Azure Bot** resource
2. Click **Configuration**
3. In **Messaging endpoint**, enter:
   ```
   https://<your-app-service-name>.azurewebsites.net/api/messages
   ```
   Example: `https://lonawala-location-bot-123.azurewebsites.net/api/messages`

4. Click **Apply**

#### Step 2: Add Channel
1. Click **Channels** in left menu
2. Click **Microsoft Teams** icon
3. Click **Save**
4. Verify it shows as "Configured"

#### Step 3: Verify App ID & Password
1. Still in **Configuration**
2. Confirm your **Microsoft App ID** matches what you saved
3. If needed, get **Microsoft App Password** again:
   - Click **Manage** next to App ID
   - Add new client secret
   - Copy the value

---

### **Phase 4: Add Environment Variables to Azure** (5 minutes)

1. Go to your **App Service** (not Bot)
2. Click **Configuration** in left menu
3. Click **New application setting**
4. Add these settings:

| Name | Value |
|------|-------|
| `MicrosoftAppId` | Your App ID from Phase 1 |
| `MicrosoftAppPassword` | Your App Password |
| `BotOpenIdMetadataUrl` | `https://login.botframework.com/.well-known/openidmetadata` |
| `NODE_ENV` | `production` |
| `PORT` | `3978` |

5. Click **Save**
6. **Important:** App will restart - wait for it to complete

---

### **Phase 5: Test Bot Before Teams** (5 minutes)

#### Using Bot Framework Emulator (Local Testing)

1. **Download Emulator**: https://aka.ms/botframework-emulator

2. **Open Emulator**

3. **Click "Open Bot"**

4. **Enter these values:**
   ```
   Bot URL: https://<your-app-service>.azurewebsites.net/api/messages
   Microsoft App ID: <your-app-id>
   Microsoft App Password: <your-password>
   ```

5. **Test Commands:**
   - Type: `Hello` → Should see greeting
   - Type: `Suggest locations` → Should see cards
   - Type: `Help` → Should see help menu

✅ If bot responds, you're ready for Teams!

---

### **Phase 6: Add Bot to Microsoft Teams** (5 minutes)

#### Option A: Direct Link (Easiest)

1. **Go to Bot Framework Developer Portal**
   - https://dev.botframework.com
   - Sign in

2. **Find your bot** in the list

3. **Click "Add to Teams"** button

4. **Teams will open**
   - Click **Add a bot to a chat**
   - Select team/channel/group chat
   - Click **Install**

#### Option B: Download & Upload (For Organizations)

1. Go to **Azure Bot** → **Channels** → **Microsoft Teams**
2. Click **Download Bot**
3. In Teams:
   - Click **Apps** (bottom left)
   - Click **Upload a custom app**
   - Click **Upload for [Your Organization]**
   - Select the downloaded file
   - Click **Add**

#### Option C: Manual Teams App Upload

1. **Create app package** (Optional - advanced)
   - Edit `teams-manifest.json`
   - Create ZIP with manifest + icons
   - Upload in Teams

---

### **Phase 7: Start Chatting! 🎉**

Once added to Teams:

1. **Go to the chat** where bot was added
2. **Try these commands:**

```
@bot Hello
@bot Suggest me locations
@bot Show me maps
@bot What are beautiful places?
@bot Help
```

---

## Troubleshooting 🔧

### Bot Not Responding in Teams

**Check these things in order:**

1. **Verify Messaging Endpoint**
   ```
   Azure Bot → Configuration → Messaging endpoint
   Must be: https://[app-name].azurewebsites.net/api/messages
   ```

2. **Check App Service is Running**
   ```
   Azure Portal → App Service → Overview
   Status should be "Running"
   ```

3. **Verify Credentials in App Service**
   ```
   App Service → Configuration → Application settings
   MicrosoftAppId and MicrosoftAppPassword must be set
   ```

4. **Test with Emulator First**
   ```
   If it works in Emulator but not Teams, it's a configuration issue
   ```

5. **Check Logs**
   ```
   App Service → Log stream
   Look for error messages
   ```

### Error: "Bot Not Responding"

**Solution:**
```bash
# Restart the App Service
az webapp restart --resource-group lonawala-bot-rg --name <app-name>

# OR in Azure Portal:
# App Service → Overview → Restart
```

### Error: "Unauthorized Access"

**Solution:**
- Verify `MicrosoftAppId` and `MicrosoftAppPassword` are correct
- Regenerate password in Azure if needed
- Restart app service after updating

### Bot Responds But Slowly

**Check:**
- Verify App Service Plan is at least B1 (not Free F1 for production)
- Check server logs for errors
- Increase timeout settings if needed

---

## Complete Deployment Checklist

Before considering installation complete:

- [ ] Azure Bot resource created
- [ ] App ID and Password saved securely
- [ ] App Service deployed with code
- [ ] Messaging endpoint configured
- [ ] Microsoft Teams channel added
- [ ] Environment variables set in App Service
- [ ] Bot tested with Emulator
- [ ] Bot added to Teams
- [ ] Test commands working in Teams chat
- [ ] All team members can see bot in Teams

---

## Security Best Practices ⚠️

1. **Never commit .env file** to Git
2. **Store credentials in Azure Key Vault** (Production)
3. **Use HTTPS only** (automatically done by Azure)
4. **Rotate passwords** every 90 days
5. **Limit bot permissions** in Teams
6. **Monitor logs** regularly

---

## File Reference for Installation

| File | Purpose |
|------|---------|
| `package.json` | Node dependencies (npm install) |
| `src/index.js` | Express server entry point |
| `deployment.json` | Azure ARM template |
| `.env.example` | Template for environment variables |
| `teams-manifest.json` | Teams app configuration |

---

## Quick Reference: Key Azure URLs

| Resource | URL |
|----------|-----|
| Azure Portal | https://portal.azure.com |
| Bot Framework | https://dev.botframework.com |
| Emulator Download | https://aka.ms/botframework-emulator |
| Azure CLI Docs | https://docs.microsoft.com/cli/azure |
| Teams Dev Docs | https://docs.microsoft.com/microsoftteams/platform |

---

## After Installation: Next Steps

✅ **Bot is Live!** Now you can:

1. **Customize Locations**
   - Edit `src/locationData.js`
   - Add new places
   - Update descriptions

2. **Add More Features**
   - Integrate real APIs (weather, booking)
   - Add database for user preferences
   - Create adaptive card templates

3. **Monitor Usage**
   - Azure Bot Analytics
   - Teams Admin Center
   - Application Insights

4. **Improve Bot**
   - Gather user feedback
   - Update responses
   - Add more commands

---

## Need Help?

📚 **Documentation:**
- Azure Bot Service: https://docs.microsoft.com/azure/bot-service/
- Teams Bot Dev: https://docs.microsoft.com/microsoftteams/platform/bots/what-are-bots
- Bot Framework: https://github.com/microsoft/botframework

💬 **Support:**
- Azure Support: https://azure.microsoft.com/support/
- Teams Community: https://techcommunity.microsoft.com/

---

**You're all set!** Your Lonawala bot is now ready to help Teams explore beautiful locations. 🎒🏔️

