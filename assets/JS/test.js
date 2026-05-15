let currentIndex = 0
const iframe = document.getElementById('questionFrame')
const moduleLabelSpan = document.getElementById('currentModuleLabel')
const nextBtn = document.getElementById('nextButton')

const batches = [
    "batches/batch_1.html",
    "batches/batch_2.html",
    "batches/batch_3.html",
    "batches/batch_4.html",
    "batches/batch_5.html",
    "batches/batch_6.html",
    "batches/batch_7.html"
]

let allAnswers = {}

function loadBatch(index) {
    if (index >= 0 && index < batches.length) {
        iframe.src = batches[index]
        moduleLabelSpan.textContent = (index + 1).toString()

        iframe.onload = () => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
                if (iframeDoc && iframeDoc.body) {
                    const height = iframeDoc.body.scrollHeight;
                    iframe.style.height = Math.max(400, height + 30) + 'px'
                } else {
                    iframe.style.height = '480px'
                }
            } catch (e) {
                iframe.style.height = '500px'
            }
        }
    }
}

function collectAnswers() {
    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        const radios = iframeDoc.querySelectorAll('input[type="radio"]:checked')
        radios.forEach(radio => {
            allAnswers[radio.name] = radio.value
        })
    } catch (e) {
        console.warn('Could not collect answers from iframe:', e)
    }
}

nextBtn.addEventListener('click', function () {
    if (currentIndex + 1 < batches.length) {
        currentIndex++;
        loadBatch(currentIndex);
    } else {
        /*
        if (currentIndex === batches.length - 1) {
            nextBtn.textContent = '🎉 Test completado 🎉';
            nextBtn.disabled = true;
            nextBtn.style.cursor = "default";
            nextBtn.style.opacity = "0.8";
            nextBtn.style.background = "linear-gradient(135deg, #2CC990 0%, #1E8F6B 100%)";
        }
        */
        localStorage.setItem('bigfive_answers', JSON.stringify(allAnswers))
        window.location.href = 'results.html'
    }
})

loadBatch(0);
