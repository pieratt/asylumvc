import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
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
                body: JSON.stringify({ name, handle, checkboxes, project, artists, belief }),
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
    <div className="w-full max-w-4xl mx-auto font-times">
      <blockquote className="text-xl italic text-center mb-8 w-full">
        "What the really great artists do is they're entirely themselves. They've got their own vision, their own way of fracturing reality, and then if it's authentic and true, you will feel it in your nerve endings."
        <footer>-David Foster Wallace</footer>
      </blockquote>

      <p className="mb-8">
        We believe the best founders are more artist than they are business exec. The company is their authentic expression of self, itself a form of beauty. 
        Asylum Ventures is an early-stage venture firm celebrating the creative act of building startups. Venture Capital has become an asset class, and the suits have arrived. We believe founders are artists, not assets. We practice a craft - we don't run a bank.
        If this speaks to you, get in touch and join our mission to make startups weird again.
      </p>

      <div className="border border-gray-300 p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4 border border-gray-300 p-4">
              <div className="border border-gray-300 p-3">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300"
                  required
                />
              </div>
              <div className="border border-gray-300 p-3">
                <label htmlFor="handle" className="block text-sm font-medium">Twitter or github handle</label>
                <input
                  type="text"
                  id="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300"
                />
              </div>
              <div className="border border-gray-300 p-3 space-y-2">
                {Object.entries(checkboxes).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={value}
                      onChange={handleCheckboxChange}
                      className="border border-gray-300"
                    />
                    <label htmlFor={key} className="ml-2 text-sm">
                      {key.toUpperCase().replace(/_/g, ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 border border-gray-300 p-4">
              <div className="border border-gray-300 p-3">
                <label htmlFor="project" className="block text-sm font-medium">IF YOU'RE STARTING A PROJECT NOW OR THINKING ABOUT ONE - TELL US MORE!</label>
                <textarea
                  id="project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300"
                ></textarea>
              </div>
              <div className="border border-gray-300 p-3">
                <label htmlFor="artists" className="block text-sm font-medium">FAVORITE ARTISTS? BONUS POINTS IF THEY ARE IN YOUR FIELD.</label>
                <textarea
                  id="artists"
                  value={artists}
                  onChange={(e) => setArtists(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300"
                ></textarea>
              </div>
              <div className="border border-gray-300 p-3">
                <label htmlFor="belief" className="block text-sm font-medium">WHAT DO YOU BELIEVE THAT NO ONE ELSE BELIEVES, AND WHAT HAVE YOU DONE TO SHARE IT?</label>
                <textarea
                  id="belief"
                  value={belief}
                  onChange={(e) => setBelief(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
      
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