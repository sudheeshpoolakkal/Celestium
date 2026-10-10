import { ArrowRight } from "./icons";

export function ArchitectureMap() {
  return (
    <div
      className="architecture-map"
      aria-label="MALUS architecture: common flight systems connect through a defined interface to the selected mission module"
    >
      <div className="map-platform">
        <p className="diagram-kicker">The common platform</p>
        <h3>MALUS</h3>
        <div className="map-systems">
          <div>
            <span>01</span>
            <strong>Lift</strong>
            <p>Tilting ducts and propulsion</p>
          </div>
          <div>
            <span>02</span>
            <strong>Energy</strong>
            <p>Storage and electrical power</p>
          </div>
          <div>
            <span>03</span>
            <strong>Control</strong>
            <p>Flight and transition control</p>
          </div>
        </div>
      </div>
      <div className="map-interface">
        <span>
          Defined
          <br />
          mission interface
        </span>
        <ArrowRight size={24} />
      </div>
      <div className="map-missions">
        <p className="diagram-kicker">The mission module</p>
        <div>
          <span>01</span>
          <h4>Medical</h4>
          <p>Patient, team and equipment</p>
        </div>
        <div>
          <span>02</span>
          <h4>Cargo</h4>
          <p>Utility pallet and tie-downs</p>
        </div>
        <div>
          <span>03</span>
          <h4>Research</h4>
          <p>Instruments and ballast</p>
        </div>
      </div>
    </div>
  );
}

export function DuctSection() {
  return (
    <figure className="technical-figure duct-section">
      <div className="diagram-viewport" role="region" aria-label="Duct section drawing" tabIndex={0}>
        <svg viewBox="0 0 800 350" role="img" aria-labelledby="duct-title duct-description">
          <title id="duct-title">Duct meridional section</title>
          <desc id="duct-description">
            Schematic inlet lip, two coaxial rotor stations, stator row and expanding diffuser. The airflow
            moves from the inlet on the left to the outlet on the right.
          </desc>
          <defs>
            <pattern
              id="duct-hatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path d="M0 0V8" stroke="#bbc8bd" strokeWidth="2" />
            </pattern>
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="m0 0 10 5-10 5Z" fill="#617f6a" />
            </marker>
          </defs>
          <path
            d="M78 164C67 108 91 75 134 84C165 91 199 113 255 114H440C500 114 563 104 682 83L706 81L704 111C579 132 516 143 445 143H258C201 143 162 131 126 119C103 111 95 129 99 164Z"
            fill="url(#duct-hatch)"
            stroke="#4b6054"
            strokeWidth="1.5"
          />
          <path
            d="M78 186C67 242 91 275 134 266C165 259 199 237 255 236H440C500 236 563 246 682 267L706 269L704 239C579 218 516 207 445 207H258C201 207 162 219 126 231C103 239 95 221 99 186Z"
            fill="url(#duct-hatch)"
            stroke="#4b6054"
            strokeWidth="1.5"
          />
          <path d="M40 175H744" stroke="#a1b3a5" strokeDasharray="5 6" />
          <g stroke="#233a2c" strokeWidth="4">
            <path d="M305 144V207M349 144V207" />
            <path d="M389 146V204" strokeWidth="3" />
          </g>
          <path d="M286 165H368V185H286Z" fill="#566e5b" />
          <path d="M268 175L287 165V185Z" fill="#566e5b" />
          <g fill="none" stroke="#617f6a" strokeWidth="1.5" markerEnd="url(#flow-arrow)">
            <path d="M35 149C91 147 118 154 227 159" />
            <path d="M417 162C498 162 594 150 746 135" />
            <path d="M35 201C91 203 118 196 227 191" />
            <path d="M417 188C498 188 594 200 746 215" />
          </g>
          <g fontFamily="var(--sans)" fontSize="16" fill="#26392d">
            <text x="55" y="37">
              Inlet lip
            </text>
            <text x="266" y="37">
              Coaxial rotors
            </text>
            <text x="513" y="37">
              Diffuser
            </text>
            <text x="385" y="306">
              Stator row
            </text>
          </g>
          <g fill="none" stroke="#768a7b" strokeWidth="1">
            <path d="M102 48V83M330 49V111M567 49V100M391 293V237" />
          </g>
          <g fontFamily="var(--mono)" fontSize="12" fill="#596e5f">
            <text x="55" y="326">
              INLET
            </text>
            <text x="650" y="326">
              OUTLET
            </text>
            <text x="604" y="306">
              SCHEMATIC SECTION
            </text>
          </g>
        </svg>
      </div>
      <p className="diagram-scroll-hint">
        Scroll across to inspect the section <ArrowRight size={14} />
      </p>
      <figcaption>
        <span>Two coaxial five-blade rotors and seven stator vanes per duct.</span>
        <span>Research geometry / Not to scale</span>
      </figcaption>
    </figure>
  );
}

export function CabinDiagram() {
  return (
    <figure className="technical-figure cabin-figure">
      <div
        className="cabin-schematic"
        role="img"
        aria-label="Conceptual medical cabin, front to rear: pilot cockpit, one patient litter, three clinical seats and a medical equipment console, with side access and an aft loading ramp."
      >
        <span className="cabin-direction">Forward</span>
        <div className="cabin-cockpit">
          <span>Cockpit</span>
          <div>Pilot</div>
        </div>
        <div className="cabin-bay">
          <span>Medical mission bay</span>
          <div className="cabin-litter">
            <span className="medical-cross" aria-hidden="true">
              +
            </span>
            Patient + litter
          </div>
          <div className="cabin-seat seat-one">EMT 01</div>
          <div className="cabin-seat seat-two">EMT 02</div>
          <div className="cabin-seat seat-three">Paramedic</div>
          <div className="cabin-equipment">Clinical equipment</div>
          <span className="cabin-side-access">Side access</span>
        </div>
        <div className="cabin-ramp">
          <span>
            Aft
            <br />
            loading
          </span>
          <ArrowRight />
        </div>
      </div>
      <figcaption>
        <span>Single-patient medical concept / Three clinical seats</span>
        <span>Layout schematic / Not to scale</span>
      </figcaption>
    </figure>
  );
}
