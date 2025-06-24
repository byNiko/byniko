import ContactForm from '@/components/ContactForm/contact-form';

export default function Contact() {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
      <div className="flex flex-col gap-y-1.5">
        <h1 className="font-extrabold text-4xl mb-4">Let&apos;s Connect!</h1>
        <p>We believe every great project starts with a conversation.</p>
        <p>
          Whether you&apos;re an artist with a bold vision, a small business looking
          to grow, or simply have a question about how we can help, we&apos;re
          genuinely excited to hear from you.
        </p>
        <p>
          We love transforming ideas into impactful digital experiences, and
          your unique goals are what drive our passion.
        </p>
      </div>
      <div className="flex flex-col gap-y-1.5">
        Send Us a Message
        <ContactForm />
      </div>
    </div>
  );
}
