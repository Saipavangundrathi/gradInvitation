interface Graduate {
  id: number;
  name: string;
  degree: string;
  quote: string;
  image: string;
  imagePosition?: string;
}

const graduates: Graduate[] = [
  {
    id: 1,
    name: "Samagnya Reddy",
    degree: "Master of Science in Computer Science",
    quote: "\"The late nights coding and debugging were worth it. I've grown so much professionally and personally during my time at UAB.\"",
    image: "/attached_assets/IMG_2780.jpg",
    imagePosition: "object-top"
  },
  {
    id: 2,
    name: "Sankeerthan Reddy",
    degree: "Master of Science in Computer Science",
    quote: "\"My research journey has been challenging but incredibly rewarding. I'm grateful for the friendships that helped me through the toughest times.\"",
    image: "/attached_assets/IMG_9892.jpg",
    imagePosition: "object-top"
  },
  {
    id: 3,
    name: "Anvesh Kanchibotla",
    degree: "Master of Science in Computer Science",
    quote: "\"Balancing a full-time job with graduate studies wasn't easy, but the skills I've gained have already opened new doors in my career.\"",
    image: "/attached_assets/IMG_9893.jpg",
    imagePosition: "object-center"
  }
];

const GraduatesSection = () => {
  return (
    <section id="graduates" className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Merriweather'] font-bold text-[#2A774B] mb-4">
            Meet the Graduates
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            A special group of friends who supported each other through thick and thin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graduates.map((graduate) => (
            <div
              key={graduate.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={graduate.image}
                alt={`${graduate.name} Portrait`}
                className="w-full h-60 object-contain bg-gray-50"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2A774B] mb-2">{graduate.name}</h3>
                <p className="text-gray-600 mb-2">{graduate.degree}</p>
                <p className="text-gray-700 mb-4">{graduate.quote}</p>
                <div className="flex space-x-3">
                  <a href="#" className="text-[#2A774B] hover:text-[#D4AF37]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-[#2A774B] hover:text-[#D4AF37]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-[#2A774B] hover:text-[#D4AF37]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GraduatesSection;
