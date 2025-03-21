import { Card, CardContent } from "@/components/ui/card";

const DirectionsSection = () => {
  return (
    <section id="directions" className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Merriweather'] font-bold text-[#2A774B] mb-4">
            Get to the Ceremony
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            The graduation ceremony will take place at the UAB Bartow Arena on May 2nd, 2023.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#2A774B] mb-4">Venue Information</h3>
                <div className="mb-4">
                  <p className="font-bold mb-1">Address:</p>
                  <p>Bartow Arena</p>
                  <p>617 13th Street South</p>
                  <p>Birmingham, AL 35233</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold mb-1">Date & Time:</p>
                  <p>May 2nd, 2025</p>
                  <p>Ceremony begins: 2:00 PM</p>
                  <p>Doors open: 12:30 PM</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold mb-1">Parking:</p>
                  <p>Free parking available in the 16th Street and 12th Street parking decks.</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Additional Information:</p>
                  <ul className="list-disc pl-5">
                    <li>Accessible seating is available</li>
                    <li>Professional photographers will be on-site</li>
                    <li>Reception to follow at Campus Green</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-1/2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#2A774B] mb-4">Map & Directions</h3>
                {/* Map placeholder */}
                <div className="bg-gray-200 h-64 mb-4 flex items-center justify-center rounded-lg">
                  <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2A774B] mx-auto mb-2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <p>Interactive map will be displayed here</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold mb-2">Getting Here:</p>
                  <div className="mb-2">
                    <p className="font-medium">From I-65 North:</p>
                    <p>Take exit 259A toward University Blvd. Continue on University Blvd. Turn right onto 13th Street S.</p>
                  </div>
                  <div className="mb-2">
                    <p className="font-medium">From I-65 South:</p>
                    <p>Take exit 259 for University Blvd. Continue on University Blvd. Turn right onto 13th Street S.</p>
                  </div>
                  <div>
                    <p className="font-medium">Public Transportation:</p>
                    <p>MAX Transit routes 44 and 48 stop nearby. The nearest bus stop is at University Blvd & 13th St S.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;
