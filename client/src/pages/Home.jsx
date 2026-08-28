import { useNavigate } from "react-router-dom";
import {
  Heart,
  Sparkles,
  ArrowRight,
  Mail,
  Gift,
  Cake,
  PartyPopper,
  Star,
  ShieldCheck,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  // Scroll down to the cards
  const scrollToOptions = () => {
    document.getElementById("surprise-options")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Open Create page with the selected occasion
  const createSurprise = (occasion) => {
    navigate("/create", {
      state: {
        occasion: occasion,
      },
    });
  };

  return (
    <div className="home-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="home-header">

        <div className="home-logo">

          <div className="home-logo-icon">
            <Heart size={20} fill="white" />
          </div>

          <span>SurpriseMe</span>

        </div>

        <button
          type="button"
          className="home-nav-button"
          onClick={scrollToOptions}
        >
          Create a surprise
        </button>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section className="home-hero">

          <div className="home-eyebrow">
            <Sparkles size={15} />
            MAKE SOMEONE FEEL SPECIAL
          </div>

          <h1>
            Say it in a way
            <span>they'll never forget.</span>
          </h1>

          <p>
            Create a beautiful little surprise for someone you care about.
            Add your message, memories and a little magic — then send them
            one special link.
          </p>

          <button
            type="button"
            className="home-main-button"
            onClick={scrollToOptions}
          >
            Create a surprise
            <ArrowRight size={18} />
          </button>

          <div className="home-note">
            <ShieldCheck size={14} />
            No account required · Free to create
          </div>

        </section>


        {/* =========================
            EXAMPLE CARD
        ========================= */}

        <section className="home-example">

          <div className="example-glow"></div>

          <div className="example-card">

            <div className="example-top">
              <span>FOR SOMEONE SPECIAL</span>
              <Heart size={16} fill="currentColor" />
            </div>

            <div className="example-heart">
              <Heart size={40} fill="currentColor" />
            </div>

            <p className="example-small">
              I have something to ask you...
            </p>

            <h2>
              Sarah,
              <span>will you be mine?</span>
            </h2>

            <p className="example-message">
              Some people come into your life and somehow make everything
              feel a little brighter.
            </p>

            <div className="example-buttons">
              <span>Yes ❤️</span>
              <span>Maybe...</span>
            </div>

          </div>

        </section>


        {/* =========================
            WHAT CAN YOU CREATE?
        ========================= */}

        <section
          id="surprise-options"
          className="home-options-section"
        >

          <div className="home-section-heading">

            <div className="home-eyebrow">
              <Sparkles size={15} />
              ONE WEBSITE, MANY MOMENTS
            </div>

            <h2>
              Make any moment
              <span>more meaningful.</span>
            </h2>

            <p>
              It doesn't have to be romantic. Create something beautiful
              for anyone who means something to you.
            </p>

          </div>


          <div className="home-options">

            {/* =========================
                1. ASK THEM TO BE YOURS
            ========================= */}

            <div className="home-option featured-option">

              <div className="option-icon">
                <Heart size={27} fill="currentColor" />
              </div>

              <div className="option-tag">
                MOST POPULAR
              </div>

              <h3>
                Ask them to be yours
              </h3>

              <p>
                Create a romantic surprise and finally ask the question
                you've been thinking about.
              </p>

              <button
                type="button"
                onClick={() => createSurprise("proposal")}
              >
                Create this
                <ArrowRight size={15} />
              </button>

            </div>


            {/* =========================
                2. LOVE LETTER
            ========================= */}

            <div className="home-option">

              <div className="option-icon">
                <Mail size={27} />
              </div>

              <h3>
                Write a love letter
              </h3>

              <p>
                Turn your feelings into a beautiful digital letter that
                they can keep forever.
              </p>

              <button
                type="button"
                onClick={() => createSurprise("love-letter")}
              >
                Create this
                <ArrowRight size={15} />
              </button>

            </div>


            {/* =========================
                3. SURPRISE SOMEONE
            ========================= */}

            <div className="home-option">

              <div className="option-icon">
                <Gift size={27} />
              </div>

              <h3>
                Surprise someone
              </h3>

              <p>
                Send a thoughtful message just because you want to make
                someone's day better.
              </p>

              <button
                type="button"
                onClick={() => createSurprise("surprise")}
              >
                Create this
                <ArrowRight size={15} />
              </button>

            </div>


            {/* =========================
                4. BIRTHDAY
            ========================= */}

            <div className="home-option">

              <div className="option-icon">
                <Cake size={27} />
              </div>

              <h3>
                Birthday surprise
              </h3>

              <p>
                Make their birthday a little more personal with your own
                words and memories.
              </p>

              <button
                type="button"
                onClick={() => createSurprise("birthday")}
              >
                Create this
                <ArrowRight size={15} />
              </button>

            </div>


            {/* =========================
                5. CELEBRATE
            ========================= */}

            <div className="home-option">

              <div className="option-icon">
                <PartyPopper size={27} />
              </div>

              <h3>
                Celebrate someone
              </h3>

              <p>
                Congratulations, achievements, new beginnings or simply
                a reason to celebrate.
              </p>

              <button
                type="button"
                onClick={() => createSurprise("celebrate")}
              >
                Create this
                <ArrowRight size={15} />
              </button>

            </div>


            {/* =========================
                6. JUST BECAUSE
            ========================= */}

            <div className="home-option">

              <div className="option-icon">
                <Star size={27} />
              </div>

              <h3>
                Just because
              </h3>

              <p>
                Sometimes you don't need a reason. Just let someone know
                they're important to you.
              </p>

              <button
                type="button"
                onClick={() => createSurprise("just-because")}
              >
                Create this
                <ArrowRight size={15} />
              </button>

            </div>

          </div>

        </section>


        {/* =========================
            HOW IT WORKS
        ========================= */}

        <section className="home-how">

          <div className="home-section-heading">

            <div className="home-eyebrow">
              <Heart size={15} />
              THREE SIMPLE STEPS
            </div>

            <h2>
              From your heart
              <span>to their screen.</span>
            </h2>

          </div>


          <div className="home-steps">

            <div className="home-step">

              <div className="step-circle">
                01
              </div>

              <h3>
                Create it
              </h3>

              <p>
                Tell us who it's for, write your message and add some
                photos if you want.
              </p>

            </div>


            <div className="home-step">

              <div className="step-circle">
                02
              </div>

              <h3>
                Make it yours
              </h3>

              <p>
                Choose the design and preview exactly what your surprise
                will look like.
              </p>

            </div>


            <div className="home-step">

              <div className="step-circle">
                03
              </div>

              <h3>
                Send the link
              </h3>

              <p>
                Share one beautiful link with them and let the surprise
                begin.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            FINAL CTA
        ========================= */}

        <section className="home-final-cta">

          <div className="final-cta-heart">
            <Heart size={28} fill="currentColor" />
          </div>

          <h2>
            Someone deserves
            <span>a little surprise.</span>
          </h2>

          <p>
            Make something they'll remember.
          </p>

          <button
            type="button"
            className="home-main-button"
            onClick={scrollToOptions}
          >
            Start creating
            <ArrowRight size={18} />
          </button>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="home-footer">

        <div className="footer-brand">
          <Heart size={14} fill="currentColor" />
          SurpriseMe
        </div>

        <span>
          Made with love.
        </span>

      </footer>

    </div>
  );
}

export default Home;