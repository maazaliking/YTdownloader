from flask import Flask, render_template, request, jsonify, send_file
from pytube import YouTube
import os
import re

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download_video():
    try:
        url = request.json['url']
        quality = request.json.get('quality', '720p')
        
        # Create YouTube object
        yt = YouTube(url)
        
        # Get video information
        video_info = {
            'title': yt.title,
            'author': yt.author,
            'length': yt.length,
            'thumbnail': yt.thumbnail_url,
            'qualities': [stream.resolution for stream in yt.streams.filter(progressive=True)]
        }
        
        return jsonify({'success': True, 'info': video_info})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/start-download', methods=['POST'])
def start_download():
    try:
        url = request.json['url']
        quality = request.json.get('quality', '720p')
        
        yt = YouTube(url)
        video = yt.streams.filter(progressive=True, resolution=quality).first()
        
        if not video:
            video = yt.streams.get_highest_resolution()
            
        # Download to temporary location
        download_path = os.path.join(os.getcwd(), 'downloads')
        os.makedirs(download_path, exist_ok=True)
        
        file_path = video.download(download_path)
        
        # Clean filename
        filename = os.path.basename(file_path)
        safe_filename = re.sub(r'[^\w\-_\. ]', '_', filename)
        
        return jsonify({
            'success': True,
            'filename': safe_filename,
            'path': file_path
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
