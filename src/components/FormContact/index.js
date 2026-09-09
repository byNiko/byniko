'use client';
// For more help visit https://formspr.ee/react-help
import { useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const REQUIRED = {
  name: 'Add your name so I know who I’m replying to.',
  email: 'Add an email address — it’s the only way I can reply.',
  message: 'Tell me a little about what you’re making.',
};

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM;

export default function ContactForm() {
  // Hooks must run unconditionally, so the form id is always passed; the
  // unconfigured case is handled in render, below.
  const [state, handleSubmit] = useForm(FORM_ID || 'unconfigured');
  // Native validation bubbles render in a system face outside the design and
  // cannot be styled, so the form validates itself and speaks in its own voice.
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validate = (form) => {
    const found = {};
    for (const [field, message] of Object.entries(REQUIRED)) {
      const value = form.elements[field]?.value?.trim();
      if (!value) found[field] = message;
    }
    const email = form.elements.email?.value?.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      found.email = 'That email address doesn’t look complete.';
    }
    return found;
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;
    const found = validate(form);
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
        <h2 className="t-display text-[1.5rem]" style={{ fontStretch: '104%' }}>
          The form isn&rsquo;t connected.
        </h2>
        <p className="t-prose mt-3 text-ink-muted">
          Something on my end isn&rsquo;t configured, so this form can&rsquo;t
          send right now. Please reach out through whichever channel you found
          me on — I don&rsquo;t want to lose your message.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mounted for the life of the component, across both branches, so the
          confirmation is announced rather than swapped in silently. */}
      <p aria-live="polite" className="sr-only">
        {state.succeeded
          ? 'Message sent. Niko will reply personally.'
          : state.submitting
            ? 'Sending your message.'
            : Object.keys(errors).length
              ? `${Object.keys(errors).length} field${
                  Object.keys(errors).length === 1 ? '' : 's'
                } need attention.`
              : ''}
      </p>

      {state.succeeded ? (
        <div className="facts p-8">
          <h2
            className="t-display text-[1.5rem]"
            style={{ fontStretch: '104%' }}
            tabIndex={-1}
            ref={(node) => node?.focus()}
          >
            Got it.
          </h2>
          <p className="t-prose mt-3 text-ink-muted">
            Thanks — your message is with me. I&rsquo;ll read it myself and
            reply personally, usually within a couple of working days.
          </p>
        </div>
      ) : (
      <form
        ref={formRef}
        className="facts grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-8"
        onSubmit={onSubmit}
        noValidate
      >
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
            placeholder="Gallery, nonprofit, business…"
          />
        </div>

        <div className="field">
          <label className="t-label" htmlFor="phone-number">
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="phone-number"
            name="phone-number"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <div className="field sm:col-span-2">
          <label className="t-label" htmlFor="message">
            What are you making? <span aria-hidden="true">*</span>
          </label>
          <textarea
            rows={6}
            placeholder="What the organisation does, what the site needs to do, and any timeline you have in mind."
            {...fieldProps('message')}
          />
          <Error field="message" />
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta text-ink-muted">
            <span aria-hidden="true">*</span> Required. I read every message
            myself.
          </p>
          <button
            className="action"
            type="submit"
            disabled={state.submitting}
            aria-disabled={state.submitting}
          >
            {state.submitting ? 'Sending…' : 'Send message'}
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
