---
title: "Automating Vendor CSV Downloads from Email Using Power Automate"
date: "2025-08-19"
slug: "power-automate-download-files"
video: ""
hero_image: ""
hero_image_alt: ""
hero_image_credit_text: ""
hero_image_credit_link: ""
related_posts: []
series: "Power Automate"
stack: ["Power Automate"]
next: ""
previous: ""
---

# Automating Vendor CSV Downloads from Email Using Power Automate (Free Connectors Only - Almost...)

Recently, I helped a client streamline the process of handling vendor CSV files sent via email. One particular vendor required manual downloads because their emails contained links rather than attachments. To solve this, we built an automated ETL (Extract, Transform, Load) process entirely in the cloud using **Power Automate** with mostly free connectors. Here’s how we did it.

---

## The Challenge

The client was receiving multiple emails daily from different vendors. Most emails included CSV attachments that could be handled easily, but one vendor embedded download links in their emails. The steps to manually extract and save these files were repetitive, error-prone, and time-consuming.

Our goal:
**Automatically extract all download links from emails and save the files to SharePoint or OneDrive.**

---

## Step 1: Trigger the Flow

We started with the **“When a new email arrives (V3)”** trigger in Power Automate. This action captures incoming emails and gives access to the email **Body**, which is the HTML content containing the download links.

---

## Step 2: Initialize Variables

We initialized a few variables to manage the parsing of links:

| Variable Name    | Type    | Initial Value       |
| ---------------- | ------- | ------------------- |
| **EmailBody**    | String  | `Body` from trigger |
| **FoundLinks**   | Array   | `[]`                |
| **LinkStartPos** | Integer | `0`                 |
| **LinkEndPos**   | Integer | `0`                 |
| **HrefToken**    | String  | `href="`            |

---

## Step 3: Extract Links Using a Loop

We created a **“Do Until”** loop that runs until no `href="` tokens remain in the email body:

**Condition:**

```plaintext
indexOf(variables('EmailBody'), variables('HrefToken')) is equal to -1
```

### Inside the Loop

1. **Calculate Link Start Position**

   ```plaintext
   add(indexOf(variables('EmailBody'), variables('HrefToken')), length(variables('HrefToken')))
   ```

2. **Extract Remaining Body**

   ```plaintext
   substring(variables('EmailBody'), variables('LinkStartPos'), sub(length(variables('EmailBody')), variables('LinkStartPos')))
   ```

3. **Find URL End**

   ```plaintext
   indexOf(variables('RemainingBody'), '"')
   ```

4. **Append the Link to FoundLinks**

   ```plaintext
   substring(variables('RemainingBody'), 0, variables('LinkEndPos'))
   ```

5. **Trim EmailBody for Next Iteration**

   ```plaintext
   substring(variables('RemainingBody'), add(variables('LinkEndPos'), 1), sub(length(variables('RemainingBody')), add(variables('LinkEndPos'), 1)))
   ```

At the end of the loop, the **`FoundLinks`** array contains all URLs from the email body.

---

## Step 4: Download Files

Once all links are extracted, we used an **“Apply to each”** action to loop through the URLs:

1. **HTTP (GET)** – retrieve file content
   *URI:* `@{items('Apply_to_each')}`

2. **Create File (OneDrive or SharePoint)** – save the downloaded content
   *File Name:*

   ```plaintext
   last(split(items('Apply_to_each'), '/'))
   ```

   *File Content:* Body from HTTP action

---

## Step 5: Summary

The automated ETL process now:

1. Monitors emails for new messages.
2. Extracts all download links from HTML email bodies.
3. Downloads each linked file.
4. Saves the files to SharePoint or OneDrive.

This approach removes manual downloads, reduces errors, and saves hours of repetitive work—completely using **free Power Automate connectors**.

---

### Takeaways

* **String manipulation in Power Automate** allows extraction of complex data from email bodies.
* **Do Until loops** are perfect for iterative parsing when the number of elements is unknown.
* **Combining HTTP GET and Create File actions** automates downloads seamlessly.

