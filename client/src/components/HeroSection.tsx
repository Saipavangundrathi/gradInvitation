import { useEffect, useState } from "react";

type CountdownType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const HeroSection = () => {
  const [countdown, setCountdown] = useState<CountdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const graduationDate = new Date('May 2, 2025 14:00:00').getTime();
      const now = new Date().getTime();
      const timeLeft = graduationDate - now;

      if (timeLeft <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section id="home" className="relative bg-[#2A774B] text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4 items-center">
            <img
              src="/attached_assets/image_1742521753459.png"
              alt="UAB Blaze Mascot"
              className="h-24 md:h-32 animate-pulse"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-['Merriweather'] font-bold mb-4">We Did It!</h1>
          <p className="text-xl md:text-2xl mb-8">
            Join us as we celebrate our graduation from the University of Alabama at Birmingham
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 inline-block">
            <p className="text-lg mb-2">Graduation Ceremony</p>
            <p className="text-2xl md:text-3xl font-bold mb-4">May 2nd, 2025</p>
            <div className="flex justify-center space-x-4 text-center">
              <div className="bg-white/20 rounded-lg p-3 md:p-4 w-16 md:w-20">
                <div className="text-xl md:text-2xl font-bold text-[#FAD662]">
                  {padZero(countdown.days)}
                </div>
                <div className="text-xs md:text-sm">Days</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 md:p-4 w-16 md:w-20">
                <div className="text-xl md:text-2xl font-bold text-[#FAD662]">
                  {padZero(countdown.hours)}
                </div>
                <div className="text-xs md:text-sm">Hours</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 md:p-4 w-16 md:w-20">
                <div className="text-xl md:text-2xl font-bold text-[#FAD662]">
                  {padZero(countdown.minutes)}
                </div>
                <div className="text-xs md:text-sm">Minutes</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 md:p-4 w-16 md:w-20">
                <div className="text-xl md:text-2xl font-bold text-[#FAD662]">
                  {padZero(countdown.seconds)}
                </div>
                <div className="text-xs md:text-sm">Seconds</div>
              </div>
            </div>
          </div>
          <a
            href="#rsvp"
            className="mt-8 inline-block bg-[#FAD662] text-[#2A774B] font-bold py-3 px-6 rounded-full hover:bg-white transition-colors"
          >
            RSVP Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
