
# Firebase Deployment Guide

## Prerequisites

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```

## Environment Variables

Create a `.env` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Build and Deploy

1. Build your application:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## Authentication Setup

1. Go to Firebase Console > Authentication
2. Enable Email/Password authentication
3. Add your authorized domains

## Security Rules

Update your Firebase security rules to protect your data:

```javascript
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
