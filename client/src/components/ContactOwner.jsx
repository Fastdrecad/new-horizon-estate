import Contact from "./Contact";

const ContactOwner = ({ isOpen, setIsOpen, listing }) => {
  return isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="modal-container bg-white p-6 rounded-lg max-w-lg w-full mx-4">
        <Contact listing={listing} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  ) : (
    <button
      onClick={() => setIsOpen(true)}
      className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
    >
      Contact Owner
    </button>
  );
};

export default ContactOwner;
