import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [artists, setArtists] = useState('');
  const [belief, setBelief] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    chronic: false,
    uncomfortable: false,
    optimism: false,
    impossible: false,
    corporateSpeak: false,
    businessAttire: false,
    rejection: false,
    dissatisfied: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

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
        body: JSON.stringify({ name, handle, email, checkboxes, project, artists, belief }),
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
      <div className="text-center text-sm">
        CONTACT
      </div>
      <blockquote className="text-sm italic inline">
        "What the really great artists do is they're entirely themselves. They've got their own vision, their own way of fracturing reality, and then if it's authentic and true, you will feel it in your nerve endings."
        <span className="not-italic"> - David Foster Wallace</span>
      </blockquote>

      <p className="text-sm text-justify py-4">
        We believe the best founders are more artist than they are business exec. The company is their authentic expression of self, itself a form of beauty. 
        Asylum Ventures is an early-stage venture firm celebrating the creative act of building startups. Venture Capital has become an asset class, and the suits have arrived. We believe founders are artists, not assets. We practice a craft - we don't run a bank.
        If this speaks to you, get in touch and join our mission to make startups weird again.
      </p>

      <form onSubmit={handleSubmit} className="border border-gray-500 rounded-lg">
        <div className="border-b border-gray-500">
          <div className="p-6 border-b border-gray-500">
            <label htmlFor="name" className="block text-sm mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full focus:border-gray-500 focus:ring-0"
              required
            />
          </div>
          <div className="p-6">
            <label htmlFor="handle" className="block text-sm mb-2">Twitter or github handle</label>
            <input
              type="text"
              id="handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full focus:border-gray-500 focus:ring-0"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row border-b border-gray-500">
          <div className="w-full md:w-1/2 md:border-r border-gray-500">
            <p className="font-medium p-6 border-b border-gray-500">Check all that apply:</p>
            {Object.entries(checkboxes).map(([key, value], index, array) => (
              <div key={key} className="border-b border-gray-500 last:border-b-0">
                <div className="flex items-center p-6">
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value}
                    onChange={handleCheckboxChange}
                    className="border-gray-500 focus:ring-0 focus:border-gray-500"
                  />
                  <label htmlFor={key} className="ml-2 text-sm">
                    {key.toUpperCase().replace(/_/g, ' ')}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 space-y-0">
            <div className="p-6 border-b border-gray-500">
              <label htmlFor="project" className="block text-sm mb-2">IF YOU'RE STARTING A PROJECT NOW OR THINKING ABOUT ONE - TELL US MORE!</label>
              <textarea
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                rows={4}
                className="w-full border-gray-500 focus:border-gray-500 focus:ring-0"
              ></textarea>
            </div>
            <div className="p-6 border-b border-gray-500">
              <label htmlFor="artists" className="block text-sm mb-2">FAVORITE ARTISTS? BONUS POINTS IF THEY ARE IN YOUR FIELD.</label>
              <textarea
                id="artists"
                value={artists}
                onChange={(e) => setArtists(e.target.value)}
                rows={4}
                className="w-full border-gray-500 focus:border-gray-500 focus:ring-0"
              ></textarea>
            </div>
            <div className="p-6">
              <label htmlFor="belief" className="block text-sm mb-2">WHAT DO YOU BELIEVE THAT NO ONE ELSE BELIEVES, AND WHAT HAVE YOU DONE TO SHARE IT?</label>
              <textarea
                id="belief"
                value={belief}
                onChange={(e) => setBelief(e.target.value)}
                rows={4}
                className="w-full border-gray-500 focus:border-gray-500 focus:ring-0"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-500">
          <label htmlFor="email" className="block text-sm mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full focus:border-gray-500 focus:ring-0"
            required
          />
        </div>

        <div className="p-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-gray-500 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
      
      {submitStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700">
          Thank you for your submission! We'll be in touch soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700">
          There was an error submitting your form. Please try again later.
        </div>
      )}
    </div>
  );
};

export default ContactForm;