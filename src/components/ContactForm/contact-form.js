'use client';
// For more help visit https://formspr.ee/react-help
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_FORM);

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 border-1 border-gray-200 bg-gray-200 rounded-md p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="h-8 rounded-md bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active]"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="h-8 rounded-md bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active]"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="company"
          >
            Company
          </label>
          <input
            className="h-8 rounded-md bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active]"
            id="company"
            name="company"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="phone-number"
          >
            Phone Number
          </label>
          <input
            className="h-8 rounded-md bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active]"
            id="phone-number"
            name="phone-number"
          />
        </div>
        <div className="col-span-full flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="message"
          >
            Inquiry
          </label>
          <textarea
            className="h-20 resize-y py-2 bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active] rounded-md"
            id="message"
            name="message"
            required
          />
        </div>

        <div className="col-span-full flex flex-row-reverse gap-x-3">
          <button
            className="cursor-pointer rounded-md bg-[--color-blue-600] px-8 py-4 text-sm font-medium leading-4 text-white transition-colors duration-200 hover:bg-[--color-primary-active] focus-visible:bg-[--color-primary-active] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[--color-highlight]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
  );
}
