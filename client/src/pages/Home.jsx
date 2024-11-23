import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../components/Card";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <div className="text-gray-400 text-sm sm:text-xl">
          Discover your dream home today!
          <br />
          Explore our extensive listings for rental properties and homes for
          sale. Whether you&apos;re searching for the perfect rental or ready to
          make a lasting investment, find the ideal property that suits your
          lifestyle. Start your journey to a new home now - browse our listings
          and make your move!
        </div>
        <Link
          to={"/search"}
          className="text-sm sm:text-xl text-blue-800 font-bold hover:underline max-w-fit"
        >
          <span className="block">
            Let&apos;s get started
            <span className="animate-animateDot1">.</span>
            <span className="animate-animateDot2">.</span>
            <span className="animate-animateDot3">.</span>
          </span>
        </Link>
      </div>
      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]})  no-repeat`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 70%"
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}
      {/* listing results for offer, sale and rent */}
      <div className="max-w-screen-2xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <>
            <div className="my-3 text-center">
              <h2 className="text-3xl text-slate-600 font-bold">
                Recent Offers
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm sm:text-xl text-blue-800 font-semibold hover:underline"
              >
                View more
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              {offerListings.map((listing) => (
                <Card listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}
        {offerListings && offerListings.length > 0 && (
          <>
            <div className="my-3 text-center">
              <h2 className="text-3xl text-slate-600 font-bold">
                Recent places for rent
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-sm sm:text-xl text-blue-800 font-semibold hover:underline"
              >
                View more
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {rentListings.map((listing) => (
                <Card listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}
        {offerListings && offerListings.length > 0 && (
          <>
            <div className="my-3 text-center">
              <h2 className="text-3xl text-slate-600 font-bold">
                Recent places for sale
              </h2>
              <Link
                to={`/search?type=sale`}
                className="text-sm sm:text-xl text-blue-800 font-semibold hover:underline"
              >
                View more
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {saleListings.map((listing) => (
                <Card listing={listing} key={listing._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
