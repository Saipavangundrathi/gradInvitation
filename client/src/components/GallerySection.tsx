import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Study group session"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Laboratory research"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Campus celebration"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Presentation day"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Campus in winter"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1546457523-a6679d65ccc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Weekend getaway"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Library study session"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    alt: "Graduation cap decoration"
  }
];

const GallerySection = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Merriweather'] font-bold text-[#2A774B] mb-4">
            Memory Gallery
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            A collection of moments that defined our graduate journey at UAB.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
                  <span>{image.alt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="bg-black bg-opacity-90 max-w-4xl max-h-[90vh] p-0 border-none">
            <div className="relative p-4">
              <DialogClose className="absolute right-4 top-4 text-white hover:text-gray-200 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </DialogClose>
              
              <img 
                src={galleryImages[currentImageIndex].src} 
                alt={galleryImages[currentImageIndex].alt} 
                className="max-w-full h-auto max-h-[calc(90vh-100px)] mx-auto object-contain"
              />
              
              <p className="text-white text-center mt-4">
                {galleryImages[currentImageIndex].alt}
              </p>
              
              <div className="flex justify-between mt-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="text-white p-2 hover:text-gray-200"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="text-white p-2 hover:text-gray-200"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
