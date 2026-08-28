import { useState } from "react";
import { ImagePlus, X, Camera } from "lucide-react";

function PhotoUploader({ photos, setPhotos }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const availableSlots = 5 - photos.length;

    if (availableSlots <= 0) {
      e.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, availableSlots);

    setUploading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) {
        throw new Error("VITE_API_URL is not configured.");
      }

      const uploadedPhotos = [];

      for (const file of selectedFiles) {
        const formData = new FormData();

        formData.append("image", file);

        const response = await fetch(
          `${API_URL}/api/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Image upload failed."
          );
        }

        uploadedPhotos.push({
          url: result.url,
        });
      }

      setPhotos((currentPhotos) => [
        ...currentPhotos,
        ...uploadedPhotos,
      ]);

    } catch (error) {
      console.error("Photo upload error:", error);

      alert(
        "The photo could not be uploaded. Please make sure the server is running."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removePhoto = (index) => {
    setPhotos((currentPhotos) =>
      currentPhotos.filter((_, i) => i !== index)
    );
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
            disabled={uploading}
          />

          <div className="upload-icon">
            <ImagePlus size={27} />
          </div>

          <h3>
            {uploading
              ? "Uploading your memories..."
              : photos.length === 0
              ? "Add some memories"
              : "Add more photos"}
          </h3>

          <p>
            {uploading
              ? "Please wait while your photos are being uploaded."
              : "Add up to 5 photos if you'd like. You can also skip this completely."}
          </p>

          <span className="upload-button">
            <Camera size={15} />

            {uploading
              ? "Uploading..."
              : `Choose photo${photos.length > 0 ? "s" : ""}`}
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
                key={`${photo.url}-${index}`}
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