window.addEventListener("pageshow", event => {
    if (event.persisted) {
        window.location.reload();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const total = parseInt(body.dataset.sessionTimeout, 10);
    const label = document.getElementById("session-countdown");
    const pill = label ? label.closest(".session-pill") : null;
    if (!total || !label) return;

    const deadline = Date.now() + total * 1000;

    const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        label.textContent = remaining;
        if (pill) pill.classList.toggle("warning", remaining <= 15);
        if (remaining === 0) {
            clearInterval(timer);
            setTimeout(() => { window.location.href = body.dataset.expiredUrl; }, 1500);
        }
    }, 1000);
});
