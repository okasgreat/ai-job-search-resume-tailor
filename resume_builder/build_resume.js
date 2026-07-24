const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, Spacing, UnderlineType, ExternalHyperlink
} = require("docx");
const fs = require("fs");

const NAVY = "1F3864";
const GREY = "444444";

function contactLine() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({ text: "your.email@example.com", size: 20, color: GREY }),
      new TextRun({ text: "  |  ", size: 20, color: GREY }),
      new TextRun({ text: "linkedin.com/in/your-profile", size: 20, color: GREY }),
      new TextRun({ text: "  |  ", size: 20, color: GREY }),
      new TextRun({ text: "github.com/your-username", size: 20, color: GREY }),
      new TextRun({ text: "  |  ", size: 20, color: GREY }),
      new TextRun({ text: "+1 555 000 0000", size: 20, color: GREY }),
      new TextRun({ text: "  |  Lagos, Nigeria", size: 20, color: GREY }),
    ],
  });
}

function name() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "YOUR NAME HERE", bold: true, size: 32, color: NAVY }),
    ],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 2 } },
    children: [ new TextRun({ text, bold: true, size: 21, color: NAVY, allCaps: true }) ],
  });
}

function jobHeader(title, org, dates) {
  return new Paragraph({
    spacing: { before: 110, after: 15 },
    children: [
      new TextRun({ text: title, bold: true, size: 20 }),
      new TextRun({ text: "   " + dates, italics: true, size: 18, color: GREY }),
    ],
  });
}

function orgLine(org) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [ new TextRun({ text: org, italics: true, size: 19, color: GREY }) ],
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 25 },
    bullet: { level: 0 },
    children: [ new TextRun({ text, size: 19 }) ],
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 90 },
    children: [ new TextRun({ text, size: 19, ...opts }) ],
  });
}

function skillLine(label, value) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: label + ": ", bold: true, size: 19 }),
      new TextRun({ text: value, size: 19 }),
    ],
  });
}

const doc = new Document({
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 620, bottom: 620, left: 860, right: 860 } },
    },
    children: [
      name(),
      contactLine(),

      sectionHeading("Professional Summary"),
      para(
        "Data Analyst and Project Coordinator with an engineering background and hands-on experience building " +
        "AI-powered automation workflows, analyzing project and participant data, and presenting technical " +
        "methodologies to senior stakeholders and government leaders. Practical experience integrating LLMs and " +
        "AI agents \u2014 including the Claude API, ChatGPT, and Make.com \u2014 into real business workflows, such as a " +
        "retrieval-augmented Q&A system and an automated scope-risk flagging tool. Combines this generative AI " +
        "experience with strong project coordination, data analysis, and instructional delivery skills."
      ),

      sectionHeading("Work Experience"),

      jobHeader("Data Analyst / Project Coordinator (Remote Intern)", "", "Feb 2026 \u2013 Present"),
      orgLine("JTS Jobhouse Training Services UG (haftungsbeschr\u00e4nkt) \u2013 Potsdam, Germany"),
      bullet("Designed and built AI-driven automation tools \u2014 including a Claude API-powered retrieval-augmented Q&A system and a Make.com/ChatGPT scope-risk flagging workflow \u2014 to support program and project operations (see Key Projects)."),
      bullet("Analyze participant data and feedback to generate performance reports and dashboards for stakeholders, informing program and curriculum improvements."),
      bullet("Coordinate project activities across distributed teams, ensuring timely delivery of training program milestones."),
      bullet("Maintain project calendar and track progress using Agile workflows; maintain the risk register and support resource-level tracking."),

      jobHeader("Official Program Representative (Field-Based)", "", "May 2026 \u2013 Present"),
      orgLine("VerdexLab Government Programme Delivery Centre \u2013 Potsdam, Germany (Nigeria Office)"),
      bullet("Present the programme's curriculum, delivery frameworks, and live-challenge methodology directly to Directors-General, Heads of Departments, and other senior decision-makers \u2014 translating complex training content for executive audiences."),
      bullet("Authorised field representative for a project management training programme delivered to senior sub-national government officials (Potsdam Executive Programme Delivery Lab)."),
      bullet("Lead marketing and outreach efforts for the programme, including direct promotion to government institutions and senior public sector leaders."),
      bullet("Represent VerdexLab in introductory meetings with Nigerian government institutions, driving brand awareness and participant acquisition."),

      jobHeader("Manager", "", "Jan 2024 \u2013 Jan 2026"),
      orgLine("D\u2019DON Residence and Apartments"),
      bullet("Managed daily operations, staff coordination, and service delivery across the facility."),
      bullet("Implemented quantitative staffing models to optimize resource allocation based on occupancy data."),
      bullet("Generated performance reports and dashboards to monitor business operations and support management decisions."),
      bullet("Ensured compliance with safety, service, and operational standards."),

      jobHeader("Executive Director / Co-founder", "", "2023 \u2013 Present"),
      orgLine("Tecviz Ltd."),
      bullet("Lead cross-functional teams in developing web, app, and AI-powered digital solutions."),
      bullet("Participate in contract scoping and track project variations against initial deliverables."),
      bullet("Manage stakeholder expectations and ensure alignment of project goals with business objectives."),

      jobHeader("Operations & Maintenance Engineer", "", "Aug 2022 \u2013 Nov 2023"),
      orgLine("ICE Solar Commercial Power"),
      bullet("Monitored and analyzed system performance data to optimize efficiency and reduce downtime."),
      bullet("Produced detailed technical and operational reports for stakeholders and management teams."),
      bullet("Identified system risks and resolved performance issues proactively."),

      sectionHeading("Key Projects"),

      jobHeader("Smart Q&A System (RAG) \u2014 Internal Knowledge Assistant", "", "2026"),
      orgLine("Tools: Python, Claude API, Google Sheets API, Google Drive API   |   GitHub: github.com/your-username/smart-qa-rag-system"),
      bullet("Built a Retrieval-Augmented Generation (RAG) assistant that automatically answers new-employee questions using a company handbook stored in Google Sheets."),
      bullet("Developed a Python agent to detect new questions, retrieve relevant context from the knowledge base, and generate accurate answers via the Claude API."),
      bullet("Engineered prompts that constrain Claude to answer only from retrieved context, reducing hallucinations and ensuring company-specific accuracy."),
      bullet("Integrated Google Sheets API and Google Drive API to deliver a lightweight, no-database knowledge repository and submission interface, cutting repetitive onboarding questions to managers and HR."),

      jobHeader("AI Scope Creep Tracker \u2014 Automated Project Risk Flagging", "", "2026"),
      orgLine("Tools: Google Sheets, Make.com, ChatGPT (gpt-4o-mini)   |   GitHub: github.com/your-username/ai-scope-creep-tracker"),
      bullet("Built an automation that compares incoming client requests against an approved project scope document and flags work that falls outside the contract (\u201cscope creep\u201d) in real time."),
      bullet("Designed a three-module Make.com workflow (Google Sheets trigger \u2192 OpenAI completion \u2192 Google Sheets update) to analyze each new client request automatically."),
      bullet("Wrote system and user prompts instructing the AI to act as a project-management risk-mitigation agent, returning structured STATUS / REASONING / RECOMMENDED ACTION output."),
      bullet("Automated a task that traditionally requires manual PM review, giving project coordinators an instant, documented first read on billable scope changes."),

      jobHeader("Sales Performance Analysis & Interactive Dashboard (Excel)", "", "Feb 2026"),
      orgLine("GitHub: github.com/your-username/sales-performance-dashboard"),
      bullet("Cleaned and transformed raw transactional data into structured datasets."),
      bullet("Built KPIs including Revenue, Profit, COGS, and Customer Metrics."),
      bullet("Developed PivotTable-based analysis to identify top-performing products and regions."),
      bullet("Designed an interactive Excel dashboard with slicers for dynamic business insights, demonstrating the ability to build project tracking tools."),

      jobHeader("Customer Service Training Program (Data-Driven Design)", "", "Jul 2024"),
      bullet("Defined project scope, learning outcomes, and trainee performance objectives."),
      bullet("Incorporated feedback analysis and evaluation frameworks to measure training effectiveness \u2014 core instructional design skills directly applicable to curriculum development."),
      bullet("Developed marketing and recruitment strategy for trainee acquisition."),

      sectionHeading("Technical & AI Skills"),
      skillLine("Generative AI", "Claude API, ChatGPT/OpenAI API (gpt-4o-mini), Retrieval-Augmented Generation (RAG), AI agents, prompt engineering"),
      skillLine("Automation & Integration", "Make.com, Google Sheets API, Google Drive API, workflow automation"),
      skillLine("Programming", "Python (Pandas, NumPy), SQL, Basic HTML/JavaScript"),
      skillLine("Data & Reporting", "Microsoft Excel (Advanced, PivotTables, Dashboards), Power BI, DAX"),
      skillLine("Data Techniques", "KPI development, data cleaning, performance metrics, EDA"),
      skillLine("Project Tools", "Agile workflows, risk registers, milestone tracking, progress reporting"),
      skillLine("Training & Delivery", "Curriculum presentation, stakeholder communication, technical documentation, remote monitoring systems"),

      sectionHeading("Education"),
      para("Federal University of Petroleum Resources, Effurun, Delta State", { bold: true }),
      para("Bachelor of Engineering (B.Eng) \u2013 Petroleum Engineering (Second Class Upper)"),

      sectionHeading("Certifications"),
      bullet("Data Analytics \u2013 TS Academy (2026)"),
      bullet("Project Management \u2013 JobHouse Global Limited (2023)"),
      bullet("Advanced Solar & Inverter Systems \u2013 Delta State Innovation Hub (2022)"),

      sectionHeading("Languages"),
      para("English \u2013 Advanced (Professional working proficiency)     German \u2013 Beginner"),

      sectionHeading("Additional Information"),
      bullet("Project Management Body: Affiliate-level knowledge (PM certification completed)."),
      bullet("Hands-on builder of applied Generative AI tools (RAG systems, AI agent workflows) with strong interest in translating this experience into instructional content for future AI engineers."),
      bullet("Interests: AI/ML instructional design, project management systems, data science, engineering innovation."),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("./output/Tailored_Resume.docx", buf);
  console.log("done");
});
