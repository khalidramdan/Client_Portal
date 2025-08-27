'use client';
import React, { useEffect,useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BookingPopup() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState("5 stars");
  const [buggy, setBuggy] = useState(false);
  const [quad, setQuad] = useState(false);
  const [total, setTotal] = useState(0);

  const maxPeople = 7;
  const departureDate = "2025-09-26";

  useEffect(() => {
    let pricePerPersonAdult = 0;
    let pricePerPersonChild = 0;

    if (hotel === "5 stars") {
      pricePerPersonAdult = 4000;
      pricePerPersonChild = 2000;
    } else if(hotel === "4 stars"){
      pricePerPersonAdult = 3500;
      pricePerPersonChild = 1000;
    }

    const basePrice =
      adults * pricePerPersonAdult + children * pricePerPersonChild;

    const extras =
      (adults + children) * ((buggy ? 700 : 0) + (quad ? 500 : 0));

    setTotal(basePrice + extras);
  }, [adults, children, hotel, buggy, quad]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Bouton pour ouvrir le popup */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow-lg">
            Booking Now
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Booking Form
            </DialogTitle>
          </DialogHeader>

          {/* Hotels */}
          <div className="mt-4">
            <h3 className="font-semibold">Hotels</h3>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="hotel"
                  value="4 stars"
                  checked={hotel === "4 stars"}
                  onChange={() => setHotel("4 stars")}
                />
                4 stars
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="hotel"
                  value="5 stars"
                  checked={hotel === "5 stars"}
                  onChange={() => setHotel("5 stars")}
                />
                5 stars
              </label>
            </div>
          </div>

          {/* Date */}
          <div className="mt-4">
            <h3 className="font-semibold">Departure Date</h3>
            <p className="mt-1">{departureDate}</p>
          </div>

          {/* Adults & Children */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span>Adult (18+)</span>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  -
                </Button>
                <span>{adults}</span>
                <Button
                  variant="outline"
                  onClick={() => setAdults(Math.min(maxPeople, adults + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>Children (18-)</span>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  -
                </Button>
                <span>{children}</span>
                <Button
                  variant="outline"
                  onClick={() => setChildren(Math.min(maxPeople, children + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="mt-4">
            <h3 className="font-semibold">Extras</h3>
            <div className="flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={buggy}
                  onChange={() => setBuggy(!buggy)}
                />
                Buggy (70$/person)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={quad}
                  onChange={() => setQuad(!quad)}
                />
                Quad (50$/person)
              </label>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span className="text-yellow-600">{total.toFixed(2)} $</span>
          </div>

          {/* Terms */}
          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm">
              I have read and agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                privacy policy
              </a>
            </label>
          </div>

          {/* Book button */}
          <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
            Book
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
