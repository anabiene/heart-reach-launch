import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { id: 1, src: gallery1, alt: "Volunteers helping community members", title: "Community Support" },
  { id: 2, src: gallery2, alt: "Children in educational workshop", title: "Education Programs" },
  { id: 3, src: gallery3, alt: "Community food distribution event", title: "Food Drive" },
  { id: 4, src: gallery4, alt: "Charity fundraising event", title: "Fundraising Gala" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through moments that capture the heart of our mission and the impact we're making together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-2xl font-bold mt-4">{selectedImage.title}</h3>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
