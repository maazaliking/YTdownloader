# YouTube Video Downloader

A beautiful and modern web application to download YouTube videos in various qualities.

## Features

- Modern and responsive UI
- Real-time video information fetching
- Multiple quality options
- Progress tracking
- Smooth animations and transitions

## Local Development

1. Install Python requirements:
```bash
pip install -r requirements.txt
```

2. Run the application locally:
```bash
python app.py
```

3. Open your browser and navigate to `http://localhost:5000`

## Deployment to Render.com

1. Create a new account on [Render.com](https://render.com)

2. Click on "New +" and select "Web Service"

3. Connect your GitHub repository

4. Fill in the deployment details:
   - Name: youtube-downloader (or your preferred name)
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

5. Click "Create Web Service"

Your application will be deployed and accessible via the URL provided by Render.

## Usage

1. Paste a YouTube URL into the input field
2. Click "Get Info" to fetch video details
3. Select your preferred quality
4. Click "Download" to start downloading

## Technologies Used

- Backend: Python Flask
- Frontend: HTML5, CSS3, JavaScript
- CSS Framework: Tailwind CSS
- YouTube API: pytube
- Deployment: Render.com

## Note

This application is for educational purposes only. Please respect YouTube's terms of service and copyright laws when downloading videos.
