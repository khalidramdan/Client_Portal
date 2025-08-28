'use client'
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function TourDetails() {
    const params = useSearchParams();
    const tourId = params.get("id"); // récupérer l'ID passé dans l'URL
    const [tour, setTour] = useState(null);

    useEffect(() => {
        if (!tourId) return;

        const fetchTour = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/tours/${tourId}`, {
                    withCredentials: true,
                    withXSRFToken: true,
                });
                if (!res.status) throw new Error("Failed to fetch Tour");
                const data = await res.data;
                setTour(data[0]);
                console.log("Tour data:", data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTour();
    }, [tourId]);

    // --- Booking States ---
    const [isOpen, setIsOpen] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [hotel, setHotel] = useState("5 stars");
    const [buggy, setBuggy] = useState(false);
    const [quad, setQuad] = useState(false);
    const [total, setTotal] = useState(0);
    const [prixParHotel,setPrixParHotel] = useState(0);
    const [prixParHotelChild,setPrixParHotelChild] = useState(0);
  
useEffect(() => {
  if (hotel === "4 stars") {
    setPrixParHotel(3500);
    setPrixParHotelChild(1000)
  } else {
    setPrixParHotel(4000);
    setPrixParHotelChild(2000);
  }
}, [hotel]);
    const maxPeople = 7;
    const departureDate = "2025-09-26";

    // --- Calcul du total ---
    useEffect(() => {
        const basePrice = adults * prixParHotel + children * prixParHotelChild;
        const extras = (adults + children) * ((buggy ? 70 : 0) + (quad ? 50 : 0));

        setTotal(basePrice + extras);
    }, [adults, children, hotel, buggy, quad]);

    // --- Galerie Images ---
    const [activeImage, setActiveImage] = useState("/images/1_3-days-morocco-tour-from-spain.jpg");
    const images = [
        "/images/1_3-days-morocco-tour-from-spain.jpg",
        "/images/AF - Morocco - Chefchaouen - Priscilla Astor-feature.jpg",
        "/images/hasina-morocco-tours-03.jpg",
        "/images/Northern-Morocco-Adventure-Tour-Travel.png",
    ];
    // const firstTour = Array.isArray(tour) ? tour[0] : tour;

    // console.log(firstTour);
    const getMetaValue = (key: string) => {
        if (!tour?.meta) return null;
        return tour.meta.find((m: any) => m.meta_key === key)?.meta_value || null;
    };
    const getTermsByTaxonomy = (taxonomy: string) => {
        if (!tour?.taxonomies) return [];
        return tour.taxonomies
            .filter((t: any) => t.taxonomy === taxonomy)
            .map((t: any) => t.term.name);
    };
    const handleConfirmBooking = ()=>{
        const bookingData = {
            hotel,
            adults,
            children,
            buggy,
            quad,
            departureDate,
            total
        }
        localStorage.setItem("bookingData",JSON.stringify(bookingData))
        window.location.href = '/payment';
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* LEFT COLUMN */}
            {tour ? (
                <>
                    <div className="lg:col-span-2">
                        {/* Main Image */}
                        <img
                            src={activeImage}
                            alt="Tour"
                            className="w-full h-96 object-cover rounded-xl shadow"
                        />

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3 mt-4">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className={`h-24 object-cover rounded-lg cursor-pointer border-2 ${activeImage === img ? "border-yellow-600" : "border-transparent"
                                        }`}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="mt-6 text-2xl font-bold text-yellow-700">
                            {tour.post_title}
                        </h1>

                        {/* Tour Info */}
                        <div className="flex gap-4 mt-4">
                            <Card className="flex-1 p-4 bg-green-900 text-white text-center">
                                <p className="text-sm">Type de Tournée</p>
                                <p className="font-bold">{getMetaValue('s2a_dev_tours_settings_type')}</p>
                            </Card>
                            <Card className="flex-1 p-4 bg-green-900 text-white text-center">
                                <p className="text-sm">Durée</p>
                                <p className="font-bold">{getTermsByTaxonomy("s2a_dev_tours_durations")}</p>
                            </Card>
                        </div>

                        {/* Languages */}
                        <div className="mt-4">
                            <h3 className="font-semibold">Langues</h3>
                            <div className="flex gap-2 mt-2">
                                {getTermsByTaxonomy('s2a_dev_tours_languages').map((language) => (
                                    <span key={language} className="px-3 py-1 border rounded bg-yellow-700 text-white">
                                        {language}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="apercu" className="mt-6">
                            <TabsList className="grid grid-cols-6 gap-2">
                                <TabsTrigger value="apercu">Aperçu</TabsTrigger>
                                <TabsTrigger value="compris">Compris</TabsTrigger>
                                <TabsTrigger value="itineraire">Itinéraire</TabsTrigger>
                                <TabsTrigger value="faq">FAQ</TabsTrigger>
                                <TabsTrigger value="calendrier">Calendrier</TabsTrigger>
                                <TabsTrigger value="avis">Avis</TabsTrigger>
                            </TabsList>

                            <TabsContent value="apercu" className="mt-4">
                                <h3 className="font-bold">À Propos</h3>
                                <p className="text-gray-700">
                                    Vivez l'expérience ultime d'un circuit privé de luxe de 10 jours
                                    au Maroc, au départ de Casablanca...
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* RIGHT COLUMN (Booking Box) */}
                    <div className="border rounded-xl p-4 shadow-lg bg-white">
                        <h3 className="font-bold text-yellow-700">
                            À Partir De: {prixParHotel} $ / personne
                        </h3>
                        <p className="text-sm text-gray-500">Max: {maxPeople} personnes</p>

                        <div className="mt-4">
                            <label className="block font-semibold">Hôtels</label>
                            <div className="flex gap-4 mt-2">
                                <label>
                                    <input
                                        type="radio"
                                        name="hotel"
                                        value="4 stars"
                                        checked={hotel === "4 stars"}
                                        onChange={(e) => setHotel(e.target.value)}
                                    />{" "}
                                    4 étoiles
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="hotel"
                                        value="5 stars"
                                        checked={hotel === "5 stars"}
                                        onChange={(e) => setHotel(e.target.value)}
                                    />{" "}
                                    5 étoiles
                                </label>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold">Date de départ</label>
                            <input
                                type="date"
                                className="w-full border p-2 rounded mt-2"
                                defaultValue={departureDate}
                            />
                        </div>

                        {/* Bouton ouvre la popup */}
                        <Button
                            className="w-full mt-6 bg-yellow-600 text-white"
                            onClick={() => setIsOpen(true)}
                        >
                            Réserver
                        </Button>
                    </div>

                    {/* --- Booking Popup --- */}
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                            <Dialog.Panel className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                                <Dialog.Title className="text-lg font-bold text-yellow-700">
                                    Réservation
                                </Dialog.Title>

                                {/* Adults */}
                                <div className="mt-4 flex justify-between items-center">
                                    <p>Adults (18+)</p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => setAdults((a) => Math.max(1, a - 1))}
                                        >
                                            -
                                        </Button>
                                        <span>{adults}</span>
                                        <Button
                                            size="sm"
                                            onClick={() => setAdults((a) => Math.min(maxPeople, a + 1))}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                {/* Children */}
                                <div className="mt-4 flex justify-between items-center">
                                    <p>Children</p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => setChildren((c) => Math.max(0, c - 1))}
                                        >
                                            -
                                        </Button>
                                        <span>{children}</span>
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                setChildren((c) => Math.min(maxPeople - adults, c + 1))
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                {/* Extras */}
                                <div className="mt-4">
                                    <p className="font-semibold">Extras</p>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={buggy}
                                            onChange={() => setBuggy(!buggy)}
                                        />
                                        Buggy (70 $/person)
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={quad}
                                            onChange={() => setQuad(!quad)}
                                        />
                                        Quad (50 $/person)
                                    </label>
                                </div>

                                {/* Total */}
                                <div className="mt-6 text-xl font-bold text-right text-yellow-700">
                                    Total: {total.toFixed(2)} $
                                </div>

                                {/* Close + Book */}
                                <div className="mt-4 flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="w-1/2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Annuler
                                    </Button>
                                    <Button onClick={handleConfirmBooking} className="w-1/2 bg-yellow-600 text-white">Confirmer</Button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </>
            ) : (<p className="text-gray-500">Chargement du tour...</p>
            )}
        </div>
    );
}
