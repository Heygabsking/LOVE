import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Sparkles,
  Gift,
  Cake,
  PartyPopper,
  Star,
  Mail,
} from "lucide-react";

function PublicSurprise() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [surprise, setSurprise] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const fetchSurprise = async () => {
      try {
       const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/surprises/${id}`
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Surprise could not be found."
          );
        }

        setSurprise(data.surprise);
      } catch (err) {
        console.error("Error loading surprise:", err);
        setError("This surprise could not be found.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurprise();
  }, [id]);

  const moveNoButton = () => {
    const x = Math.floor(Math.random() * 220) - 110;
    const y = Math.floor(Math.random() * 160) - 80;

    setNoPosition({
      x,
      y,
    });
  };

  if (loading) {
    return (
      <div className="preview-page design-romantic">
        <div className="success-screen">
          <div className="success-icon">
            <Heart size={50} fill="currentColor" />
          </div>

          <h1>Loading your surprise...</h1>

          <p>
            Someone made something special for you ❤️
          </p>
        </div>
      </div>
    );
  }

  if (error || !surprise) {
    return (
      <div className="preview-page design-romantic">
        <div className="success-screen">
          <div className="success-icon">
            <Heart size={50} />
          </div>

          <div className="success-eyebrow">
            <Sparkles size={15} />
            OOPS
          </div>

          <h1>Surprise not found</h1>

          <p>
            This surprise may have been removed or the link is incorrect.
          </p>
        </div>
      </div>
    );
  }

  /*
  ========================================
  OCCASION INFORMATION
  ========================================
  */

  const occasion = surprise.occasion || "proposal";

  const occasionData = {
    proposal: {
      label: "A LITTLE SOMETHING FOR YOU",
      small: "I have something to ask you...",
      question: "Will you be",
      questionHighlight: " my girlfriend?",
      yesText: "Yes, I will ❤️",
      noText: "No 😭",
      successTitle: "You said yes!",
      successText:
        "This is the beginning of something beautiful.",
      icon: <Heart size={50} fill="currentColor" />,
    },

    "love-letter": {
      label: "A LETTER FROM MY HEART",
      small: "Something I wanted you to know...",
      question: "A little",
      questionHighlight: " love letter for you.",
      yesText: "I love it ❤️",
      noText: "Maybe later",
      successTitle: "You are special!",
      successText:
        "I hope these words stay with you forever.",
      icon: <Mail size={50} />,
    },

    surprise: {
      label: "JUST A LITTLE SURPRISE",
      small: "I made something for you...",
      question: "You deserve",
      questionHighlight: " something beautiful.",
      yesText: "Aww ❤️",
      noText: "Really?",
      successTitle: "Surprise!",
      successText:
        "I hope this made your day a little brighter.",
      icon: <Gift size={50} />,
    },

    birthday: {
      label: "HAPPY BIRTHDAY",
      small: "Today is all about you...",
      question: "Wishing you",
      questionHighlight: " the happiest birthday!",
      yesText: "Thank you ❤️",
      noText: "Aww...",
      successTitle: "Happy Birthday!",
      successText:
        "May this new year of your life be amazing.",
      icon: <Cake size={50} />,
    },

    celebrate: {
      label: "LET'S CELEBRATE",
      small: "You did something amazing...",
      question: "You deserve",
      questionHighlight: " to be celebrated!",
      yesText: "Thank you ❤️",
      noText: "Stop it 😂",
      successTitle: "You deserve it!",
      successText:
        "Keep going. There are many more beautiful moments ahead.",
      icon: <PartyPopper size={50} />,
    },

    "just-because": {
      label: "FOR SOMEONE SPECIAL",
      small: "No special reason...",
      question: "Just wanted you to know",
      questionHighlight: " you're important to me.",
      yesText: "That's sweet ❤️",
      noText: "Really?",
      successTitle: "Always remember",
      successText:
        "You mean more to me than you probably realize.",
      icon: <Star size={50} fill="currentColor" />,
    },
  };

  const currentOccasion =
    occasionData[occasion] || occasionData.proposal;

  /*
  ========================================
  DESIGN
  ========================================
  */

  const template = surprise.template || surprise.design || "romantic";

  const designClass =
    template === "playful"
      ? "design-playful"
      : template === "simple"
      ? "design-simple"
      : "design-romantic";

  /*
  ========================================
  SUCCESS SCREEN
  ========================================
  */

  if (accepted) {
    return (
      <div className={`preview-page ${designClass} accepted`}>

        <div className="preview-heart heart-one">♥</div>
        <div className="preview-heart heart-two">♥</div>
        <div className="preview-heart heart-three">♥</div>
        <div className="preview-heart heart-four">♥</div>

        <div className="success-screen">

          <div className="success-hearts">
            <span>❤️</span>
            <span>💕</span>
            <span>❤️</span>
          </div>

          <div className="success-icon">
            {currentOccasion.icon}
          </div>

          <div className="success-eyebrow">
            <Sparkles size={15} />
            IT'S SPECIAL
          </div>

          <h1>
            {currentOccasion.successTitle}
          </h1>

          <p className="success-description">
            {currentOccasion.successText}{" "}
            {surprise.recipient}.
          </p>

          <div className="success-message">

            <Heart
              size={17}
              fill="currentColor"
            />

            <span>
              A new beautiful memory starts here.
            </span>

          </div>

{/* CREATE YOUR OWN CARD BUTTON */}
<button
  type="button"
  className="create-own-button"
  onClick={() => window.location.href = "/"}
>
  Create a surprise for someone ❤️
</button>

          <button
            type="button"
            className="restart-button"
            onClick={() => setAccepted(false)}
          >
            <Heart size={16} fill="currentColor" />
            See it again
          </button>

        </div>

      </div>
    );
  }

  /*
  ========================================
  MAIN SURPRISE
  ========================================
  */

  return (
    <div className={`preview-page ${designClass}`}>

      {/* BACKGROUND HEARTS */}

      <div className="preview-heart heart-one">♥</div>
      <div className="preview-heart heart-two">♥</div>
      <div className="preview-heart heart-three">♥</div>
      <div className="preview-heart heart-four">♥</div>


      {/* TOP BAR */}

      <div className="preview-topbar">

        <div className="preview-brand">
          <Heart size={16} fill="currentColor" />
          SurpriseMe
        </div>

        <div className="preview-label">
          A SURPRISE FOR YOU
        </div>

      </div>


      {/* CARD */}

      <main className="proposal-container">

        <div className="proposal-card">

          <div className="proposal-glow"></div>

          <div className="proposal-content">

            {/* ICON */}

            <div className="small-heart">
              {currentOccasion.icon}
            </div>


            {/* LABEL */}

            <p className="proposal-label">
              {currentOccasion.label}
            </p>


            {/* RECIPIENT */}

            <h1>
              Hey{" "}
              <span>
                {surprise.recipient || "there"}
              </span>
              ...
            </h1>


            {/* DIVIDER */}

            <div className="message-divider">

              <span></span>

              <Heart
                size={13}
                fill="currentColor"
              />

              <span></span>

            </div>


            {/* MESSAGE */}

            <p className="proposal-message">
              {surprise.message ||
                "Some words from the heart, just for you."}
            </p>


            {/* QUESTION */}

            <div className="question-section">

              <p className="question-intro">
                {currentOccasion.small}
              </p>

              <h2>

                {currentOccasion.question}

                <span>
                  {currentOccasion.questionHighlight}
                </span>

              </h2>

            </div>


            {/* BUTTONS */}

            <div className="proposal-actions">

              <button
                type="button"
                className="yes-button"
                onClick={() => setAccepted(true)}
              >

                <Heart
                  size={19}
                  fill="currentColor"
                />

                {currentOccasion.yesText}

              </button>


              <button
                type="button"
                className="no-button"
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }}
              >
                {currentOccasion.noText}
              </button>

            </div>


            {/* FOOTER */}

            <p className="proposal-footer">

              Made with love by{" "}

              {surprise.sender || "someone special"}

            </p>
           

          </div>

        </div>

      </main>

    </div>
  );
}

export default PublicSurprise;