'use client';
// For more help visit https://formspr.ee/react-help
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import TextArea from './TextArea';

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_DISCOVERY;

const REQUIRED = {
  name: 'Add your name so I know who I’m replying to.',
  email: 'Add an email address — it’s the only way I can reply.',
};

const QUESTIONS = [
  {
    label: 'goal',
    question:
      'What does your organisation do, and what do you want this project to achieve?',
  },
  {
    label: 'currentState',
    question:
      'If this replaces an existing site or brand, what prompted the change?',
  },
  {
    label: 'examples',
    question: 'Any sites you admire? Links, and what you like about them.',
  },
  {
    label: 'features',
    question: 'Does the project need any specific features or functionality?',
  },
  {
    label: 'content',
    question:
      'Do you already have content — images, video, copy, logo — or does it need making?',
  },
  { label: 'timeline', question: 'Any timeline, milestones or deadlines?' },
  { label: 'budget', question: 'What budget range are you working with?' },
];

export default function DiscoveryForm() {
  // Hooks must run unconditionally, so a placeholder id is passed when the
  // form is unconfigured; useForm throws on an undefined id, and this page is
  // prerendered at build time, so that throw would fail the whole build. The
  // unconfigured case is handled in render, below.
  const [state, handleSubmit] = useForm(FORM_ID || 'unconfigured');
  const [errors, setErrors] = useState({});

  const onSubmit = (event) => {
    const form = event.currentTarget;
    const found = {};
    for (const [field, message] of Object.entries(REQUIRED)) {
      if (!form.elements[field]?.value?.trim()) found[field] = message;
    }
    const email = form.elements.email?.value?.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      found.email = 'That email address doesn’t look complete.';
    }
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      event.preventDefault();
      form.elements[firstInvalid]?.focus();
      return;
    }
    handleSubmit(event);
  };

  const fieldProps = (field) => ({
    id: field,
    name: field,
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    onBlur: () =>
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }),
  });

  const Error = ({ field }) =>
    errors[field] ? (
      <p className="field-error" id={`${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  // A form that cannot submit must say so, not fail silently on send.
  if (!FORM_ID) {
    return (
      <div className="facts p-8" role="status">
        <h2 className="t-display t-display--sm">
          The questionnaire isn&rsquo;t connected.
        </h2>
        <p className="t-prose mt-3 text-ink-muted">
          Something on my end isn&rsquo;t configured, so this form can&rsquo;t
          send right now. Please reach out through whichever channel you found
          me on — I don&rsquo;t want to lose your answers.
        </p>
      </div>
    );
  }

  return (
    <>
      <p aria-live="polite" className="sr-only">
        {state.succeeded
          ? 'Questionnaire sent. Niko will reply personally.'
          : state.submitting
            ? 'Sending your answers.'
            : Object.keys(errors).length
              ? `${Object.keys(errors).length} field${
                  Object.keys(errors).length === 1 ? '' : 's'
                } need attention.`
              : ''}
      </p>

      {state.succeeded ? (
        <div className="facts p-8">
          <h2
            className="t-display t-display--sm"
            tabIndex={-1}
            ref={(node) => node?.focus()}
          >
            Got it — thank you.
          </h2>
          <p className="t-prose mt-3 text-ink-muted">
            That&rsquo;s genuinely useful. I&rsquo;ll read it properly and come
            back to you with questions and a sense of what the work looks like.
          </p>
        </div>
      ) : (
        <form
          className="facts grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-8"
          onSubmit={onSubmit}
          noValidate
        >
          <p className="t-meta text-ink-muted sm:col-span-2">
            Only your name and email are required. Answer as much or as little
            of the rest as is useful.
          </p>

          <div className="field">
            <label className="t-label" htmlFor="name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input type="text" autoComplete="name" {...fieldProps('name')} />
            <Error field="name" />
          </div>

          <div className="field">
            <label className="t-label" htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input type="email" autoComplete="email" {...fieldProps('email')} />
            <Error field="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="field-error"
            />
          </div>

          <div className="field">
            <label className="t-label" htmlFor="company">
              Organisation
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
            />
          </div>

          <div className="field">
            <label className="t-label" htmlFor="phone-number">
              Phone{' '}
              <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="phone-number"
              name="phone-number"
              type="tel"
              autoComplete="tel"
            />
          </div>

          <div className="field sm:col-span-2">
            <label className="t-label" htmlFor="current-site">
              Current website{' '}
              <span className="normal-case tracking-normal">(if there is one)</span>
            </label>
            <input
              id="current-site"
              name="current-site"
              type="url"
              inputMode="url"
              placeholder="https://"
            />
          </div>

          {QUESTIONS.map((q) => (
            <TextArea key={q.label} label={q.label} question={q.question} />
          ))}

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="t-meta text-ink-muted">
              <span aria-hidden="true">*</span> Required. I read every response
              myself.
            </p>
            <button
              className="action"
              type="submit"
              disabled={state.submitting}
              aria-disabled={state.submitting}
            >
              {state.submitting ? 'Sending…' : 'Send questionnaire'}
              {!state.submitting && <span className="arrow">→</span>}
            </button>
          </div>

          {state.errors && state.errors.length > 0 && (
            <p className="field-error sm:col-span-2" role="alert">
              Something went wrong sending that. Check the fields above and try
              again.
            </p>
          )}
        </form>
      )}
    </>
  );
}
