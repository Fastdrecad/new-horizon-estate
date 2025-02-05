import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // 6584c0c1e1a1f2f72c1c7201
  // 65a794567099c60406fd8547

  /* firebase storage
   allow read;
  allow write: if request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*')
   */

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Confirmation Modal
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
    setModalOpen(false);
  };

  const fetchUserListings = async () => {
    try {
      setShowListingsError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        throw new Error(errorData.message || "Failed to fetch listings");
      }

      const data = await res.json();

      setUserListings(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setShowListingsError(true);
    }
  };

  return (
    <>
      <div className="p-3 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-20">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
              />
              <p className="text-sm text-center">
                {fileUploadError ? (
                  <span className="text-red-700 font-semibold">
                    Error: Image must be less than 2mb!
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-500 font-semibold">
                    Uploading {filePerc}%
                  </span>
                ) : filePerc === 100 ? (
                  <span className="text-green-500 font-semibold">
                    Image Successfully Uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
              <input
                type="text"
                placeholder="username"
                className="border p-3 rounded-lg"
                id="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
              <input
                defaultValue={currentUser.email}
                onChange={handleChange}
                type="email"
                placeholder="email"
                className="border p-3 rounded-lg"
                id="email"
              />
              <input
                type="password"
                placeholder="password"
                className="border p-3 rounded-lg"
                id="password"
              />
              <button
                disabled={loading}
                className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "loading..." : "update"}
              </button>
              <Link
                to={"/create-listing"}
                className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
              >
                Create Listing
              </Link>
            </form>
            <div className="flex justify-between mt-5">
              <span
                onClick={handleDeleteUser}
                className="text-white cursor-pointer bg-red-700 p-3 rounded-lg hover:opacity-85"
              >
                Delete Account
              </span>
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer bg-white p-3 rounded-lg hover:bg-gray-200"
              >
                Sign Out
              </span>
            </div>
            <p className="text-red-700 mt-5">{error ? error : ""}</p>
            <p className="text-green-500 mt-5">
              {updateSuccess ? "User is updated successfully!" : ""}
            </p>
          </div>

          <div className="flex-1 flex-col ">
            <button
              onClick={fetchUserListings}
              className="text-green-700 w-full text-3xl font-semibold my-7"
            >
              Show Listings
            </button>
            <p className="text-red-700 mt-5">
              {showListingsError ? "Error showing listings!" : ""}
            </p>

            {userListings && userListings.length > 0 && (
              <div className="flex flex-col gap-5">
                <h1 className="text-center my-7 text-2xl font-semibold">
                  Your Listings
                </h1>
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="border p-3 rounded-lg flex justify-between items-center gap-4"
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing cover"
                        className="h-16 w-16 object-contain "
                      />
                    </Link>
                    <Link
                      className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                      to={`/listing/${listing._id}`}
                    >
                      <p>{listing.name}</p>
                    </Link>

                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="text-red-700 uppercase"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="text-green-700 uppercase"
                      >
                        <button className="text-green-700 uppercase">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
