export const services = [
  {
    slug: "software-development",
    title: "Custom software development",
    intro:
      "Applications built around your requirements, users, and business workflow.",
    features: [
      "Web applications, customer portals, and internal tools",
      "Existing application improvements and bug fixes",
      "API integrations, workflow automation, and reporting",
    ],
    detail:
      "Send the workflow you want to improve, who will use the application, and the result you need. We can scope a new product or work on an existing system. Screenshots, sample spreadsheets, and a list of current pain points help define the first release.",
  },
  {
    slug: "erp-development",
    title: "ERP systems",
    intro:
      "Connect HR, accounting, and warehouse operations in a system tailored to your business.",
    features: [
      "HRIS: employee records, attendance, leave requests, and approval workflows",
      "Accounting: invoicing, expenses, receivables, payables, and financial reports",
      "Warehouse: stock movements, purchasing, receiving, and inventory counts",
    ],
    detail:
      "An ERP can begin with one department and expand as your processes become clear. Define which records each module owns, how approvals work, and which information must move between departments. Payroll rules, accounting treatment, and statutory reporting need review by your responsible HR and finance specialists before implementation.",
  },
  {
    slug: "integrations-maintenance",
    title: "Integrations & maintenance",
    intro:
      "Improve the software you already use and connect the systems your team depends on.",
    features: [
      "Connect supported APIs and reduce repeated data entry",
      "Investigate bugs and improve existing features",
      "Plan deployment, data migration, and ongoing support",
    ],
    detail:
      "Share your current application, the issue or integration you need, and any available documentation. Access, third-party API limitations, data quality, hosting requirements, and support scope are assessed before a delivery plan is agreed.",
  },
] as const;
