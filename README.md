# AI Job Search & Resume Tailoring Workflow

An applied AI agent workflow that uses **Claude** connected to the **Indeed MCP (Model Context Protocol) server** to search live job listings, evaluate fit against a candidate's background, and generate a role-tailored resume — end to end, without manually browsing job boards or rewriting the resume by hand.

**Stack:** Claude (Anthropic), Indeed MCP connector, Node.js `docx` library (resume generation), LibreOffice (PDF verification)

---

## The Problem

Traditional job hunting means manually searching multiple job boards, reading dozens of postings to judge fit, and rewriting your resume from scratch for each application. This project turns that into a guided AI workflow: one conversation searches real job listings, evaluates them against your actual resume, and outputs a tailored, ready-to-submit document.

## Architecture

```
Candidate Resume (PDF/DOCX)
        │
        ▼
   Claude (Agent)
        │
        ├──► Indeed MCP: search_jobs(role, location, country) ──► Ranked live job listings
        │
        ├──► Indeed MCP: get_job_details(job_id) ──► Full job description
        │
        ├──► Fit analysis: compares job requirements against resume content,
        │     flags genuine matches vs. stretch roles, and is explicit about gaps
        │
        └──► Resume tailoring: reorders/reframes real experience to match the
              target role, generates a new .docx via a Node.js script, renders
              to PDF for visual QA before delivery
```

No part of this pipeline fabricates experience — the tailoring step only reorders, re-emphasizes, and rephrases content that already exists in the source resume, or clearly flags when a claim needs supporting evidence (e.g. "add a portfolio project to back this up").

## Workflow

### 1. Connect the job source
Claude connects to the **Indeed MCP server**, which exposes:
- `search_jobs(search, location, country_code, job_type)` — live job search
- `get_job_details(job_id)` — full posting details
- `get_company_data(companyName, ...)` — company reviews, salary data

### 2. Search across roles and locations
Rather than one broad query, multiple targeted searches were run — different keyword phrasings (`"AI Project Manager"`, `"AI Data Analyst"`, `"Generative AI"`) across different locations (remote US, UK, Germany, and Nigeria-specific: Lagos, Abuja, Nigeria-wide) — since a single query under-represents how differently the same role gets titled across job boards and regions.

### 3. Evaluate fit honestly
Each result set was screened against the candidate's actual resume — flagging **strong fits**, **stretch roles**, and **weak matches** — rather than presenting every result as equally good. Where a role wanted skills the candidate didn't clearly have yet (e.g. production AI engineering experience), that gap was named explicitly instead of glossed over.

### 4. Deep-dive the target role
Once a specific listing was chosen, `get_job_details` pulled the full posting so the resume tailoring could be grounded in the employer's actual language and requirements — not just the job title.

### 5. Tailor the resume — not fabricate it
The resume was rebuilt (see [`resume_builder/build_resume.js`](resume_builder/build_resume.js)) with:
- Professional summary reframed toward the target role
- Most relevant work experience reordered to the top
- Bullet points re-emphasized (same underlying facts, different framing/order)
- Skills section reordered to surface what the job actually asks for
- A generative-AI skills claim was deliberately hedged ("actively deepening hands-on skills") until the candidate could point to real, evidenced projects — at which point the summary and bullets were updated again to reflect that

### 6. Visual QA before delivery
The generated `.docx` was converted to PDF and rendered to images at each iteration to check for layout issues (page overflow, awkward wrapping) before handing it back — an automated resume can look fine in text and still break visually.

### 7. Iterate as new evidence appears
When the candidate added two real AI automation projects (a RAG Q&A system and an automated scope-risk tracker) after the initial tailoring pass, the resume was updated again — moving the most AI-relevant role to the top of Work Experience, adding both projects to Key Projects with the specific tools used, and only then strengthening the generative AI claims in the summary, since they were now backed by real evidence.

## Example run

**Search:** AI-first, remote-friendly roles, Nigeria-focused (Lagos, Abuja)

| Result | Type |
|---|---|
| Generative AI Engineer — DAREY.IO, Lagos | Full-time, AI instructor role |
| AI & Machine Learning Engineer — ITC Worldwide, Lagos | Full-time |
| Senior AI Automation Engineer — Lifted Horizon Nigeria | Full-time |
| Manager, Africa Fintech Accelerator — Visa, Lagos | Full-time, strongest experience-level fit |
| Business Analyst – Product & Digital Platforms — Orivon Advisory | Full-time |

The candidate selected the **Generative AI Engineer / Instructor** role. Claude then pulled the full posting, noted it specifically wanted people who'd *already built* production AI systems to teach others, and tailored the resume's summary, top work experience entry, and skills section around that — while flagging that interview prep should include a walkthrough of real projects to back the claims.

## Key takeaway

The valuable part of this workflow isn't "AI writes your resume" — it's using an AI agent with live tool access (real job search, real job descriptions) to **ground** resume tailoring in actual requirements, while keeping a human in the loop to supply real project evidence and make the final call on which roles to pursue.

## Files

- [`resume_builder/build_resume.js`](resume_builder/build_resume.js) — Node.js script (using the `docx` library) that generates the tailored resume as a `.docx` from structured content, used at each iteration of this workflow.

---
Built by Ogheneyoma Great Okamonu as an applied AI agent / prompt-engineering portfolio project.
