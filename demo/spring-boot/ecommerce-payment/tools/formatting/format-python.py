"""Format authored Python without installing global tools or setting env vars."""

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent / "python"))

import black

paths = [*ROOT.joinpath("tools").glob("*.py"), Path(__file__).resolve()]
for path in paths:
    original = path.read_text(encoding="utf-8")
    formatted = black.format_str(original, mode=black.Mode(line_length=160))
    black.assert_equivalent(original, formatted)
    path.write_text(formatted, encoding="utf-8")

print(f"Formatted {len(paths)} Python scripts; Python ASTs are unchanged.")
