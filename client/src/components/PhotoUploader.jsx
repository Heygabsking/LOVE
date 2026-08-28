import { ImagePlus, X, Camera } from "lucide-react";

function PhotoUploader({ photos, setPhotos }) {
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    // Maximum of 5 photos
    const availableSlots = 5 - photos.length;

    if (availableSlots <= 0) {
      e.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, availableSlots);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      // Upload each selected photo to the server
      const uploadedUrls = [];

      for (const file of selectedFiles) {
        const formData = new FormData();

        formData.append("photo", file);

        const response = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to upload photo."
          );
        }

        if (!result.url) {
          throw new Error("Cloudinary did not return an image URL.");
        }

        uploadedUrls.push(result.url);
      }

      // Save the permanent Cloudinary URLs
      setPhotos((currentPhotos) => [
        ...currentPhotos,
        ...uploadedUrls,
      ]);

    } catch (error) {
      console.error("Photo upload error:", error);

      alert(
        "The photo could not be uploaded. Please make sure the server is running."
      );
    } finally {
      e.target.value = "";
    }
  };

  const removePhoto = (index) => {
    setPhotos((currentPhotos) => {
      const photoToRemove = currentPhotos[index];

      // Only revoke temporary browser URLs if one exists
      if (
        photoToRemove &&
        typeof photoToRemove === "object" &&
        photoToRemove.url &&
        photoToRemove.url.startsWith("blob:")
      ) {
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

            {photos.map((photo, index) => {

              // Supports both old object format and
              // new Cloudinary string URLs
              const photoUrl =
                typeof photo === "string"
                  ? photo
                  : photo.url;

              return (
                <div
                  className="uploaded-photo"
                  key={`${photoUrl}-${index}`}
                >

                  <img
                    src={photoUrl}
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
              );
            })}

          </div>

          <div className="photo-status">

            <span>
              {photos.length}{" "}
              {photos.length === 1 ? "photo" : "photos"} added
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