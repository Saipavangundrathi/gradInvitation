import { Card, CardContent } from "@/components/ui/card";

interface JourneyMilestone {
  id: number;
  title: string;
  description: string;
  date: string;
}

const journeyMilestones: JourneyMilestone[] = [
  {
    id: 1,
    title: "First Semester Challenges",
    description: "Adjusting to graduate-level coursework while balancing work and personal life was our first big hurdle. Late-night study sessions and countless cups of coffee became our routine.",
    date: "August 2020"
  },
  {
    id: 2,
    title: "Adapting to Remote Learning",
    description: "When the pandemic hit, we had to quickly adapt to online classes and virtual collaboration. We learned new skills and found creative ways to stay connected despite the distance.",
    date: "March 2021"
  },
  {
    id: 3,
    title: "Research Breakthroughs",
    description: "After months of hard work, our research projects finally started yielding results. The excitement of discovery made all the late nights worth it.",
    date: "November 2021"
  },
  {
    id: 4,
    title: "Thesis Submission",
    description: "The culmination of years of research and writing - submitting our theses was both terrifying and exhilarating. We celebrated with a small gathering after months of isolation.",
    date: "February 2023"
  }
];

const JourneySection = () => {
  return (
    <section id="journey" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Merriweather'] font-bold text-[#2A774B] mb-4">
            Our Journey
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            The path to graduation wasn't always easy, but together we overcame every challenge and celebrated every victory.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="relative max-w-4xl mx-auto">
          {/* Line through middle of timeline */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#2A774B]"></div>

          {/* Timeline Items */}
          {journeyMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative mb-12 md:mb-16">
              {index % 2 === 0 ? (
                // Even items (left side on desktop)
                <div className="md:flex">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow md:ml-auto">
                      <h3 className="text-xl font-bold text-[#2A774B] mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                      <p className="text-gray-500 mt-2">{milestone.date}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ) : (
                // Odd items (right side on desktop)
                <div className="md:flex">
                  <div className="hidden md:block md:w-1/2"></div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-[#2A774B] mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                      <p className="text-gray-500 mt-2">{milestone.date}</p>
                    </div>
                  </div>
                </div>
              )}
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/4 md:top-1/2 w-6 h-6 rounded-full bg-[#D4AF37] border-4 border-white shadow"></div>
            </div>
          ))}

          {/* Final item (center on all screens) */}
          <div className="relative">
            <div className="max-w-md mx-auto">
              <div className="bg-[#2A774B] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">Graduation Day!</h3>
                <p>
                  After years of hard work, we've made it to the finish line! Join us as we celebrate this milestone achievement together.
                </p>
                <p className="mt-2 font-bold">May 2nd, 2025</p>
              </div>
            </div>
            {/* Timeline Node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 w-8 h-8 rounded-full bg-[#FAD662] border-4 border-white shadow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
