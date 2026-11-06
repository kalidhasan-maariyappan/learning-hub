"""HTTP checks against the packaged local WAR; never submits a payment."""

from pathlib import Path
from urllib.request import build_opener, HTTPCookieProcessor, Request
from urllib.parse import urlencode
from urllib.error import HTTPError
from http.cookiejar import CookieJar
from html.parser import HTMLParser
import json

ROOT = Path(__file__).resolve().parents[1]
BASE = "http://127.0.0.1:8093"
client = build_opener(HTTPCookieProcessor(CookieJar()))
results = []


class Inputs(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.inputs = {}
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag == "input":
            a = dict(attrs)
            if "name" in a:
                self.inputs[a["name"]] = a.get("value", "")


def fetch(path, data=None):
    req = Request(BASE + path, data=urlencode(data).encode() if data is not None else None)
    try:
        response = client.open(req, timeout=30)
    except HTTPError as ex:
        response = ex
    return response.status, response.read().decode("utf-8"), response.headers, response.url


def check(name, passed):
    results.append({"check": name, "passed": bool(passed)})
    if not passed:
        raise AssertionError(name)


code, html, _, _ = fetch("/")
check("packaged JSP home renders", code == 200 and "Objects for a" in html)
check("UTF-8 punctuation renders correctly", "✳" in html and "© 2026" in html and "â" not in html)
for path in [
    "/assets/css/store.css",
    "/assets/js/store.js",
    "/assets/images/lamp.svg",
    "/assets/vendor/fonts.css",
    "/assets/vendor/fonts/bootstrap-icons.woff2",
]:
    # Binary assets are checked separately from text decoding.
    with client.open(BASE + path, timeout=10) as response:
        check("bundled asset " + path, response.status == 200)

_, html, _, _ = fetch("/login")
token = Inputs(html).inputs["_csrf"]
props = {}
for line in (ROOT / "src/main/resources/application.properties").read_text(encoding="utf-8-sig").splitlines():
    if "=" in line and not line.startswith("#"):
        key, value = line.split("=", 1)
        props[key] = value
code, html, _, url = fetch("/login", {"_csrf": token, "username": props["app.admin.email"], "password": props["app.admin.password"]})
check("admin BCrypt session login", code == 200 and "Studio admin" in html and url.endswith("/"))
for path, text in [
    ("/admin", "Studio overview."),
    ("/admin/products", "Add an essential"),
    ("/admin/products?edit=3", "Edit essential"),
    ("/admin/orders", "Orders."),
    ("/admin/payments", "Payment ledger."),
    ("/admin/refunds", "Refunds."),
    ("/orders", "Your orders."),
    ("/orders/1", "Order FF–1"),
    ("/cart", "Your bag"),
]:
    code, html, headers, _ = fetch(path)
    check("render " + path, code == 200 and text in html)
    check("no-cache " + path, "no-store" in headers.get("Cache-Control", ""))
code, _, _, _ = fetch("/cart/items", {"productId": "3", "quantity": "1"})
check("CSRF rejection on live server", code == 403)
for path in ["/orders/999999", "/secrets/rzp-test-key.csv", "/application.properties"]:
    code, _, _, _ = fetch(path)
    check("protected or absent resource " + path, code == 404)
_, html, _, _ = fetch("/cart")
token = Inputs(html).inputs["_csrf"]
_, html, _, url = fetch("/logout", {"_csrf": token})
check("live logout redirects to login", "/login?logout" in url)
_, _, _, url = fetch("/cart")
check("session invalidated after logout", "/login" in url)
(ROOT / "tools/qa-results.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
print(f"{len(results)} packaged-WAR HTTP checks passed.")
