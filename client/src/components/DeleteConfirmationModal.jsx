const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/75'>
        <div className='bg-white p-8 m-3 rounded-md text-center'>
          <p className='mb-10 mt-3'>
            Are you sure you want to delete your profile?
          </p>
          <div className='flex items-center justify-between my-4'>
            <button
              onClick={onCancel}
              className='px-4 py-1 bg-slate-700 text-white rounded-lg hover:opacity-85'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className='px-4 py-1 bg-red-700 rounded-lg hover:opacity-85 text-white '
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
