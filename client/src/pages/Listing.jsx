import { useEffect, useState } from "react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ContactOwner from "../components/ContactOwner";

export default function Listing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const renderContactButton = () => {
    if (!currentUser) {
      return (
        <div className="flex flex-col gap-2">
          <Link
            to="/sign-in"
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 text-center"
          >
            Sign In
          </Link>
          <p className="text-red-600">Please sign in to contact the owner</p>
        </div>
      );
    }

    if (currentUser._id === listing.userRef) {
      return <p className="text-slate-700">This is your listing</p>;
    }

    if (!contact) {
      return (
        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
            setContact(true);
          }}
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
        >
          Contact owner
        </button>
      );
    }

    return null;
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">
          Sorry, we couldn&apos;t find that listing!
        </p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url})  no-repeat `,
                    backgroundSize: `cover`,
                    backgroundPosition: "50% 65%"
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer shadow-3xl">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - $
              {listing.offer
                ? listing.regularPrice.toLocaleString("en-US")
                : listing.discountPrice.toLocaleString("en-US")}
              {listing.type === "rent" && "/month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900/75 w-full max-w-[200px] text-white text-center p-1 rounded-full">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900/75 w-full max-w-[200px] text-white text-center p-1 rounded-full">
                  ${+listing.discountPrice} Discount
                </p>
              )}
            </div>
            <p className="text-slate-800 ">
              <span className="font-semibold text-black">Description: </span>
              {listing.description}
            </p>
            <ul className=" text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} baths`
                  : `${listing.bedrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {renderContactButton()}

            {contact && (
              <ContactOwner
                listing={listing}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
}
