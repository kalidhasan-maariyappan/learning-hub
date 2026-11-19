"""Prelude for the LLM Engineering lesson runner.

Notebook code ends cells with display(Markdown(text)). Outside a notebook that prints
"<IPython.core.display.Markdown object>", so display() is replaced by one that prints the text.
Then main.py runs as a normal script.
"""
import runpy
import sys

try:
    import IPython.display as _d

    def _display(*objs, **kwargs):
        for o in objs:
            print(getattr(o, "data", o))

    _d.display = _display
except Exception:
    pass

sys.path.insert(0, ".")
runpy.run_path("main.py", run_name="__main__")
