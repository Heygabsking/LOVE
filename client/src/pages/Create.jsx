import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react";

import PhotoUploader from "../components/PhotoUploader";

function Create() {
  const navigate = useNavigate();
  const location = useLocation();

  /*
    If we came from Home:
    location.state may contain the occasion.

    If we came from Preview using "Edit surprise":
    location.state contains the previous information
    and possibly a surpriseId.
  */

  const previous = location.state || {};

  const [form, setForm] = useState({
    recipient: previous.recipient || "",
    sender: previous.sender || "",
    message: previous.message || "",
    template: previous.template || previous.design || "romantic",
    occasion: previous.occasion || "proposal",
    type: previous.type || "surprise",
  });

  const [photos, setPhotos] = useState(previous.photos || []);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ===============================
  // SAVE SURPRISE
  // ===============================

  const handleContinue = async () => {
    setError("");

    if (!form.recipient.trim()) {
      setError("Please enter their name.");
      return;
    }

    if (!form.message.trim()) {
      setError("Please write your message.");
      return;
    }

    setSaving(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      // ===============================
      // PREPARE PHOTO URLS
      // ===============================

      const photoUrls = (photos || [])
        .map((photo) =>
          typeof photo === "string" ? photo : photo.url
        )
        .filter(Boolean);

      const data = {
        type: form.type,
        occasion: form.occasion,
        recipient: form.recipient,
        sender: form.sender,
        message: form.message,
        design: form.template,
        template: form.template,
        photos: photoUrls,
      };

      let response;

      // ===============================
      // UPDATE EXISTING SURPRISE
      // ===============================

      if (previous.surpriseId) {
        response = await fetch(
          `${API_URL}/api/surprises/${previous.surpriseId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      }

      // ===============================
      // CREATE NEW SURPRISE
      // ===============================

      else {
        response = await fetch(`${API_URL}/api/surprises`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong while saving."
        );
      }

      // ===============================
      // GET MONGODB ID
      // ===============================

      const surpriseId =
        result.surprise?._id || previous.surpriseId;

      if (!surpriseId) {
        throw new Error(
          "The surprise was saved, but no surprise ID was returned."
        );
      }

      // ===============================
      // CREATE REAL WEBSITE URL
      // ===============================

      const shareUrl =
        `${window.location.origin}/surprise/${surpriseId}`;

      console.log("Surprise ID:", surpriseId);
      console.log("Share URL:", shareUrl);
      console.log("Photo URLs:", photoUrls);

      // ===============================
      // GO TO PREVIEW
      // ===============================

      navigate("/preview", {
        state: {
          ...form,
          photos: photoUrls,
          surpriseId,
          shareUrl,
        },
      });

    } catch (error) {
      console.error("Save error:", error);

      setError(
        "We couldn't save your surprise. Please make sure the server is running."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="create-page">

      {/* =========================
          TOP NAVIGATION
      ========================= */}

      <header className="create-header">

        <button
          type="button"
          className="back-home"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          <span>Back home</span>
        </button>

        <button
          type="button"
          className="create-logo"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >

          <div className="logo-heart">
            <Heart size={21} fill="white" />
          </div>

          <span className="logo-text">
            Surprise<span className="logo-highlight">Me</span>
          </span>

        </button>

        <div className="create-step">
          Step 1 of 3
        </div>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section className="create-hero">

          <div className="create-eyebrow">
            <Sparkles size={16} />
            CREATE YOUR SURPRISE
          </div>

          <h1>
            Make something
            <span> unforgettable.</span>
          </h1>

          <p>
            Start with the basics. You can personalize everything
            before you share your surprise.
          </p>

        </section>


        {/* =========================
            FORM
        ========================= */}

        <section className="create-card">

          {/* =========================
              PEOPLE
          ========================= */}

          <section className="form-block">

            <div className="block-heading">

              <div className="block-number">
                01
              </div>

              <div>
                <h2>Tell us about them</h2>

                <p>
                  Who are you creating this surprise for?
                </p>
              </div>

            </div>


            <div className="name-fields">

              <div className="field">

                <label htmlFor="recipient">
                  Their name
                </label>

                <input
                  id="recipient"
                  name="recipient"
                  type="text"
                  value={form.recipient}
                  onChange={handleChange}
                  placeholder="e.g. Sarah"
                  autoComplete="off"
                />

              </div>


              <div className="field">

                <label htmlFor="sender">
                  Your name
                </label>

                <input
                  id="sender"
                  name="sender"
                  type="text"
                  value={form.sender}
                  onChange={handleChange}
                  placeholder="e.g. Gabriel"
                  autoComplete="off"
                />

              </div>

            </div>

          </section>


          {/* =========================
              MESSAGE
          ========================= */}

          <section className="form-block">

            <div className="block-heading">

              <div className="block-number">
                02
              </div>

              <div>

                <h2>Write your message</h2>

                <p>
                  Say what you really want them to know.
                </p>

              </div>

            </div>


            <div className="field">

              <label htmlFor="message">
                Your message
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write something from your heart..."
                rows="7"
              />

            </div>

          </section>


          {/* =========================
              PHOTOS
          ========================= */}

          <section className="form-block">

            <div className="block-heading">

              <div className="block-number">
                03
              </div>

              <div>

                <h2>Add your memories</h2>

                <p>
                  Add up to 5 photos if you'd like.
                  You can also skip this completely.
                </p>

              </div>

            </div>


            <PhotoUploader
              photos={photos}
              setPhotos={setPhotos}
            />

          </section>


          {/* =========================
              DESIGN
          ========================= */}

          <section className="form-block">

            <div className="block-heading">

              <div className="block-number">
                04
              </div>

              <div>

                <h2>Choose your design</h2>

                <p>
                  Pick the feeling you want your surprise to have.
                </p>

              </div>

            </div>


            <div className="template-grid">

              {/* CLASSIC LOVE */}

              <button
                type="button"
                className={`template-card ${
                  form.template === "romantic"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    template: "romantic",
                  }))
                }
              >

                <div className="template-preview romantic-preview">
                  <Heart size={30} fill="currentColor" />
                </div>

                <div className="template-info">

                  <strong>
                    Classic Love
                  </strong>

                  <span>
                    Elegant, romantic and emotional.
                  </span>

                </div>

              </button>


              {/* PLAYFUL */}

              <button
                type="button"
                className={`template-card ${
                  form.template === "playful"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    template: "playful",
                  }))
                }
              >

                <div className="template-preview playful-preview">
                  <span>💗</span>
                  <span>✨</span>
                  <span>💕</span>
                </div>

                <div className="template-info">

                  <strong>
                    Cute & Playful
                  </strong>

                  <span>
                    Sweet, fun and a little cheeky.
                  </span>

                </div>

              </button>


              {/* SIMPLE */}

              <button
                type="button"
                className={`template-card ${
                  form.template === "simple"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    template: "simple",
                  }))
                }
              >

                <div className="template-preview simple-preview">
                  <span>♡</span>
                </div>

                <div className="template-info">

                  <strong>
                    Simple & Elegant
                  </strong>

                  <span>
                    Clean, beautiful and straight from the heart.
                  </span>

                </div>

              </button>

            </div>

          </section>


          {/* =========================
              ERROR
          ========================= */}

          {error && (
            <div
              style={{
                color: "#e6395f",
                background: "#fff1f4",
                padding: "12px 16px",
                borderRadius: "10px",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}


          {/* =========================
              CONTINUE
          ========================= */}

          <div className="create-actions">

            <button
              type="button"
              className="continue-button"
              onClick={handleContinue}
              disabled={saving}
            >

              <span>
                {saving
                  ? "Saving your surprise..."
                  : "Continue to preview"}
              </span>

              {!saving && (
                <ArrowRight size={18} />
              )}

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Create;