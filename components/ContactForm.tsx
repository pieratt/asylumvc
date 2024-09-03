import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [artists, setArtists] = useState('');
  const [belief, setBelief] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, handle, email, project, artists, belief }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form fields here if needed
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
        <h2 className="text-sm">Contact</h2>
        <p className="text-sm">
          We're always looking for exceptional founders who are building something truly innovative. If you think your project aligns with our vision, we'd love to hear from you. Fill out the form below, and let's start a conversation about how we can support your journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="border border-gray-500 mt-6">
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="name" className="block text-sm mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 text-sm focus:border-gray-500 focus:ring-0"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="handle" className="block text-sm mb-2">Twitter or github handle</label>
          <input
            type="text"
            id="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full p-4 text-sm focus:border-gray-500 focus:ring-0"
            placeholder="@yourusername"
          />
        </div>
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="email" className="block text-sm mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-sm focus:border-gray-500 focus:ring-0"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="project" className="block text-sm mb-2">Tell us about your project</label>
          <textarea
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            rows={8}
            className="w-full p-4 text-sm border-gray-500 focus:border-gray-500 focus:ring-0"
            placeholder=""
          ></textarea>
        </div>
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="artists" className="block text-sm mb-2">What do you believe that no one else believes?</label>
          <textarea
            id="artists"
            value={artists}
            onChange={(e) => setArtists(e.target.value)}
            rows={8}
            className="w-full p-4 text-sm border-gray-500 focus:border-gray-500 focus:ring-0"
            placeholder=""
          ></textarea>
        </div>
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="belief" className="block text-sm mb-2">How would you change the world?</label>
          <textarea
            id="belief"
            value={belief}
            onChange={(e) => setBelief(e.target.value)}
            rows={8}
            className="w-full p-4 text-sm border-gray-500 focus:border-gray-500 focus:ring-0"
            placeholder=""
          ></textarea>
        </div>
        <div className="p-6 border-b border-gray-500">
          <label htmlFor="website" className="block text-sm mb-2">Please share a link to your company website, memo or pitch doc</label>
          <input
            type="text"
            id="website"
            value={project}  
            onChange={(e) => setProject(e.target.value)} 
            className="w-full p-4 text-sm focus:border-gray-500 focus:ring-0"
            placeholder="https://example.com"
          />
        </div>
        <div className="p-6">
          <button
            type="submit"
            className="w-full flex justify-center py-4 px-6 border border-gray-400 text-sm text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
      
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700">
          Thank you, we'll be in touch soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700">
          Error. Please try again later.
        </div>
      )}

      <div className="border border-gray-500 mt-6 p-2 sm:p-2 md:p-6 lg:p-6 cursor-pointer transition-all duration-300 hover:bg-white hover:bg-opacity-20" onClick={() => window.location.href = 'mailto:hello@asylum.vc'}>
        <div className="flex justify-center">
          <p className="text-sm">
            Or just email us direct: <span className="underline">hello@asylum.vc</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;