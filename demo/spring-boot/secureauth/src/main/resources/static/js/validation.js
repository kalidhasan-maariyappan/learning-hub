document.addEventListener("DOMContentLoaded", () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.querySelectorAll("[data-toggle-password]").forEach(button => {
        button.addEventListener("click", () => {
            const input = document.getElementById(button.dataset.togglePassword);
            const show = input.type === "password";
            input.type = show ? "text" : "password";
            button.textContent = show ? "Hide" : "Show";
            button.setAttribute("aria-label", show ? "Hide password" : "Show password");
        });
    });

    function setError(input, message) {
        const error = document.getElementById(input.id + "-error");
        input.classList.toggle("is-invalid", !!message);
        if (message) {
            input.setAttribute("aria-invalid", "true");
            input.setAttribute("aria-describedby", error.id);
        } else {
            input.removeAttribute("aria-invalid");
        }
        error.textContent = message || "";
    }

    function validateField(input) {
        const value = input.value.trim();
        if (input.id === "name") {
            return value ? (value.length > 100 ? "Name must be at most 100 characters" : "") : "Name is required";
        }
        if (input.id === "email") {
            return value ? (emailPattern.test(value) ? "" : "Enter a valid email address") : "Email is required";
        }
        if (input.id === "password") {
            if (!input.value) return "Password is required";
            if (input.form.dataset.validate === "register" && (input.value.length < 8 || input.value.length > 72)) return "Password must be 8 to 72 characters";
            return "";
        }
        if (input.id === "confirmPassword") {
            if (!input.value) return "Please confirm your password";
            return input.value === input.form.querySelector("#password").value ? "" : "Passwords do not match";
        }
        return "";
    }

    document.querySelectorAll("form[data-validate]").forEach(form => {
        const inputs = Array.from(form.querySelectorAll("input.form-control"));

        inputs.forEach(input => {
            input.addEventListener("blur", () => { if (input.value) setError(input, validateField(input)); });
            input.addEventListener("input", () => { if (input.classList.contains("is-invalid")) setError(input, validateField(input)); });
        });

        form.addEventListener("submit", event => {
            let firstInvalid = null;
            inputs.forEach(input => {
                const message = validateField(input);
                setError(input, message);
                if (message && !firstInvalid) firstInvalid = input;
            });
            if (firstInvalid) {
                event.preventDefault();
                firstInvalid.focus();
            }
        });
    });
});
