import MonochromeMergeClient from "./client";

export default function MonochromeMergePage() {
  return (
    <>
      <section className="title">
        <h1>Monochrome Merge</h1>
        <p>Merge a light and dark image into a single monochrome image.</p>
      </section>
      <section className="monochrome-merge-tool-section">
        <MonochromeMergeClient />
      </section>
    </>
  );
}
