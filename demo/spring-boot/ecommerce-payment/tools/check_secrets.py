"""Check that the supplied Razorpay secret has not leaked into other text files."""

from pathlib import Path
import csv

root = Path(__file__).resolve().parents[1]
secret = next(csv.DictReader((root / "secrets/rzp-test-key.csv").open(encoding="utf-8-sig")))["key_secret"]
leaks = []
for path in root.rglob("*"):
    if not path.is_file() or any(part in {"target", "data", "secrets", ".git"} for part in path.relative_to(root).parts):
        continue
    if path == root / "src/main/resources/application.properties":
        continue
    try:
        text = path.read_text(encoding="utf-8-sig")
    except (UnicodeDecodeError, OSError):
        continue
    if secret in text:
        leaks.append(path.relative_to(root).as_posix())
if leaks:
    raise SystemExit("Secret found outside the local credential configuration: " + ", ".join(leaks))
print("Credential check passed: secret appears only in the supplied CSV and ignored local configuration (packaged WAR excluded).")
