# Client Management System - Setup Guide

**For:** Adventure Athlete India
**Purpose:** Automated client tracking from Inquiry → Booking → Feedback
**Time to Setup:** 15-20 minutes (one-time)

---

## Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        HOW IT WORKS                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  INQUIRY (Website)  ──┐                                             │
│                       │                                             │
│  ONBOARDING (Link)  ──┼──→  MASTER SHEET  ──→  One row per client  │
│                       │     (auto-merged)                           │
│  FEEDBACK (Link)    ──┘                                             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Create the Master Google Sheet

### 1.1 Create New Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create new spreadsheet
3. Name it: `AAI - Client Management`

### 1.2 Create These Tabs (Bottom of screen, click +)

| Tab Name | Purpose |
|----------|---------|
| `Master` | Combined view of all clients |
| `Raw-Inquiries` | Raw data from website inquiry form |
| `Raw-Onboarding` | Raw data from onboarding form |
| `Raw-Feedback` | Raw data from feedback form |

### 1.3 Master Tab - Column Headers (Row 1)

Copy these headers into Row 1 of the `Master` tab:

```
A: Client ID
B: Name
C: Email
D: WhatsApp
E: Nationality
F: Activity
G: Difficulty
H: People Count
I: Preferred Dates
J: Message
K: How Found
L: Inquiry Date
M: Status
N: Tour/Experience Name
O: Booking Date
P: Tour Date
Q: Emergency Contact
R: Blood Group
S: ID Proof Link
T: Medical Conditions
U: Health Cert Link
V: Payment Proof Link
W: Tour Completed
X: Feedback Rating
Y: Feedback Text
Z: Review Posted
AA: Photo Permission
AB: Notes
```

### 1.4 Set Data Validation for Status Column (M)

1. Select column M (Status)
2. Go to **Data → Data Validation**
3. Add dropdown with these options:
   - `INQUIRY`
   - `CONFIRMED`
   - `BOOKED`
   - `COMPLETED`
   - `CANCELLED`

### 1.5 Conditional Formatting (Optional but helpful)

1. Select the Status column
2. **Format → Conditional Formatting**
3. Add rules:
   - `INQUIRY` → Yellow background
   - `CONFIRMED` → Light blue
   - `BOOKED` → Light green
   - `COMPLETED` → Green
   - `CANCELLED` → Red

---

## Step 2: Create the Forms

### 2.1 Tour Onboarding Form

1. Go to [Google Forms](https://forms.google.com)
2. Click **+ Blank**
3. Name it: `Tour Onboarding - Adventure Athlete India`

**Add these fields:**

| # | Field | Type | Required | Options/Notes |
|---|-------|------|----------|---------------|
| 1 | Email | Short answer (Email validation) | Yes | "Use the same email from your inquiry" |
| 2 | Tour/Experience Name | Short answer | Yes | "Enter as discussed (e.g., 'Kuppar Peak MTB - Jan 15')" |
| 3 | Confirmed Tour Date | Date | Yes | |
| 4 | Number of Participants | Number | Yes | |
| - | **Section: Participant 1 Details** | Section header | - | |
| 5 | Participant 1 - Full Name | Short answer | Yes | "As on ID proof" |
| 6 | Participant 1 - Emergency Contact | Short answer | Yes | "Name, Number, Relationship" |
| 7 | Participant 1 - Blood Group | Dropdown | Yes | A+, A-, B+, B-, O+, O-, AB+, AB- |
| 8 | Participant 1 - ID Proof | File upload | Yes | Allow: Image, PDF |
| 9 | Participant 1 - Medical Conditions | Paragraph | No | "Allergies, medications, conditions" |
| 10 | Participant 1 - Health Certificate | File upload | No | "Recommended for adventure tours" |
| - | **Section: Participant 2 Details** | Section header | - | "Skip if solo" |
| 11 | Participant 2 - Full Name | Short answer | No | |
| 12 | Participant 2 - Emergency Contact | Short answer | No | |
| 13 | Participant 2 - Blood Group | Dropdown | No | Same options |
| 14 | Participant 2 - ID Proof | File upload | No | |
| 15 | Participant 2 - Medical Conditions | Paragraph | No | |
| - | **Section: Participant 3 Details** | Section header | - | "Skip if less than 3" |
| 16 | Participant 3 - Full Name | Short answer | No | |
| 17 | Participant 3 - Emergency Contact | Short answer | No | |
| 18 | Participant 3 - Blood Group | Dropdown | No | |
| 19 | Participant 3 - ID Proof | File upload | No | |
| 20 | Participant 3 - Medical Conditions | Paragraph | No | |
| - | **Section: Payment** | Section header | - | |
| 21 | Payment Screenshot | File upload | Yes | "One payment for entire group" |
| - | **Section: Agreement** | Section header | - | |
| 22 | Consent | Checkbox | Yes | "I have read the Guidelines and agree on behalf of all participants. [Link to Guidelines]" |

**Form Settings:**
- Go to Settings (gear icon)
- Turn ON: "Collect email addresses"
- Turn ON: "Allow response editing"
- Confirmation message: "Thank you! Your booking is confirmed. See you on the trail!"

**Link to Sheet:**
1. Click **Responses** tab
2. Click the green Sheets icon
3. Select: "Select existing spreadsheet" → Choose your Master Sheet
4. It will create/use the `Raw-Onboarding` tab

---

### 2.2 Tour Feedback Form

1. Go to [Google Forms](https://forms.google.com)
2. Click **+ Blank**
3. Name it: `Tour Feedback - Adventure Athlete India`

**Header text:**
```
It was lovely to have you!
Please help me improve. Your feedback is valued.
```

**Add these fields:**

| # | Field | Type | Required | Options/Notes |
|---|-------|------|----------|---------------|
| 1 | Email | Short answer (Email validation) | Yes | "Same email used for booking" |
| 2 | How was your overall experience? | Linear scale | Yes | 1 (Poor) to 5 (Excellent) |
| 3 | What did you enjoy most? | Paragraph | Yes | |
| 4 | What could be improved? | Paragraph | No | |
| 5 | Would you recommend to friends? | Multiple choice | Yes | "Definitely!", "Maybe", "Probably not" |
| 6 | Photo/Video Permission | Checkbox | No | "I allow Adventure Athlete India to use photos/videos from my tour on social media and website" |
| 7 | Review Request | Checkboxes | Yes | Options: "Posted on Google Reviews", "Posted on TripAdvisor", "Will post later", "Prefer not to" |
| 8 | Any message for Atul? | Paragraph | No | |

**Form Settings:**
- Turn ON: "Collect email addresses"
- Confirmation message: "Thank you for your feedback! Hope to see you again on the trails."

**Link to Sheet:**
1. Click **Responses** tab
2. Click the green Sheets icon
3. Select existing spreadsheet → Choose your Master Sheet
4. It will create/use the `Raw-Feedback` tab

---

## Step 3: Add the Auto-Merge Script

This script automatically combines data from all forms into the Master tab.

### 3.1 Open Script Editor

1. In your Master Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Copy-paste the entire script below:

```javascript
/**
 * Adventure Athlete India - Client Management Auto-Merge Script
 *
 * This script automatically merges data from Inquiry, Onboarding, and Feedback
 * forms into a single Master sheet, using Email as the unique identifier.
 *
 * Setup:
 * 1. Paste this script in Extensions → Apps Script
 * 2. Run setupTriggers() once
 * 3. Done!
 */

// Configuration - Update these if your tab names are different
const CONFIG = {
  masterSheet: 'Master',
  inquirySheet: 'Raw-Inquiries',
  onboardingSheet: 'Raw-Onboarding',
  feedbackSheet: 'Raw-Feedback',
  emailColumn: 'Email' // Column name that contains email in all sheets
};

/**
 * Run this function ONCE to set up automatic triggers
 */
function setupTriggers() {
  // Remove existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  // Create trigger for form submissions
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  Logger.log('Triggers set up successfully!');
  SpreadsheetApp.getActiveSpreadsheet().toast('Auto-merge triggers are now active!', 'Setup Complete', 5);
}

/**
 * Triggered automatically when any linked form is submitted
 */
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();

  // Wait a moment for the data to be fully written
  Utilities.sleep(1000);

  if (sheetName === CONFIG.inquirySheet) {
    processInquiry(e);
  } else if (sheetName === CONFIG.onboardingSheet) {
    processOnboarding(e);
  } else if (sheetName === CONFIG.feedbackSheet) {
    processFeedback(e);
  }
}

/**
 * Process new inquiry form submission
 */
function processInquiry(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(CONFIG.masterSheet);
  const inquirySheet = ss.getSheetByName(CONFIG.inquirySheet);

  // Get the last row of data from inquiry sheet
  const lastRow = inquirySheet.getLastRow();
  const headers = inquirySheet.getRange(1, 1, 1, inquirySheet.getLastColumn()).getValues()[0];
  const data = inquirySheet.getRange(lastRow, 1, 1, inquirySheet.getLastColumn()).getValues()[0];

  // Create data object
  const inquiry = {};
  headers.forEach((header, index) => {
    inquiry[header] = data[index];
  });

  // Get email
  const email = inquiry['Email'] || inquiry['Email Address'] || '';
  if (!email) {
    Logger.log('No email found in inquiry');
    return;
  }

  // Check if client already exists in Master
  const masterData = masterSheet.getDataRange().getValues();
  const masterHeaders = masterData[0];
  const emailColIndex = masterHeaders.indexOf('Email');

  let existingRow = -1;
  for (let i = 1; i < masterData.length; i++) {
    if (masterData[i][emailColIndex] && masterData[i][emailColIndex].toString().toLowerCase() === email.toLowerCase()) {
      existingRow = i + 1; // +1 because array is 0-indexed but sheets are 1-indexed
      break;
    }
  }

  // Generate new Client ID
  const clientId = 'AAI-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd') + '-' + Math.floor(Math.random() * 1000);

  // Prepare data for Master sheet
  const newData = {
    'Client ID': clientId,
    'Name': inquiry['Name'] || inquiry['Your Name'] || '',
    'Email': email,
    'WhatsApp': inquiry['WhatsApp / Contact'] || inquiry['WhatsApp'] || inquiry['Contact'] || '',
    'Nationality': inquiry['Nationality'] || '',
    'Activity': Array.isArray(inquiry['Activity']) ? inquiry['Activity'].join(', ') : (inquiry['Activity'] || ''),
    'Difficulty': inquiry['Difficulty'] || '',
    'People Count': inquiry['Number of people'] || inquiry['People'] || '',
    'Preferred Dates': inquiry['Preferred dates'] || inquiry['Dates'] || '',
    'Message': inquiry['Message'] || inquiry['Your Message'] || '',
    'How Found': inquiry['How did you hear'] || inquiry['How did you hear about me?'] || '',
    'Inquiry Date': Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd'),
    'Status': 'INQUIRY'
  };

  if (existingRow > 0) {
    // Update existing row
    updateMasterRow(masterSheet, masterHeaders, existingRow, newData);
    Logger.log('Updated existing client: ' + email);
  } else {
    // Add new row
    addMasterRow(masterSheet, masterHeaders, newData);
    Logger.log('Added new client: ' + email);
  }

  // Send notification
  SpreadsheetApp.getActiveSpreadsheet().toast('New inquiry from: ' + (newData['Name'] || email), 'New Inquiry!', 10);
}

/**
 * Process onboarding form submission
 */
function processOnboarding(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(CONFIG.masterSheet);
  const onboardingSheet = ss.getSheetByName(CONFIG.onboardingSheet);

  // Get the last row of data
  const lastRow = onboardingSheet.getLastRow();
  const headers = onboardingSheet.getRange(1, 1, 1, onboardingSheet.getLastColumn()).getValues()[0];
  const data = onboardingSheet.getRange(lastRow, 1, 1, onboardingSheet.getLastColumn()).getValues()[0];

  // Create data object
  const onboarding = {};
  headers.forEach((header, index) => {
    onboarding[header] = data[index];
  });

  // Get email
  const email = onboarding['Email'] || onboarding['Email Address'] || '';
  if (!email) {
    Logger.log('No email found in onboarding');
    return;
  }

  // Find client in Master
  const masterData = masterSheet.getDataRange().getValues();
  const masterHeaders = masterData[0];
  const emailColIndex = masterHeaders.indexOf('Email');

  let existingRow = -1;
  for (let i = 1; i < masterData.length; i++) {
    if (masterData[i][emailColIndex] && masterData[i][emailColIndex].toString().toLowerCase() === email.toLowerCase()) {
      existingRow = i + 1;
      break;
    }
  }

  // Prepare onboarding data
  const onboardingData = {
    'Status': 'BOOKED',
    'Booking Date': Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd'),
    'Emergency Contact': onboarding['Participant 1 - Emergency Contact'] || onboarding['Emergency Contact'] || '',
    'Blood Group': onboarding['Participant 1 - Blood Group'] || onboarding['Blood Group'] || '',
    'Medical Conditions': onboarding['Participant 1 - Medical Conditions'] || onboarding['Medical Conditions'] || ''
  };

  // Handle file uploads - store the Drive links if available
  const idProofCol = headers.findIndex(h => h.includes('ID Proof'));
  if (idProofCol >= 0 && data[idProofCol]) {
    onboardingData['ID Proof Link'] = data[idProofCol];
  }

  const healthCertCol = headers.findIndex(h => h.includes('Health Certificate'));
  if (healthCertCol >= 0 && data[healthCertCol]) {
    onboardingData['Health Cert Link'] = data[healthCertCol];
  }

  const paymentCol = headers.findIndex(h => h.includes('Payment'));
  if (paymentCol >= 0 && data[paymentCol]) {
    onboardingData['Payment Proof Link'] = data[paymentCol];
  }

  if (existingRow > 0) {
    // Update existing row
    updateMasterRow(masterSheet, masterHeaders, existingRow, onboardingData);
    Logger.log('Updated onboarding for: ' + email);
    SpreadsheetApp.getActiveSpreadsheet().toast('Booking confirmed for: ' + email, 'Booking Complete!', 10);
  } else {
    // Client not found - create new row with available data
    onboardingData['Email'] = email;
    onboardingData['Client ID'] = 'AAI-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd') + '-' + Math.floor(Math.random() * 1000);
    onboardingData['Name'] = onboarding['Participant 1 - Full Name'] || '';
    addMasterRow(masterSheet, masterHeaders, onboardingData);
    Logger.log('Created new client from onboarding: ' + email);
    SpreadsheetApp.getActiveSpreadsheet().toast('New booking (no prior inquiry): ' + email, 'New Booking!', 10);
  }
}

/**
 * Process feedback form submission
 */
function processFeedback(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(CONFIG.masterSheet);
  const feedbackSheet = ss.getSheetByName(CONFIG.feedbackSheet);

  // Get the last row of data
  const lastRow = feedbackSheet.getLastRow();
  const headers = feedbackSheet.getRange(1, 1, 1, feedbackSheet.getLastColumn()).getValues()[0];
  const data = feedbackSheet.getRange(lastRow, 1, 1, feedbackSheet.getLastColumn()).getValues()[0];

  // Create data object
  const feedback = {};
  headers.forEach((header, index) => {
    feedback[header] = data[index];
  });

  // Get email
  const email = feedback['Email'] || feedback['Email Address'] || '';
  if (!email) {
    Logger.log('No email found in feedback');
    return;
  }

  // Find client in Master
  const masterData = masterSheet.getDataRange().getValues();
  const masterHeaders = masterData[0];
  const emailColIndex = masterHeaders.indexOf('Email');

  let existingRow = -1;
  for (let i = 1; i < masterData.length; i++) {
    if (masterData[i][emailColIndex] && masterData[i][emailColIndex].toString().toLowerCase() === email.toLowerCase()) {
      existingRow = i + 1;
      break;
    }
  }

  // Prepare feedback data
  const feedbackData = {
    'Status': 'COMPLETED',
    'Tour Completed': Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd'),
    'Feedback Rating': feedback['How was your overall experience?'] || feedback['Rating'] || '',
    'Feedback Text': feedback['What did you enjoy most?'] || feedback['Feedback'] || '',
    'Review Posted': feedback['Review Request'] || '',
    'Photo Permission': feedback['Photo/Video Permission'] ? 'Yes' : 'No'
  };

  if (existingRow > 0) {
    // Update existing row
    updateMasterRow(masterSheet, masterHeaders, existingRow, feedbackData);
    Logger.log('Updated feedback for: ' + email);
    SpreadsheetApp.getActiveSpreadsheet().toast('Feedback received from: ' + email + ' - Rating: ' + feedbackData['Feedback Rating'], 'Feedback!', 10);
  } else {
    // Client not found - create new row
    feedbackData['Email'] = email;
    feedbackData['Client ID'] = 'AAI-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd') + '-' + Math.floor(Math.random() * 1000);
    addMasterRow(masterSheet, masterHeaders, feedbackData);
    Logger.log('Created new client from feedback: ' + email);
  }
}

/**
 * Helper: Update specific columns in an existing row
 */
function updateMasterRow(sheet, headers, rowNum, data) {
  for (const [key, value] of Object.entries(data)) {
    const colIndex = headers.indexOf(key);
    if (colIndex >= 0 && value !== undefined && value !== '') {
      sheet.getRange(rowNum, colIndex + 1).setValue(value);
    }
  }
}

/**
 * Helper: Add a new row with data
 */
function addMasterRow(sheet, headers, data) {
  const newRow = headers.map(header => data[header] || '');
  sheet.appendRow(newRow);
}

/**
 * Manual function: Refresh all data from raw sheets
 * Run this if data gets out of sync
 */
function manualRefresh() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const response = ui.alert(
    'Refresh All Data?',
    'This will re-process all data from raw sheets. Existing Master data may be overwritten. Continue?',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  // Process all inquiries
  const inquirySheet = ss.getSheetByName(CONFIG.inquirySheet);
  if (inquirySheet && inquirySheet.getLastRow() > 1) {
    const data = inquirySheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      // Simulate form submission for each row
      processInquiryRow(data[0], data[i]);
    }
  }

  ui.alert('Refresh complete!');
}

/**
 * Helper for manual refresh
 */
function processInquiryRow(headers, rowData) {
  const inquiry = {};
  headers.forEach((header, index) => {
    inquiry[header] = rowData[index];
  });

  const email = inquiry['Email'] || inquiry['Email Address'] || '';
  if (!email) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const masterSheet = ss.getSheetByName(CONFIG.masterSheet);
  const masterData = masterSheet.getDataRange().getValues();
  const masterHeaders = masterData[0];
  const emailColIndex = masterHeaders.indexOf('Email');

  // Check if exists
  let exists = false;
  for (let i = 1; i < masterData.length; i++) {
    if (masterData[i][emailColIndex] && masterData[i][emailColIndex].toString().toLowerCase() === email.toLowerCase()) {
      exists = true;
      break;
    }
  }

  if (!exists) {
    const newData = {
      'Client ID': 'AAI-' + Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd') + '-' + Math.floor(Math.random() * 1000),
      'Name': inquiry['Name'] || inquiry['Your Name'] || '',
      'Email': email,
      'Status': 'INQUIRY'
    };
    addMasterRow(masterSheet, masterHeaders, newData);
  }
}

/**
 * Add custom menu to spreadsheet
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('AAI Tools')
    .addItem('Setup Triggers (Run Once)', 'setupTriggers')
    .addItem('Refresh All Data', 'manualRefresh')
    .addToUi();
}
```

### 3.2 Save and Setup

1. Click **Save** (Ctrl+S)
2. Name the project: `AAI Client Management`
3. Click **Run** button (play icon)
4. Select function: `setupTriggers`
5. Click **Run**
6. **Authorize** when prompted:
   - Click "Review Permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to AAI Client Management (unsafe)"
   - Click "Allow"

### 3.3 Verify Setup

1. Go back to your spreadsheet
2. Refresh the page
3. You should see a new menu: **AAI Tools**
4. Done! The script will now run automatically.

---

## Step 4: Connect Website Inquiry Form

When your website is built, the inquiry form will need to submit to your Google Sheet.

**Option A: Website form submits directly to Google Sheets**
- Use Google Sheets API
- Developer will set this up

**Option B: Use Google Form embedded on website**
- Create a Google Form for inquiries
- Embed it on your website
- Link it to the `Raw-Inquiries` tab

For now, you can use a Google Form for testing.

---

## Step 5: Folder Structure for Documents

Create this folder structure in Google Drive:

```
My Drive/
└── Adventure Athlete India/
    ├── Client Management (Master Sheet)
    ├── Forms/
    │   ├── Tour Onboarding Form
    │   └── Tour Feedback Form
    └── Client Documents/
        └── (Files uploaded via forms go here automatically)
```

**Note:** When you enable file uploads in Google Forms, they automatically go to a folder in your Drive.

---

## How to Use Daily

### When inquiry comes in:
1. You get notification (toast in sheet + email if enabled)
2. Check Master sheet - new row with Status: INQUIRY
3. Chat with client on WhatsApp
4. When confirmed, send Onboarding form link

### When booking is confirmed:
1. Send this message on WhatsApp:
   ```
   Great! Your adventure is confirmed!

   Please complete this form for safety documentation:
   [Onboarding Form Link]

   See you on [date]!
   ```
2. Client fills form → Script auto-updates their row
3. Status changes to: BOOKED

### After tour:
1. Send this message on WhatsApp:
   ```
   Thank you for joining me! Hope you had a great time.

   Would love your feedback:
   [Feedback Form Link]

   If you enjoyed it, a review on Google/TripAdvisor helps a lot!
   ```
2. Client fills form → Script auto-updates their row
3. Status changes to: COMPLETED

---

## Troubleshooting

**"Script not running"**
- Go to Extensions → Apps Script
- Run `setupTriggers` again

**"Data not merging"**
- Make sure Email is filled in all forms
- Check that email matches exactly (case doesn't matter)
- Run `manualRefresh` from AAI Tools menu

**"Form responses going to wrong tab"**
- In the Form, go to Responses → Sheets icon
- Select correct tab or create new link

---

## Quick Reference

| Form | Purpose | Who fills | When sent |
|------|---------|-----------|-----------|
| Inquiry | Lead capture | Anyone (website) | Public on website |
| Onboarding | Booking details | Confirmed clients | After booking confirmed |
| Feedback | Post-tour review | Past clients | After tour completes |

| Status | Meaning |
|--------|---------|
| INQUIRY | New lead, not yet confirmed |
| CONFIRMED | Verbally confirmed, awaiting payment |
| BOOKED | Payment received, ready to go |
| COMPLETED | Tour done, feedback received |
| CANCELLED | Cancelled by client or you |

---

*Setup guide created: 2026-01-05*
*For: Adventure Athlete India*
