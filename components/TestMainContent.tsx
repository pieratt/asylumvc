import React from 'react';

interface TestMainContentProps {
  handlePageChange: (page: string) => void;
}

const TestMainContent: React.FC<TestMainContentProps> = ({ handlePageChange }) => {
  return (
    <div className="w-full mx-auto">
      <div className="max-w-3xl mx-auto mb-12 text-sm text-justify">
        <div className="space-y-4">
          <p>To the </p>
          <p>&nbsp;&nbsp;&nbsp; artists...</p>
          <p>Asylum Ventures is a new venture firm dedicated to the creative act of building companies. We raised $55 million for our first fund and make a handful of $1-2m investments per year in founders and startups that embody our belief that founders are artists, not assets. </p>
          <div className="flex justify-center pt-3 mb-4">
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
          <p>In 2007, I was working as a junior trader at Lehman Brothers. I really hated that job - particularly the dehumanizing culture, the lack of creativity, and the singular focus on transactions and money. Lehman's bankruptcy in '08 marked one of my only good days there, and I left in search of a calling.</p>
          <p>Soon after, I was fortunate to stumble upon a young, passionate group of creative misfits that folks were calling "founders." These founders felt more like artists than assets, more obsessives than executives. They were avant garde, building the things that they wanted to see in the world, and to my surprise, people called venture capitalists gave them money to pursue these dreams.</p>
          <p>I was in love with the fringe eccentricity, extraordinary craftsmanship, and wild ambition required to build these beautiful new works of art we called startups. For the next 15 years, I dedicated my life to working with absurdly ambitious and creative founders - first at betaworks, and then with three funds at Notation with my partner Alex Lines.</p>
          <p>A lot has changed. Both startups and venture capital went from cottage industry outsiders to institutional insiders. Venture went from a nascent practice to a consensus component of institutional portfolios. The result was a lot more capital and the industrialization–and bankerization–of venture, a process by which large multi-stage firms became truly massive, building staffs and war chests to rival the largest PE firms and hedge funds. </p>
          <p>Similarly, the creative act of making startups turned into a credentialing factory: accelerators churning out 1000s of startups per year, VCs comparing AUM instead of celebrating the founders and technology that drive it, and fundraising rounds becoming the definition of success and bullets on a Linkedin resume.</p>
          <p>If you had asked me in 2010 what I hoped might happen to the startup ecosystem, perhaps I would have described this same institutional transition - Going from underdog to incumbent, building gigantic companies with gigantic dollars raised and made - I have certainly been a beneficiary of this growth. But the industry today is almost indistinguishable from the one I ran away from in ‘08 when I left Lehman - Highly transactional, dehumanizing founders as widgets on a factory line,, and devoid of much of the creativity that led to all of our success in the first place.</p>
                  <div className="flex justify-center pt-6 pb-2">
                      <div className="w-2/5">
                          <div className="grid grid-cols-7 grid-rows-6 h-28 text-sm text-center">
                              <span className="col-start-1 row-start-3">Into</span>
                              <span className="col-start-2 row-start-4"></span>
                              <span className="col-start-3 row-start-1">the </span>
                              <span className="col-start-2 row-start-1"></span>
                              <span className="col-start-5 row-start-2">A</span>
                              <span className="col-start-6 row-start-3">S</span>
                              <span className="col-start-7 row-start-4">ylum</span>
                          </div>
                      </div>
                  </div>
          <p>Rather than run away, my partners Jon, Mackenzie and I are building something new. In fact, Asylum Ventures could only exist in the highly institutional bankerized environment that we find ourselves in today. We’re not doing this for nostalgia sake - We’re doing this because we believe there are exceptional founders that (like us) want to work with VCs that care more about them and their company than their AUM. We are doing this because we believe our alternative to the new big banks in venture will win.</p>
                  <div className="flex justify-center pt-10 pb-14">
                      <div className="w-4/5">
                          <div className="grid grid-cols-3 grid-rows-5 h-28 text-sm text-center">
                              <span className="col-start-1 row-start-1">What if we treated founders like artists, </span>

                              <span className="col-start-3 row-start-5">instead of like assets?</span>

                          </div>
                      </div>
                  </div>          

          <p>I’ve always believed the best founders have more in common with artists than executives. They're obsessive about new and beautiful things, they feel compelled to bring creation into the world, and they are often misunderstood for very long periods of time–even lifetimes. Our belief is that building businesses is its own form of creation–its own form of art. We’re looking for founders who are building something unique, misunderstood, and courageous.</p>
          <p>Building companies or any new work of art is insanely difficult. Founders are like Dante and Virgil on their stroll through Hell–artists on a grueling journey. Asylum is a source of calm, trust, and support for founders who are manifesting beauty through one of the hardest things you can do. A place where true craftspeople can tune out the noise and focus on their own greatness. A refuge. A haven. An asylum.</p>
          <p className="text-center pt-16">Specifically, we:</p>

          <div className="sm:block md:grid md:grid-cols-2 md:gap-8 mb-2 mr-4 -ml-3">
            <ul className="list-disc pl-8 space-y-4 sm:-ml-4 md:ml-0">
              <li>Do not get in the way of a founder making something great. Let the artist make their art goddamnit!</li>
              <li>Do not take board seats or play an administrative role ie. hire/fire founders</li>
              <li>Hope to create lifelong partnerships with founders, across multiple companies, funds, personal family growth, and all the ups and downs we collectively face.</li>
              <li>Make a handful of investments each year so that each founder and company truly matters.</li>
            </ul>
            <ul className="list-disc pl-8 space-y-4 sm:mt-4 md:mt-0 sm:-ml-4 md:ml-0">
              <li>Are small by choice - We raised much less for this fund than we could have, which means we only make real money when founders do.</li>
              <li>Do the work ourselves when founder's are in need - We don’t outsource to platform services.</li>
              <li>Work in a quiet studio in Brooklyn, if you’d like to come work with us.</li>
              <li>Respect founders as the heroic figures they are.</li>
                          <li className="list-none">In other words, we’re not a big bank and never will be.</li>
            </ul>
          </div>

        <p className="text-center pt-16 pb-4">Asylum Ventures is ultimately a love letter to founders…</p>
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
              <p>More risk,<br /> less fees and salary</p>
            </div>
            <div>
              <p>More authentic expression of self,<br /> less patagonia vest</p>
            </div>
          </div>
          <p>The largest companies in the world are iconic because of their devotion to these ideas. We believe the best founders of this next cycle will look more like artists than buttoned up business execs, and the VCs that serve them will feel more like a peer, patron or fan than a transactional banker.</p>
          <p>If this sounds appealing to you, please <span className="cursor-pointer underline" onClick={() => handlePageChange('contact')}>reach out</span>. We welcome founders we partner with or folks in between things to come work out of our studio in Brooklyn.</p>
          <p>And if you would like to join a small team dedicated to the art of venture rather than the business of banking, <span className="cursor-pointer underline" onClick={() => handlePageChange('contact')}>contact us here</span>.</p>
          <p></p>        </div>
      </div>
    </div>
  );
};

export default TestMainContent;