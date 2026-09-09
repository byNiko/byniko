export default function TextArea({
  label,
  question,
  rows = 4,
}: {
  label: string;
  question: string;
  rows?: number;
}) {
  if (!label || !question) return null;

  return (
    <div className="field sm:col-span-2">
      <label className="t-label" htmlFor={label}>
        {question}
      </label>
      <textarea id={label} name={label} rows={rows} />
    </div>
  );
}
