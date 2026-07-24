# Resume Builder Script

`build_resume.js` generates a formatted `.docx` resume from structured JS content using the [`docx`](https://www.npmjs.com/package/docx) library.

This is the actual script used across multiple tailoring passes in this workflow — each time the target role or available evidence (e.g. new portfolio projects) changed, the content blocks were updated and the script re-run to produce a fresh, consistently formatted resume.

## Usage

```bash
npm install docx
node build_resume.js
```

Outputs a `.docx` file. To visually verify formatting before sending:

```bash
soffice --headless --convert-to pdf output.docx
pdftoppm -jpeg -r 100 output.pdf page
```

## Why a script instead of manual editing

- Consistent formatting (fonts, spacing, section styling) across every revision
- Fast to re-run after each round of tailoring or new evidence
- Easy to diff between versions since content lives in structured code, not scattered Word formatting
