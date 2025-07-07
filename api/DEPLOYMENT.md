# Deployment Guide for Vercel

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **Vercel CLI** (optional): Install with `npm i -g vercel`

## Deployment Steps

### Method 1: Using Vercel Dashboard (Recommended)

1. **Connect Repository**:

   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Connect your Git repository
   - Select your repository

2. **Configure Build Settings**:

   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/build`

3. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project-name.vercel.app`

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy from Project Root**:

   ```bash
   cd tech-challenge/intern
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `intern-challenge` (or your preferred name)
   - In which directory is your code located? `./`

## Project Structure for Vercel

```
tech-challenge/intern/
├── api/
│   ├── products.go          # Serverless function
│   └── go.mod              # Go module file
├── frontend/
│   ├── src/                # React source code
│   ├── public/             # Static files
│   ├── package.json        # Frontend dependencies
│   └── build/              # Built files (generated)
├── vercel.json             # Vercel configuration
├── package.json            # Root package.json
└── README.md               # Project documentation
```

## Important Notes

- **API Endpoint**: Your Go backend will be available at `/api/products`
- **Frontend**: Your React app will be served from the root domain
- **CORS**: Already configured in the Go handler
- **Environment**: The app automatically uses production settings on Vercel

## Troubleshooting

1. **Build Fails**: Check that all dependencies are in package.json
2. **API Not Working**: Verify the Go function is in the `api/` directory
3. **Frontend Not Loading**: Check that the build directory is correct

## Local Development

To test locally before deployment:

```bash
# Start backend (if testing locally)
cd backend
go run products.go

# Start frontend
cd frontend
npm install
npm start
```

## Environment Variables

If you need environment variables:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add your variables

Your app is now ready for deployment! 🚀
