export const downloadFile = ({ url, fileName }: {
    url: string,
    fileName: string,
}) => {
    return new Promise((resolve) => {
        if (!url) {
            resolve("")
            return;
        }

        setTimeout(() => {
            const aTag = document.createElement("a");
            aTag.href = url;
            aTag.download = fileName
            document.body.appendChild(aTag);
            aTag.click();
            document.body.removeChild(aTag);
            resolve(url)
        }, 1000)
    })
}

export async function fetchWithProgress(url: string, progressCallback?: (_progress: number, _total: number) => void) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentLength = response.headers.get('Content-Length');
    if (!contentLength) {
        throw new Error('Content-Length header is missing');
    }

    const total = parseInt(contentLength, 10);
    let loaded = 0;

    if (!response?.body) return new Response(null);

    const reader = response.body.getReader();
    const stream = new ReadableStream({
        start(controller) {
            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        return;
                    }

                    loaded += value.byteLength;
                    if (progressCallback) progressCallback(loaded, total);

                    controller.enqueue(value);
                    read();
                }).catch(error => {
                    console.error('Stream reading error', error);
                    controller.error(error);
                });
            }

            read();
        }
    });

    return new Response(stream);
}
