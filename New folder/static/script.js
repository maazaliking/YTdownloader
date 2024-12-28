async function getVideoInfo() {
    const urlInput = document.getElementById('url-input');
    const videoInfo = document.getElementById('video-info');
    const url = urlInput.value.trim();

    if (!url) {
        alert('Please enter a YouTube URL');
        return;
    }

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (data.success) {
            displayVideoInfo(data.info);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        alert('Error fetching video information');
    }
}

function displayVideoInfo(info) {
    document.getElementById('video-info').classList.remove('hidden');
    document.getElementById('thumbnail').src = info.thumbnail;
    document.getElementById('video-title').textContent = info.title;
    document.getElementById('video-author').textContent = 'By ' + info.author;
    document.getElementById('video-duration').textContent = formatDuration(info.length);

    const qualitySelect = document.getElementById('quality-select');
    qualitySelect.innerHTML = '';
    info.qualities.forEach(quality => {
        const option = document.createElement('option');
        option.value = quality;
        option.textContent = quality;
        qualitySelect.appendChild(option);
    });
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function downloadVideo() {
    const url = document.getElementById('url-input').value.trim();
    const quality = document.getElementById('quality-select').value;
    const progressDiv = document.getElementById('download-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    progressDiv.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = '0%';

    try {
        const response = await fetch('/start-download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, quality }),
        });

        const data = await response.json();

        if (data.success) {
            // Simulate progress (since actual download happens on server)
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                if (progress <= 100) {
                    progressBar.style.width = progress + '%';
                    progressText.textContent = progress + '%';
                } else {
                    clearInterval(interval);
                    alert('Download completed!');
                    progressDiv.classList.add('hidden');
                }
            }, 200);
        } else {
            alert('Error: ' + data.error);
            progressDiv.classList.add('hidden');
        }
    } catch (error) {
        alert('Error downloading video');
        progressDiv.classList.add('hidden');
    }
}
