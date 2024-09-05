import React from 'react';

interface MainContentProps {
  handlePageChange: (page: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ handlePageChange }) => {
  return (
    <div className="w-full mx-auto">
      <div className="max-w-3xl mx-auto mb-12 text-sm text-justify">
        <div className="space-y-4">
          <p>To the </p>
          <p className="pl-12"> artists -</p>
          <p>Asylum Ventures is a new venture firm dedicated to the creative act of building companies. We raised $55 million to invest $1-2 million in early-stage founders practicing the art of making startups.</p>
          <div className="flex justify-center pt-3">
            <div className="w-2/5">
              <div className="grid grid-cols-7 grid-rows-6 h-28 text-sm text-center">
                <span className="col-start-1 row-start-3">O</span>
                <span className="col-start-2 row-start-3">r</span>
                <span className="col-start-3 row-start-2">i</span>
                <span className="col-start-4 row-start-3">g</span>
                <span className="col-start-5 row-start-3">i</span>
                <span className="col-start-6 row-start-3">n</span>
                <span className="col-start-7 row-start-3">s</span>
              </div>
            </div>
          </div>
          <p>In 2007, I was working as a junior trader at Lehman Brothers. I hated it - the dehumanizing culture, lack of creativity, and singular focus on transactions and money left me feeling uninspired and lost. I didn’t know it then, but Lehman’s bankruptcy in ‘08 was a gift, and I left in search of a calling.</p>

          <p>I spent a few years meandering - writing, working odd jobs, grad school in Hong Kong - ultimately ending up back in NYC in 2009, having stumbled upon a young, passionate group of misfits that folks were calling “founders.” These founders felt more like artists than assets, more obsessives than executives. They were avant garde, they were building the things they wanted to see in the world, and to my surprise, people called venture capitalists gave them money to pursue their dreams.</p>

          <p>I was in love with their fringe eccentricity, extraordinary craftsmanship, and wild ambition. I was in love with the beautiful new works of art they called startups. For the next 15 years, I dedicated my life to working with founders – first at betaworks, and then over three funds at <a href="https://notation.vc/" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">Notation</a> with my partner Alex Lines.</p>

          <p>A lot has changed.</p>

          <p>The venture ecosystem went from cottage industry outsider to institutional insider – from a nascent practice to a consensus component of institutional portfolios. The result has been the industrialization–and bankerization–of venture. Firms that make dozens or even hundreds of investments per year, relentlessly focused on assets under management, using the same copy-paste transactional language, all drowning in a sea of sameness.  </p>

          <p>Similarly, what was once a risky leap of faith has become a credentialing factory: accelerators churn out 1,000s of startups per year and fundraising rounds are the new requisite bullets in Linkedin resumes.</p>

          <p>The environment today feels eerily similar to the one I left on Wall Street so many years ago.</p>

          <div className="flex justify-center pt-6 pb-2">
            <div className="w-2/5">
              <div className="grid grid-cols-7 grid-rows-6 h-28 text-sm text-center">
                <span className="col-start-1 row-start-3">Into</span>
                <span className="col-start-2 row-start-4"></span>
                <span className="col-start-3 row-start-1">the </span>
                <span className="col-start-2 row-start-1"></span>
                <span className="col-start-5 row-start-2">A</span>
                <span className="col-start-6 row-start-3">s</span>
                <span className="col-start-7 row-start-4">ylum</span>
              </div>
            </div>
          </div>
          <p>I’ve always believed the best early-stage founders are artists – they're obsessive about new and unusual things, they feel compelled to bring creation into the world, and they are often misunderstood for long periods of time–even lifetimes. Building businesses is their art.</p>
          <p>The good news is that as the new “banks” in venture continue to expand their tentacles, they also enable new alternatives.</p>

          <div className="flex justify-center pt-10 pb-14">
            <div className="w-4/5">
              <div className="grid grid-cols-[4fr_1fr_4fr] grid-rows-5 h-28 text-sm text-center">
                <span className="col-start-1 row-start-1">What if we treated founders like artists, </span>
                <span className="col-start-3 row-start-5">instead of like assets?</span>
              </div>
            </div>
          </div>

          <p>We plan to spend the next decade trying to answer this question. </p>

          <p>We think it means:</p>

          <div className="sm:block md:grid md:grid-cols-2 md:gap-8 mb-2 mr-4 -ml-3">
            <ul className="list-disc pl-8 space-y-4 sm:-ml-4 md:ml-0">
              <li>A firm that’s small by design, that makes a handful of investments per year, and that eschews board seats and administrative control.</li>
              <li className="pb-4">A small team of partners moving mountains to help when asked and otherwise getting out of the way. </li>
            </ul>
            <ul className="list-disc pl-8 space-y-4 sm:mt-4 md:mt-0 sm:-ml-4 md:ml-0">
              <li>A place for founders to tune out the noise and focus on making something truly great.</li>
              <li>A source of calm, trust, and support for founders who are manifesting beauty through one of the hardest things you can do: starting a company.</li>
            </ul>
          </div>

          <p className="text-center pt-16 pb-4">The path forward</p>

          <p>If this sounds appealing to you, please <span onClick={() => handlePageChange('contact')} className="cursor-pointer custom-link inline-block">get in touch</span>. Whether you're a founder or in between things, we’d love for you to come visit us at our studio in Brooklyn. </p>
          <p>And if you would like to join a small team dedicated to the art of venture rather than the business of banking, contact us at <a href="mailto:hiring@asylum.vc" className="no-underline hover:underline">hiring@asylum.vc</a>.</p>
          <div className="grid grid-cols-4 gap-4 pb-12">
            <div className="col-span-3"></div>
            <div className="text-left">
              <p>- Nick</p>
              <p>08/05/24</p>
            </div>

          </div>
          <div className="space-y-8 mb-8 pb-16 text-center">
            <div>
              <p>More beauty and craft,<br /> less factory line</p>
            </div>
            <div>
              <p>More weird and rebellious,<br /> less safe and derivative</p>
            </div>
            <div>
              <p>More really hard inspired work,<br /> less status games</p>
            </div>
            <div>
              <p>More authentic expression of self,<br /> less patagonia vest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;