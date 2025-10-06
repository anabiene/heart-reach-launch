import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { id: 1, src: gallery1, alt: "Volunteers helping community members" },
  { id: 2, src: gallery2, alt: "Children in educational workshop" },
  { id: 3, src: gallery3, alt: "Community food distribution event" },
  { id: 4, src: gallery4, alt: "Charity fundraising event" },
];

const ImageCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the difference we're making in our community. Click any image to explore our full gallery.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card 
                    className="cursor-pointer overflow-hidden hover:shadow-xl transition-shadow"
                    onClick={() => navigate("/gallery")}
                  >
                    <CardContent className="p-0">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ImageCarousel;
