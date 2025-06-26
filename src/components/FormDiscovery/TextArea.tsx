export default function TextArea( { label, question }: { label: string, question: string } ) {
	if ( !label || !question ) return null;
	return (
    <div className="col-span-full flex flex-col gap-y-1.5">
      <label
        className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
        htmlFor={label}
      >
        {question}
      </label>
      <textarea
        className="h-20 resize-y py-2 bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active] rounded-md"
        id={label}
        name={label}
        required
      />
    </div>
  );
}