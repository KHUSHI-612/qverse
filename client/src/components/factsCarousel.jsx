const Facts = [
  {
    text: "The universe is not just expanding — it's accelerating faster than the speed of light itself.",
    name: "Saul Perlmutter",
    role: "Nobel Prize Winning Astrophysicist"
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

// Duplicate list for seamless looping
const duplicatedFacts = [...Facts, ...Facts];

export default function FactsCarousel() {
  return (
    <div className="facts-carousel-container">
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: 'var(--text)' }}>
        Facts You Can’t Ignore
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--muted)', fontSize: '16px' }}>
        Because the truth is crazier than fiction.
      </p>
      <div className="facts-carousel-wrapper">
        <div className="facts-carousel-track">
          {duplicatedFacts.map((fact, index) => (
            <div key={index} className="facts-card-square">
              <p className="facts-text">"{fact.text}"</p>
              <div className="facts-author">
                <p className="facts-name">{fact.name}</p>
                <p className="facts-role">{fact.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

