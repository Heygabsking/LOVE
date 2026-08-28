import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Gift,
  Cake,
  PartyPopper,
  Star,
  Mail,
  Home as HomeIcon,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react";

function Preview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  if (!state) {
    navigate("/create");
    return null;
  }

  /*
  ========================================
  OCCASION INFORMATION
  ========================================
  */

  const occasion = state.occasion || "proposal";

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

  const template = state.template || "romantic";

  const designClass =
    template === "playful"
      ? "design-playful"
      : template === "simple"
      ? "design-simple"
      : "design-romantic";

  /*
  ========================================
  MOVE NO BUTTON
  ========================================
  */

  const moveNoButton = () => {
    const x = Math.floor(Math.random() * 220) - 110;
    const y = Math.floor(Math.random() * 160) - 80;

    setNoPosition({
      x,
      y,
    });
  };

  /*
  ========================================
  EDIT SURPRISE
  ========================================
  */

  const editSurprise = () => {
    navigate("/create", {
      state: {
        ...state,
        photos: state.photos || [],
      },
    });
  };

  /*
  ========================================
  BACK HOME
  ========================================
  */

  const goHome = () => {
    navigate("/");
  };

  /*
  ========================================
  SURPRISE LINK
  ========================================
  */

  const surpriseId = state.surpriseId;

  const surpriseLink = surpriseId
    ? `${window.location.origin}/surprise/${surpriseId}`
    : "";

  /*
  ========================================
  COPY LINK
  ========================================
  */

  const copyLink = async () => {
    if (!surpriseLink) {
      alert("Your surprise has not been saved yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(surpriseLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error("Copy failed:", error);

      alert("Could not copy the link.");
    }
  };

  /*
  ========================================
  VIEW SURPRISE
  ========================================
  */

  const viewSurprise = () => {
    if (!surpriseLink) {
      alert("Your surprise has not been saved yet.");
      return;
    }

    window.open(surpriseLink, "_blank");
  };

  /*
  ========================================
  SHARE SURPRISE
  ========================================
  */

  const shareSurprise = async () => {
    if (!surpriseLink) {
      alert("Your surprise has not been saved yet.");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "A special surprise for you ❤️",
          text: "I made something special for you.",
          url: surpriseLink,
        });
      } catch (error) {
        console.log("Sharing cancelled.");
      }
    } else {
      await copyLink();
    }
  };

  return (
    <div
      className={`preview-page ${designClass} ${
        accepted ? "accepted" : ""
      }`}
    >

      {/* ========================================
          BACKGROUND HEARTS
          ======================================== */}

      <div className="preview-heart heart-one">♥</div>
      <div className="preview-heart heart-two">♥</div>
      <div className="preview-heart heart-three">♥</div>
      <div className="preview-heart heart-four">♥</div>


      {/* ========================================
          TOP BAR
          ======================================== */}

      <div className="preview-topbar">

        <button
          type="button"
          className="preview-back"
          onClick={editSurprise}
        >
          <ArrowLeft size={17} />
          Edit surprise
        </button>

        <div className="preview-brand">
          <Heart size={16} fill="currentColor" />
          SurpriseMe
        </div>

        <div className="preview-label">
          PREVIEW
        </div>

      </div>


      {/* ========================================
          SUCCESS SCREEN
          ======================================== */}

      {accepted ? (

        <div className="success-screen">

          {/* TOP HEARTS */}

          <div className="success-hearts">
            <span>❤️</span>
            <span>💕</span>
            <span>❤️</span>
          </div>


          {/* ICON */}

          <div className="success-icon">
            {currentOccasion.icon}
          </div>


          {/* EYEBROW */}

          <div className="success-eyebrow">
            <Sparkles size={15} />
            IT'S SPECIAL
          </div>


          {/* TITLE */}

          <h1>
            {currentOccasion.successTitle}
          </h1>


          {/* DESCRIPTION */}

          <p className="success-description">
            {currentOccasion.successText}{" "}
            {state.recipient}.
          </p>


          {/* MEMORY MESSAGE */}

          <div className="success-message">

            <Heart
              size={17}
              fill="currentColor"
            />

            <span>
              A new beautiful memory starts here.
            </span>

          </div>


          {/* ========================================
              MAIN BUTTONS
              ======================================== */}

          <div className="success-actions">

            <button
              type="button"
              className="restart-button"
              onClick={() => setAccepted(false)}
            >
              <RotateCcw size={16} />
              See it again
            </button>


            <button
              type="button"
              className="home-success-button"
              onClick={goHome}
            >
              <HomeIcon size={16} />
              Back to home
            </button>

          </div>


          {/* ========================================
              SHARE SECTION
              ======================================== */}

          <div className="share-section">

            <h3>
              Your surprise is ready <span>💖</span>
            </h3>

            <p>
              Send this special link to{" "}
              <strong>
                {state.recipient || "them"}
              </strong>
              .
            </p>


            <div className="share-actions">

              {/* VIEW */}

              <button
                type="button"
                className="share-button primary-share"
                onClick={viewSurprise}
              >
                <ExternalLink size={16} />
                View surprise
              </button>


              {/* COPY */}

              <button
                type="button"
                className="share-button"
                onClick={copyLink}
              >
                <Copy size={16} />

                {copied
                  ? "Copied!"
                  : "Copy link"}
              </button>


              {/* SHARE */}

              <button
                type="button"
                className="share-button"
                onClick={shareSurprise}
              >
                <Share2 size={16} />
                Share with them
              </button>

            </div>

          </div>

        </div>

      ) : (

        /* ========================================
           NORMAL PREVIEW
           ======================================== */

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
                  {state.recipient || "there"}
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
                {state.message ||
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


              {/* ACTION BUTTONS */}

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
                {state.sender || "someone special"}
              </p>

            </div>

          </div>

        </main>

      )}

    </div>
  );
}

export default Preview;