import Link from "next/link";
export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="content-page">
      <header className="page-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </header>
      <div className="page-body">{children}</div>
      <aside className="inquiry-banner">
        <div>
          <h2>Send us your requirements.</h2>
          <p>
            Tell us what you want to build, improve, or connect. We’ll discuss
            the scope and next steps with you.
          </p>
        </div>
        <Link className="button-primary" href="/contact">
          Discuss your project ↗
        </Link>
      </aside>
    </div>
  );
}
