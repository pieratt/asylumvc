import React, { useState, useEffect } from 'react';

// Founder data
const founderData = {
  nick: {
    name: "Nick Chirls",
    handle: "@nchirls",
    email: "nick@asylum.vc",
    project: "I'm working on a new AI-powered VC firm that uses machine learning to identify promising startups before they even know they're startups.",
    artists: "David Lynch, Yayoi Kusama, Banksy",
    belief: "I believe that the future of venture capital is in identifying and nurturing potential founders before they even have an idea. We're building tools to spot patterns in human behavior that indicate entrepreneurial potential.",
    checkboxes: {
      chronic: true,
      uncomfortable: true,
      optimism: true,
      impossible: false,
      corporateSpeak: false,
      businessAttire: false,
      rejection: true,
      dissatisfied: true,
    }
  },
  jon: {
    name: "Jon Wu",
    handle: "@jonwu_",
    email: "jon@asylum.vc",
    project: "I'm developing a decentralized platform that reimagines how creative content is produced, distributed, and monetized in the Web3 era.",
    artists: "Satoshi Nakamoto, Vitalik Buterin, Beeple",
    belief: "I believe that blockchain technology will revolutionize not just finance, but every aspect of how we create and share value. We're just scratching the surface of its potential.",
    checkboxes: {
      chronic: false,
      uncomfortable: true,
      optimism: true,
      impossible: true,
      corporateSpeak: false,
      businessAttire: false,
      rejection: true,
      dissatisfied: false,
    }
  },
  mackenzie: {
    name: "Mackenzie Regent",
    handle: "@mackenzieregent",
    email: "mackenzie@asylum.vc",
    project: "I'm building an AI-driven platform that personalizes education at scale, adapting to each learner's unique cognitive style and pace.",
    artists: "Ada Lovelace, Grace Hopper, Janelle Monáe",
    belief: "I believe that the current education system is fundamentally broken and that technology can create a more equitable, effective, and engaging learning experience for everyone.",
    checkboxes: {
      chronic: true,
      uncomfortable: false,
      optimism: true,
      impossible: true,
      corporateSpeak: false,
      businessAttire: false,
      rejection: true,
      dissatisfied: true,
    }
  }
};

const ContactForm: React.FC<{ activeFounder: string | null }> = ({ activeFounder }) => {
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
  const [customMessage, setCustomMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isFounderSelected = activeFounder !== null;

  useEffect(() => {
    if (activeFounder) {
      const data = founderData[activeFounder];
      setName(data.name);
      setHandle(data.handle);
      setEmail(data.email);
      setProject(data.project);
      setArtists(data.artists);
      setBelief(data.belief);
      setCheckboxes(data.checkboxes);
      setCustomMessage(`Send ${data.name} a Message`);
    } else {
      setName('');
      setHandle('');
      setEmail('');
      setProject('');
      setArtists('');
      setBelief('');
      setCheckboxes({
        chronic: false,
        uncomfortable: false,
        optimism: false,
        impossible: false,
        corporateSpeak: false,
        businessAttire: false,
        rejection: false,
        dissatisfied: false,
      });
      setCustomMessage('');
    }
  }, [activeFounder]);

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
        body: JSON.stringify({ name, handle, email, checkboxes, project, artists, belief, customMessage }),
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
    <div className="w-full max-w-4xl mx-auto mb-12 sm:px-4 md:px-8 lg:px-12">
      <form onSubmit={handleSubmit} className="border border-gray-500 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full border-b md:border-r border-gray-500">
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
            <div className="p-6">
              <p className="text-sm mb-4">Check all that apply:</p>
              {Object.entries(checkboxes).map(([key, value], index, array) => (
                <div key={key} className={`flex items-center p-4 border-b border-gray-500`}>
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value}
                    onChange={handleCheckboxChange}
                    className="w-6 h-6 border-gray-500 focus:ring-0 focus:border-gray-500"
                  />
                  <label htmlFor={key} className="ml-2 text-sm">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full ">
            <div className="p-6 border-b border-gray-500">
              <label htmlFor="project" className="block text-sm mb-2">favorite quote</label>
              <textarea
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                rows={8}
                className="w-full p-4 text-sm border-gray-500 focus:border-gray-500 focus:ring-0"
                placeholder="What the really great artists do is they're entirely themselves. They've got their own vision, their own way of fracturing reality, and then if it's authentic and true, you will feel it in your nerve endings. -David Foster Wallace"
              ></textarea>
            </div>
            <div className="p-6 border-b border-gray-500">
              <label htmlFor="artists" className="block text-sm mb-2">favorite artists in your field</label>
              <textarea
                id="artists"
                value={artists}
                onChange={(e) => setArtists(e.target.value)}
                rows={8}
                className="w-full p-4 text-sm border-gray-500 focus:border-gray-500 focus:ring-0"
                placeholder="

"
              ></textarea>
            </div>
            <div className="p-6">
              <label htmlFor="belief" className="block text-sm mb-2">how would you change the world?</label>
              <textarea
                id="belief"
                value={belief}
                onChange={(e) => setBelief(e.target.value)}
                rows={8}
                className="w-full p-4 text-sm border-gray-500 focus:border-gray-500 focus:ring-0"
                placeholder="By getting VCs to act like art galleries not hedge funds."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Custom message input - only shown for founder contact forms */}
        {isFounderSelected && (
          <div className="p-6 border-t border-gray-500">
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-4 text-sm focus:border-gray-500 focus:ring-0"
              rows={6}
              placeholder="Write your message here..."
            ></textarea>
          </div>
        )}

        <div className="p-6 border-t border-gray-500">
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
          Thank you for your submission! We'll be in touch soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700">
          There was an error submitting your form. Please try again later.
        </div>
      )}
      {isFounderSelected && (
        <div className="">
        </div>
      )}
      <div className="border border-gray-500 mt-6 rounded-lg p-2 sm:p-2 md:p-6 lg:p-6">
        <div className="flex ">
          <div className="w-1/4 pr-4">
            <h2 className="text-sm">Contact</h2>
          </div>
          <div className="w-3/4">
            <p className="text-sm">
              We're always looking for exceptional founders who are building something truly innovative.
              If you think your project aligns with our vision, we'd love to hear from you.
              Fill out the form below, and let's start a conversation about how we can support your journey.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-500 mt-6 rounded-lg p-2 sm:p-2 md:p-6 lg:p-6 cursor-pointer transition-all duration-300 hover:bg-white hover:bg-opacity-20" onClick={() => window.location.href = 'mailto:hello@asylum.vc'}>
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