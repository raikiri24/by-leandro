import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Software project requirements guide",
  "Prepare a useful brief for custom software or an ERP: workflows, user roles, data, integrations, reports, budget, and acceptance criteria.",
  "/requirements",
);
const sections = [
  [
    "1. Describe the problem",
    "Explain what happens today and where work slows down. For example: warehouse staff record receiving in a spreadsheet, then accounting re-enters the same information to match supplier invoices. The goal is to record receiving once and let approved users access the same records.",
  ],
  [
    "2. Identify users and permissions",
    "List who creates, reviews, approves, and exports each record. In an HRIS, employees may request leave, managers may approve it, and HR may maintain balances. Specify whether branches or departments should be restricted to their own data.",
  ],
  [
    "3. Define the first release",
    "Separate essential features from later improvements. For a warehouse module, the first release might include item records, receiving, stock transfers, adjustments, and a stock-on-hand report. Barcode scanning or forecasting can be discussed as later milestones.",
  ],
  [
    "4. Map data and integrations",
    "Describe existing spreadsheets, databases, or systems that must be imported or connected. Include approximate record volumes, required fields, duplicate handling, and who validates migrated data. Share API documentation when available; do not send passwords or production credentials in an initial inquiry.",
  ],
  [
    "5. Specify reports and business rules",
    "Provide examples of the reports you use and explain how totals are calculated. For accounting, identify currency, approval thresholds, invoice numbering, and period closing rules. Your finance specialist should confirm accounting and statutory requirements. For HRIS, document leave policies and attendance rules.",
  ],
  [
    "6. Explain constraints",
    "Include your budget range, target date, hosting preference, number of users, and any devices or browsers the system must support. If a deadline is tied to a business event, explain which features must be ready for that date.",
  ],
  [
    "7. Agree on acceptance",
    "Describe how you will know each feature works. For example: an approved stock transfer decreases the source warehouse balance and increases the destination balance, records the user and time, and appears in the movement report. Identify who will test and approve the release.",
  ],
  [
    "8. Plan handover and maintenance",
    "Discuss training, documentation, deployment access, backup responsibilities, source code handover, and support after launch. Specify how bugs and future change requests will be handled in the project agreement.",
  ],
];
export default function Page() {
  return (
    <ContentPage
      eyebrow="PROJECT PLANNING"
      title="A useful brief starts with your workflow."
      intro="You do not need a technical specification to contact us. Use this guide to explain your request and make the first discussion more productive."
    >
      <div className="prose-content">
        {sections.map(([t, d]) => (
          <section key={t}>
            <h2>{t}</h2>
            <p>{d}</p>
          </section>
        ))}
        <h2>Copy this outline into your inquiry</h2>
        <ul>
          {[
            "Business and current process",
            "Problem and desired outcome",
            "Users and permissions",
            "Must-have features and reports",
            "Existing data and integrations",
            "Budget range and target date",
            "Acceptance criteria and support needs",
          ].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          Remove employee details, customer records, financial information, and
          other confidential data from examples before sending them.
        </p>
      </div>
    </ContentPage>
  );
}
