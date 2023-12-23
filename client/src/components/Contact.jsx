import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{owner.username}</span> for{" "}
            <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg  "
          >
            {onChange}
          </textarea>
          <Link
            className="bg-slate-700 text-white text-center rounded-lg
           p-3 uppercase hover:opacity-95"
            to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
