
const allRadios = document.querySelectorAll('input[type="radio"]');
allRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const card = e.target.closest('.question-card');
        if (card) card.style.borderLeft = `3px solid var(--highlight-colour)`;
    })
})

