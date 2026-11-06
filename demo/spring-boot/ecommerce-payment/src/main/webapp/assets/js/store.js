'use strict';
document.querySelectorAll('.validated-form').forEach((form) => {
  const password = form.querySelector('[name=password]');
  const confirm = form.querySelector('[name=confirmPassword]');
  if (password && confirm) {
    const validate = () => confirm.setCustomValidity(password.value === confirm.value ? '' : 'Passwords do not match.');
    password.addEventListener('input', validate);
    confirm.addEventListener('input', validate);
  }
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.reportValidity();
    }
    form.classList.add('was-validated');
  });
});
document.querySelectorAll('form[data-loading]').forEach((form) =>
  form.addEventListener('submit', (event) => {
    if (event.defaultPrevented || !form.checkValidity()) return;
    const button = form.querySelector('button[type=submit],button:not([type])');
    if (form.dataset.busy === 'true') {
      event.preventDefault();
      return;
    }
    form.dataset.busy = 'true';
    if (button) {
      button.disabled = true;
      button.textContent = 'Please wait…';
    }
  })
);
window.addEventListener('pageshow', () =>
  document.querySelectorAll('form[data-loading]').forEach((form) => {
    if (form.dataset.busy === 'true') {
      form.dataset.busy = 'false';
      window.location.reload();
    }
  })
);
document.querySelectorAll('[data-table-filter]').forEach((input) => {
  const table = document.querySelector('table');
  if (!table) return;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const size = 8;
  let page = 0;
  const nav = document.createElement('nav');
  nav.className = 'pagination-bar';
  nav.setAttribute('aria-label', 'Table pages');
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'btn btn-outline-secondary';
  previous.textContent = 'Previous';
  const label = document.createElement('span');
  label.className = 'small muted align-self-center';
  label.setAttribute('aria-live', 'polite');
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'btn btn-outline-secondary';
  next.textContent = 'Next';
  nav.append(previous, label, next);
  table.parentElement.append(nav);
  const render = () => {
    const matches = rows.filter((row) => row.textContent.toLowerCase().includes(input.value.toLowerCase()));
    const pages = Math.max(1, Math.ceil(matches.length / size));
    page = Math.min(page, pages - 1);
    rows.forEach((row) => (row.hidden = true));
    matches.slice(page * size, (page + 1) * size).forEach((row) => (row.hidden = false));
    label.textContent = matches.length + ' results · Page ' + (page + 1) + ' of ' + pages;
    previous.disabled = page === 0;
    next.disabled = page === pages - 1;
    nav.hidden = rows.length === 0;
  };
  input.addEventListener('input', () => {
    page = 0;
    render();
  });
  previous.addEventListener('click', () => {
    page--;
    render();
  });
  next.addEventListener('click', () => {
    page++;
    render();
  });
  render();
});
const pay = document.getElementById('pay-button');
if (pay)
  pay.addEventListener('click', () => {
    const message = document.getElementById('payment-message');
    if (typeof window.Razorpay !== 'function') {
      message.textContent = 'Razorpay could not load. Check your connection and reload this page.';
      return;
    }
    pay.disabled = true;
    message.textContent = 'Opening secure test checkout…';
    try {
      const checkout = new Razorpay({
        key: pay.dataset.key,
        amount: Number(pay.dataset.amount),
        currency: 'INR',
        name: 'Form & Field',
        description: 'Considered essentials · Test order',
        order_id: pay.dataset.order,
        theme: { color: '#294c3d' },
        modal: {
          ondismiss: () => {
            pay.disabled = false;
            message.textContent = 'Checkout closed. Refresh payment status before retrying if you submitted a payment.';
          }
        },
        handler: (response) => {
          message.textContent = 'Confirming the payment with Razorpay…';
          const form = document.getElementById('verify-form');
          ['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'].forEach((key) => (form.elements[key].value = response[key]));
          form.submit();
        }
      });
      checkout.on('payment.failed', () => {
        message.textContent = 'The payment was not confirmed. You can try again on this order.';
        pay.disabled = false;
      });
      checkout.open();
    } catch (error) {
      pay.disabled = false;
      message.textContent = 'Checkout is unavailable. Refresh payment status or try again later.';
    }
  });
