'use client'; // 👈 1. Make this a Client Component
import React, { useState, useEffect } from "react"; // 👈 2. Import hooks
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Languages, Check  } from 'lucide-react';
// Define the props for the component for reusability
interface ImageCardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  content: string;
  buttonText: string;
  arabic:string;
  frensh:string;
  english:string;
  link:string;
}
export function ImageCard({
  imgSrc,
  imgAlt,
  title,
  description,
  content,
  buttonText,
  arabic,
  frensh,
  english,
  link,
}: ImageCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Image container */}
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            onError={(e) => {
              // Fallback placeholder image on error
              e.currentTarget.src = `https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found`;
            }}
          />
        </div>
        {/* Text content with padding */}
        <div className="p-6">
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
         <div className="p-6 text-center">
          <span className="text-sm text-muted-foreground"><Languages color="#b08920"/> guide languages</span>
          <ul className="flex">
            <li className="p-4"><Check size={16} color="#b08920" strokeWidth={2.25} />{arabic}</li>
            <li className="p-4"><Check size={16} color="#b08920" strokeWidth={2.25} />{frensh}</li>
            <li className="p-4"><Check size={16} color="#b08920" strokeWidth={2.25} />{english}</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <a href={link}  className="w-full">
          {buttonText}
        </a>
      </CardFooter>
    </Card>
  );
}

// This is no longer an async component
export default function Tours() {
  const router = useRouter();
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const getDataTours = async () => {
      const response = await axios.get('http://localhost:8000/api/tours', {
        withCredentials: true,
        withXSRFToken: true,
      });
      if (response.status == 200) {
        const tours = response.data || [];
        setTours(tours);
        console.log(tours);
      } else if (response.status == 401 || response.status == 419) {
        router.push(`/signin`);
      }
    }
    getDataTours();
  }, [])
  return (
    <div className="grid grid grid-flow-col grid-rows-2 gap-2">
        {/* <h1>check out our Moroccan tours</h1>
        <span>Explore our tours and find the perfect match for your needs.</span> */}
      {tours.length > 0 ? (
        tours.map((tour) => (
          <div key={tour.ID}>
            <ImageCard
              imgSrc={tour.image}
              imgAlt="A beautiful painting of flowers"
              title={tour.post_title}
              description="A Fusion of Modern Art and Nature"
              content={tour.excerpt}
              link={tour.url}
              buttonText="View Details"
              arabic={tour.terms.s2a_dev_tours_languages.arabic}
              frensh={tour.terms.s2a_dev_tours_languages.frensh}
              english={tour.terms.s2a_dev_tours_languages.english}
            />
          </div>
        ))
      ) : (
        <p>Aucun circuit trouvé.</p>
      )}

    </div>
  );
}