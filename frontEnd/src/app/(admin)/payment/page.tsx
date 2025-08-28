// src/components/ReservationDetailsPage.tsx
'use client'
import React, { useState } from 'react';

// Vous pouvez utiliser une bibliothèque d'icônes comme react-icons ou heroicons
// import { FaCalendarAlt, FaUserFriends, FaChild } from 'react-icons/fa';

const ReservationDetailsPage: React.FC = () => {
  // État pour gérer le mode de paiement sélectionné
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'bank'>('bank');
  // État pour stocker le fichier de preuve de paiement
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPaymentProof(event.target.files[0]);
    }
  };

  const reservationDetails = {
    tourImage: 'https://via.placeholder.com/150', // Remplacez par votre image
    tourTitle: 'Circuit de luxe de 10 jours au Maroc : Villes impériales, Sahara et côte arabe',
    duration: '10 jours',
    rating: 5,
    reviews: 3,
    startDate: '2025-09-26',
    endDate: '2025-10-06',
    adults: 2,
    children: 0,
    totalPrice: 8000,
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8" style={{ color: '#c39a6b' }}>
          VOS DÉTAILS DE RÉSERVATION
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale (gauche) */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex items-center gap-6 mb-8">
              <span className="text-6xl font-bold text-gray-300">2</span>
              <h2 className="text-xl font-semibold text-gray-700">Détails De Paiement</h2>
            </div>

            {/* Sélecteur de mode de paiement */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Mode De Paiement</h3>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  PayPal
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  Virement Bancaire Direct
                </label>
              </div>
            </div>

            {/* Affichage conditionnel des détails bancaires */}
            {paymentMethod === 'bank' && (
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Coordonnées Bancaires</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-gray-500 uppercase">
                      <tr>
                        <th className="py-2 px-4">Nom De La Banque</th>
                        <th className="py-2 px-4">Nom Du Titulaire Du Compte</th>
                        <th className="py-2 px-4">CÔTE</th>
                        <th className="py-2 px-4">IBAN</th>
                        <th className="py-2 px-4">RAPIDE</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="py-2 px-4">Banque de tests A</td>
                        <td className="py-2 px-4">VOYAGES CHOUCDALI</td>
                        <td className="py-2 px-4">11111 2222212345678901 45</td>
                        <td className="py-2 px-4">FR16 11111 22222 12345678901 45</td>
                        <td className="py-2 px-4">TESTFRPPXXX</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-r-lg">
              <p>Veuillez Déposer 30% Du Montant Total</p>
            </div>

            {/* Preuve de paiement */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Preuve De Paiement</h3>
              <div className="mt-2 flex items-center gap-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50"
                >
                  Choose File
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <span className="text-gray-500 text-sm">
                  {paymentProof ? paymentProof.name : 'No file chosen'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Télécharger une image claire de la preuve de paiement.</p>
            </div>
            
            <div className="mt-8 text-right">
              <button
                className="px-8 py-3 rounded-md font-semibold text-white"
                style={{ backgroundColor: '#c39a6b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
              >
                Payer
              </button>
            </div>

          </div>

          {/* Colonne de résumé (droite) */}
          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-lg shadow-md border" style={{ borderColor: '#0f3c4d' }}>
                <h2 className="text-xl font-semibold text-gray-800 pb-4 mb-4 border-b">Vos Détails De Réservation</h2>
                
                <div className="flex gap-4 items-start mb-4">
                    <img src={reservationDetails.tourImage} alt="Tour du Maroc" className="w-24 h-24 object-cover rounded-md"/>
                    <div>
                        <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
                            <span className="text-sm text-gray-500 ml-2">({reservationDetails.reviews} avis)</span>
                        </div>
                        <h3 className="font-bold text-gray-800">{reservationDetails.tourTitle}</h3>
                        <p className="text-sm text-gray-600 mt-1">{reservationDetails.duration} &middot; {reservationDetails.rating} étoiles</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center my-6">
                    <div>
                        <label className="text-sm text-gray-500 block">Date De Départ</label>
                        <p className="font-semibold">{reservationDetails.startDate}</p>
                    </div>
                     <div>
                        <label className="text-sm text-gray-500 block">Date De Fin</label>
                        <p className="font-semibold">{reservationDetails.endDate}</p>
                    </div>
                </div>
                
                <div className="space-y-3 text-sm my-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Adulte (18+)</span>
                        <span className="font-bold text-gray-800">{reservationDetails.adults}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Enfants (18-)</span>
                        <span className="font-bold text-gray-800">{reservationDetails.children}</span>
                    </div>
                </div>

                <div className="flex justify-between items-baseline pt-4 mt-4 border-t">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-3xl" style={{ color: '#0f3c4d' }}>{reservationDetails.totalPrice}$</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsPage;