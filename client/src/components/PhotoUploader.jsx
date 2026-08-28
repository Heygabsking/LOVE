import { ImagePlus, X, Camera } from "lucide-react";

function PhotoUploader({ photos, setPhotos }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    // Maximum of 5 photos
    const availableSlots = 5 - photos.length;

    const selectedFiles = files.slice(0, availableSlots);

    const newPhotos = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPhotos((currentPhotos) => [
      ...currentPhotos,
      ...newPhotos,
    ]);

    e.target.value = "";
  };

  const removePhoto = (index) => {
    setPhotos((currentPhotos) => {
      const photoToRemove = currentPhotos[index];

      if (photoToRemove?.url) {
        URL.revokeObjectURL(photoToRemove.url);
      }

      return currentPhotos.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="photo-uploader">

      {/* UPLOAD BUTTON */}

      {photos.length < 5 && (
        <label className="photo-upload-box">

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
          />

          <div className="upload-icon">
            <ImagePlus size={27} />
          </div>

          <h3>
            {photos.length === 0
              ? "Add some memories"
              : "Add more photos"}
          </h3>

          <p>
            Add up to 5 photos if you'd like.
            You can also skip this completely.
          </p>

          <span className="upload-button">
            <Camera size={15} />
            Choose photo{photos.length > 0 ? "s" : ""}
          </span>

          <small>
            {photos.length} / 5 photos · Optional
          </small>

        </label>
      )}


      {/* PHOTO PREVIEWS */}

      {photos.length > 0 && (
        <div className="photo-preview-area">

          <div className="photo-grid">

            {photos.map((photo, index) => (
              <div
                className="uploaded-photo"
                key={photo.url}
              >

                <img
                  src={photo.url}
                  alt={`Memory ${index + 1}`}
                />

                <button
                  type="button"
                  className="remove-photo"
                  onClick={() => removePhoto(index)}
                  aria-label="Remove photo"
                >
                  <X size={15} />
                </button>

              </div>
            ))}

          </div>

          <div className="photo-status">
            <span>
              {photos.length} {photos.length === 1 ? "photo" : "photos"} added
            </span>

            {photos.length < 5 && (
              <span>
                You can add {5 - photos.length} more
              </span>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default PhotoUploader;