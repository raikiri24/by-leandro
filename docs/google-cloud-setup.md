# Google Cloud Setup — OAuth for Sign In

This guide covers everything you need to do in Google Cloud Console to enable Google login in the app.

---

## Prerequisites

- A Google account
- Your app's production URL (e.g. `https://your-domain.com`)

---

## Step 1 — Create or Select a GCP Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown at the top → **New Project**
3. Give it a name (e.g. `leandros-card-tool`) and click **Create**
4. Make sure the new project is selected in the dropdown

---

## Step 2 — Configure the OAuth Consent Screen

This is the screen users see when they click "Sign In with Google".

1. In the left sidebar, go to **APIs & Services → OAuth consent screen**
2. Select **External** (unless you only want Google Workspace users) → **Create**
3. Fill in the required fields:
   - **App name:** Leandro's Tournament Card Generator
   - **User support email:** your email
   - **Developer contact email:** your email
4. Click **Save and Continue**
5. On the **Scopes** step, click **Add or Remove Scopes** and add:
   - `openid`
   - `email`
   - `profile`
6. Click **Save and Continue** through the remaining steps
7. Back on the consent screen overview, click **Publish App** if you want any Google user to sign in (not just test users). If you keep it in **Testing** mode, you must manually add each allowed email under "Test users".

---

## Step 3 — Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth 2.0 Client ID**
3. Set **Application type** to **Web application**
4. Set **Name** to anything (e.g. `Card Tool Web Client`)
5. Under **Authorised JavaScript origins**, add:
   ```
   http://localhost:3000
   https://your-domain.com
   ```
6. Under **Authorised redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-domain.com/api/auth/callback/google
   ```
   > Replace `your-domain.com` with your actual production domain.
7. Click **Create**

A dialog will show your credentials. Copy them now — the secret is only shown once (you can always create a new one though).

---

## Step 4 — Add Credentials to Your Environment

In your `.env.local` file (never commit this file):

```bash
AUTH_GOOGLE_ID=your-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-client-secret
```

Generate a secure `AUTH_SECRET` by running:

```bash
npx auth secret
```

Then add the output to `.env.local`:

```bash
AUTH_SECRET=the-generated-value
```

For production, add these same three variables to your hosting provider's environment variable settings (Vercel, Railway, etc.).

On AWS Amplify, also set:

```bash
AUTH_TRUST_HOST=true
```

---

## Summary of Environment Variables

| Variable | Where to get it |
|---|---|
| `AUTH_SECRET` | Run `npx auth secret` in your terminal |
| `AUTH_GOOGLE_ID` | Google Cloud Console → Credentials → your OAuth client |
| `AUTH_GOOGLE_SECRET` | Same as above |
| `AUTH_TRUST_HOST` | Set to `true` on AWS Amplify |
| `MONGODB_URI` | Your existing MongoDB Atlas connection string |
| `MONGODB_DB` | Your existing database name (default: `byleandro`) |

---

## Notes

- The `/api/auth/callback/google` redirect URI **must match exactly** — including protocol (`http` vs `https`) and no trailing slash.
- If you add a new domain later, go back to **Credentials → your OAuth client → Edit** and add both the origin and the callback URI.
- Auth.js automatically creates `users`, `accounts`, and `sessions` collections in MongoDB — no manual setup needed.
