import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [why, setWhy] = useState('');  // Changed from artists
  const [inspired, setInspired] = useState('');      // Changed from belief
  const [website, setWebsite] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xpwanryn', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form fields here if needed
        setName('');
        setHandle('');
        setEmail('');
        setProject('');
        setWhy('');
        setInspired('');
        setWebsite('');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="mt-6">

        <p className="text-sm pt-4">
          Asylum Ventures is an early-stage venture firm celebrating the creative act of making startups. We believe founders are artists, not assets.</p>
        <p className="text-sm pt-4">
          Send us a message:
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 contact-form" action="https://formspree.io/f/xpwanryn" method="POST">
        <div className="py-4">
          <label htmlFor="name" className="block text-sm mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 text-sm border border-gray-400 focus:border-gray-600 focus:ring-0 bg-transparent"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="py-4">
          <label htmlFor="handle" className="block text-sm mb-2">Twitter or github handle</label>
          <input
            type="text"
            id="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full p-4 text-sm focus:border-gray-400 border border-gray-400 focus:ring-0"
            placeholder="@username"
          />
        </div>
        <div className="py-4">
          <label htmlFor="email" className="block text-sm mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-sm focus:border-gray-400 border border-gray-400 focus:ring-0"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="py-4">
          <label htmlFor="project" className="block text-sm mb-2">What's up? Tell us about your project.</label>
          <textarea
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            rows={8}
            className="w-full p-4 text-sm border border-gray-400 focus:border-gray-600 focus:ring-0 bg-transparent"
            placeholder=""
          ></textarea>
        </div>
        <div className="py-4">
          <label htmlFor="why" className="block text-sm mb-2">Why are you doing this?</label>
          <textarea
            id="why"
            name="why"
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            rows={8}
            className="w-full p-4 text-sm border border-gray-400 focus:border-gray-600 focus:ring-0 bg-transparent"
            placeholder=""
          ></textarea>
        </div>
        <div className="py-4">
          <label htmlFor="inspired" className="block text-sm mb-2">What inspires you?</label>
          <textarea
            id="inspired"
            name="inspired"
            value={inspired}
            onChange={(e) => setInspired(e.target.value)}
            rows={8}
            className="w-full p-4 text-sm border border-gray-400 focus:border-gray-600 focus:ring-0 bg-transparent"
            placeholder=""
          ></textarea>
        </div>
        <div className="py-4">
          <label htmlFor="website" className="block text-sm mb-2">Link to your company website, memo, or something else</label>
          <input
            type="text"
            id="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-4 text-sm border border-gray-400 focus:border-gray-600 focus:ring-0 bg-transparent"
            placeholder="http://..."
          />
        </div>
        <div className="py-4">
          <button
            type="submit"
            className="w-full flex justify-center py-4 border border-gray-400 text-sm text-gray-800 hover:bg-gray-50 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500 bg-transparent"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
      
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-100 text-sm text-green-700">
          Thank you, appreciate you taking the time.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 text-sm text-red-700">
          Error. Please try again.
        </div>
      )}

      <div className="border border-gray-400 mt-6 mb-24 p-2 sm:p-2 md:py-4 lg:py-4 cursor-pointer transition-all duration-300 hover:bg-white hover:bg-opacity-20" onClick={() => window.location.href = 'mailto:hello@asylum.vc'}>
        <div className="flex justify-center">
          <p className="text-sm">
            Or just email us directly: <span className="custom-link">hello@asylum.vc</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;