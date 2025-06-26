'use client';
// For more help visit https://formspr.ee/react-help
import { useForm } from '@formspree/react';
import TextArea from './TextArea';
import './style.css';
import { div } from 'framer-motion/client';

export default function DiscoveryForm() {

  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_DISCOVERY);
  if (state.submitting) {
    return <p>Submitting…</p>;
  }

  if (state.succeeded) {
    return (
      <div className="p-8 rounded-md bg-gray-200">
        <div className="prose prose-2xl prose-blue">
          <h2>We got it!</h2>
          <p>Thank you for submitting your questionnaire!</p>
          <p>
            This information is crucial for us to truly understand your vision
            and begin crafting the perfect solution for you.
          </p>
          <p>
            We&apos;ll be in touch shortly to discuss the next exciting steps!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-1 border-gray-200 bg-gray-200 rounded-md p-8">
      <p className='mb-5 leading-tight text-center'>
        <small>
          We need your contact info to get back to you.<br/> The rest of the form is
          optional.{' '}
        </small>
      </p>
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="name"
          >
            Name<sup>*</sup>
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
            Email<sup>*</sup>
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
            Company<sup>*</sup>
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
        <div className="flex flex-col gap-y-1.5">
          <label
            className="block font-[family-name:--font-family-display] text-sm font-medium text-[--color-text-default]"
            htmlFor="current-site"
          >
            Company Website
          </label>
          <input
            className="h-8 rounded-md bg-white bg-[size:1.5em_1.5em] bg-[position:right_0.5rem_center] bg-no-repeat px-3 pe-10 text-sm text-[--color-text-default] outline-none ring-1 ring-inset ring-[--color-border-default] placeholder:text-[--color-text-muted] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-[--color-highlight] focus-visible:ring-[1.5px] focus-visible:ring-inset focus-visible:ring-[--color-border-active]"
            id="current-site"
            name="current-site"
          />
        </div>
        <TextArea
          label="goal"
          question="What does your business do, and what is the primary purpose or goal you hope to achieve with this project?"
        />

        <TextArea
          label="currentState"
          question="If we will be replacing a current website or re-branding, what prompted your desire for a new ones?"
        />
        <TextArea
          label="examples"
          question="If you have any examples of websites you admire, please provide links and explain why you like them."
        />
        <TextArea
          label="features"
          question="Does the project require any specific features or functionality? If so, please describe them."
        />
        <TextArea
          label="content"
          question="Do you already have content for the project (images, video, copy, logo, etc) or do you need to create it? Please describe the content you have or would like to create."
        />
        <TextArea
          label="timeline"
          question="Please provide a timeline for the project, including milestones and deadlines."
        />
        <TextArea
          label="budget"
          question="What is your estimated budget for this website project?"
        />
        <div className="col-span-full flex flex-row-reverse gap-x-3">
          <button
            className="cursor-pointer rounded-md bg-blue-400 hover:bg-blue-600 px-8 py-4 text-sm font-medium leading-4 text-white transition-colors duration-200 hover:bg-[--color-primary-active] focus-visible:bg-[--color-primary-active] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[--color-highlight]"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
