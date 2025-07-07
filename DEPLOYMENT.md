# Vercel Deployment Guide

This guide will help you deploy your EcoShop application to Vercel.

## 🚀 Pre-deployment Checklist

Your project is now configured for Vercel deployment with the following changes:

1. ✅ **API converted to serverless function** (`api/products.go`)
2. ✅ **Frontend updated** to use production API endpoint
3. ✅ **Project structure** simplified for Vercel deployment
4. ✅ **Vercel configuration** added (`vercel.json`)
5. ✅ **Build script** added to package.json

## 📋 Deployment Steps

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/log in
2. Click "New Project"
3. Import your GitHub repository (or upload your project)
4. Vercel will automatically detect your configuration
5. Click "Deploy"

### Step 3: Deploy via CLI (Alternative)

```bash
# Navigate to your project root
cd eco-shop/ecoShop

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)

- **Frontend**: React app built from root directory to `/build`
- **API**: Go serverless function at `/api/products`
- **Framework**: Create React App (auto-detected)

### API Endpoint

- **Development**: `http://localhost:8080/products`
- **Production**: `https://your-app.vercel.app/api/products`

## 🌐 Environment Variables

No environment variables are required for this basic setup. The frontend automatically switches between development and production API endpoints.

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

1. **Main App**: `https://your-app.vercel.app`
2. **API**: `https://your-app.vercel.app/api/products`
3. **Debug Tool**: Open `debug-api.html` in your browser to test the API directly

### Debugging Steps

If products don't appear:

1. **Check Browser Console**: Open DevTools (F12) and look for error messages
2. **Test API Directly**: Visit `https://your-app.vercel.app/api/products` in your browser
3. **Use Debug Tool**: Open the `debug-api.html` file to test both local and production APIs
4. **Check Network Tab**: In DevTools, see if the API request is being made and what the response is

## 📝 Notes

- The Go backend is now serverless and will automatically scale
- CORS is configured for all origins (`*`)
- The frontend includes search, filtering, and cart functionality
- Bootstrap styling is included via CDN

## 🔄 Redeployment

Any push to your main branch will trigger automatic redeployment if connected to Git, or you can manually redeploy using:

```bash
vercel --prod
```

## 🐛 Troubleshooting

If you encounter issues:

1. Check the Vercel build logs
2. Ensure all file paths are correct
3. Verify the API endpoint is accessible
4. Check browser console for any errors

## 🎉 Success!

Your EcoShop application should now be live on Vercel with:

- ✅ Serverless Go API
- ✅ React frontend
- ✅ Shopping cart functionality
- ✅ Product search and filtering
- ✅ Responsive design
