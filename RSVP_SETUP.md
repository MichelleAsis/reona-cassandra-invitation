# Free RSVP setup

The custom RSVP form sends submissions to a Google Sheet through Google Apps Script. Both are free to use with a Google account. The Apps Script URL is public so guests can submit without signing in; keep the spreadsheet itself private.

## 1. Create the response spreadsheet

1. Create a blank Google Sheet in your Google account.
2. Copy the spreadsheet ID from its URL. It is the text between `/d/` and `/edit`.

## 2. Add the Apps Script endpoint

1. Open [script.google.com](https://script.google.com) and create a new project.
2. Replace the contents of `Code.gs` with the `Code.gs` file in this folder.
3. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` at the top of the script with the spreadsheet ID from step 1.
4. Save the project.

## 3. Deploy the endpoint

1. In Apps Script, choose **Deploy → New deployment**.
2. Choose **Web app** as the deployment type.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** so guests do not need to sign in.
5. Deploy and approve the requested permissions.
6. Copy the web app URL. It should end in `/exec`.

The first submission may prompt you to authorize the script. The owner should complete that authorization before sharing the RSVP page.

## 4. Connect and host the page

1. In `Reonacassandra.html`, find `RSVP_ENDPOINT` in the main script.
2. Replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the web app URL.
3. Host `Reonacassandra.html` and the `images` folder together on a static host. A local `file:///` page is not accessible to guests. Free static hosting options include GitHub Pages and Cloudflare Pages.
4. Submit a test RSVP and confirm a row appears in the private Google Sheet.

The script creates an `RSVPs` tab with the submission time, guest name, attendance choice, and birthday wish. To update the deployment after editing the Apps Script, use **Deploy → Manage deployments → Edit → New version → Deploy**.

## Privacy and abuse notes

Anyone with the public page can submit the form, so the script validates fields and includes a basic bot honeypot. Do not put private credentials in the HTML or share the spreadsheet publicly. Apps Script has usage quotas; this free approach is intended for a small event.
