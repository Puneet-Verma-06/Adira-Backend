# Vercel Deployment Debugging Guide

## Key Changes Made

1. **Lazy Database Connection**: Database now connects on first API request, not on function initialization
2. **Root Route Added**: Access `https://sanju-backend.vercel.app/` to verify function is running
3. **Improved Error Handling**: Returns 503 if database connection fails

## How to Check Vercel Logs

1. Go to: https://vercel.com/dashboard
2. Click on your `sanju-backend` project
3. Click on "Deployments"
4. Click on the latest deployment
5. Click "View Function Logs" or "Runtime Logs"

## Required Environment Variables on Vercel

Make sure these are set in Vercel Dashboard → Settings → Environment Variables:

- `MONGODB_URI` - Your MongoDB connection string (from MongoDB Atlas)
- `JWT_SECRET` - Any random secret string (e.g., "your-super-secret-jwt-key-12345")
- `NODE_ENV` - Set to `production`

## Test Endpoints After Deployment

1. **Root**: https://sanju-backend.vercel.app/
   - Should return: `{ status: 'OK', message: 'Sanju Backend API is running' }`

2. **Health Check**: https://sanju-backend.vercel.app/api/health
   - Should return: `{ status: 'OK', message: 'Server is running' }`

3. **Properties**: https://sanju-backend.vercel.app/api/properties
   - Should return: `{ properties: [...] }`

## Common Issues

### 500 Error - Database Connection
- **Cause**: MongoDB URI not set or incorrect
- **Solution**: Check MONGODB_URI in Vercel environment variables
- **How to fix**: 
  1. Go to MongoDB Atlas
  2. Get connection string
  3. Add it to Vercel env vars
  4. Redeploy

### CORS Error
- **Cause**: Frontend domain not allowed
- **Solution**: Already fixed - frontend domain is in allowed origins
- **Verify**: Check server.js lines 17-21

### 404 Error
- **Cause**: Route path mismatch
- **Solution**: Make sure frontend is using correct API URL
- **Check**: `property/src/config/api.js` should have `VITE_API_URL=https://sanju-backend.vercel.app`

## How to View Real-Time Logs

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# View logs
vercel logs https://sanju-backend.vercel.app
```

## If Still Failing

1. Check if MongoDB Atlas allows Vercel's IP addresses:
   - In MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allow from anywhere) for testing
   
2. Check if MongoDB connection string is correct:
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - Make sure to replace `<password>` with actual password
   - Make sure password doesn't have special characters that need URL encoding

3. Wait 2-3 minutes after pushing for Vercel to complete deployment
