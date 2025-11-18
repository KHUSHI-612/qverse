import { useEffect, useRef } from 'react';

const Facts = [
  {
    text: "The universe is not just expanding — it's accelerating faster than the speed of light itself.",
    name: "Saul Perlmutter",
    role: "Nobel Prize–Winning Astrophysicist"
  },
  {
    text: "The human brain generates enough electricity to power a small light bulb.",
    name: "Neuroscience Research",
    role: "University of Berkeley"
  },
  {
    text: "Octopuses have three hearts and blue blood, making them one of Earth's strangest animals.",
    name: "Jacques Cousteau",
    role: "Ocean Explorer"
  },
  {
    text: "There are more stars in the universe than grains of sand on all the beaches on Earth.",
    name: "Carl Sagan",
    role: "Astronomer"
  },
  {
    text: "The deepest point on Earth, the Mariana Trench, is deeper than Mount Everest is tall.",
    name: "NOAA ",
    role: "(National Oceanic and Atmospheric Administration)"
  },
  {
    text: "If you shuffle a deck of cards properly, the exact order has almost certainly never existed before in the history of the universe.",
    name: "— Mathematical Fact — 52! Combinatorics",
    role: ""
  },
  {
    text: "The largest living structure on Earth is visible from space — the Great Barrier Reef.",
    name: "UNESCO World Heritage Centre",
    role: ""
  },
  {
    text: "The fastest human-made object travels at over 690,000 km/h — the Parker Solar Probe.",
    name: "NASA (2023)",
    role: ""
  }
];

// Duplicate testimonials for seamless loop
const duplicatedFacts = [...Facts, ...Facts];

export default function FactsCarousel() {
  const trackRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 320; // Width of each card + gap
    const scrollSpeed = 0.5; // Pixels per frame

    const animate = () => {
      scrollPositionRef.current += scrollSpeed;

      // Reset position when we've scrolled through one full set of facts
      if (scrollPositionRef.current >= cardWidth * Facts.length) {
        scrollPositionRef.current = 0;
      }

      track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="facts-carousel-container">
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: 'var(--text)' }}>
        Facts You Can’t Ignore
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--muted)', fontSize: '16px' }}>
        Because the truth is crazier than fiction.
      </p>
      <div className="facts-carousel-wrapper">
        <div className="facts-carousel-track" ref={trackRef}>
          {duplicatedFacts.map((fact, index) => (
  <div key={index} className="fact-card-square">
    <p className="fact-text">"{fact.text}"</p>
    <div className="fact-author">
      <p className="fact-name">{fact.name}</p>
      <p className="fact-role">{fact.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

