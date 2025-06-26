import DiscoveryForm from '@/components/FormDiscovery';

export default function Contact() {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
      <div className="flex flex-col gap-y-1.5">
        <h1 className="font-extrabold text-4xl mb-4">
          Discovery Questionnaire
        </h1>
        <p>We believe every great project starts with a conversation.</p>
        <p>
          To kick things off, we&apos;d love for you to complete this brief
          discovery questionnaire. It&apos;s designed to help us dive deep into
          your project&apos;s needs, understand your aspirations, and ensure
          we&apos;re aligned from day one.
        </p>
        <p>
          <strong>Let&apos;s build something amazing together!</strong>
        </p>
      </div>
      <div className="flex flex-col gap-y-1.5">
        <DiscoveryForm />
      </div>
    </div>
  );
}
