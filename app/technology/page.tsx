import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { FlightHero } from "@/components/flight-editorial";
import { ActionLink, ProgramBrief, RelatedPages, SectionLabel } from "@/components/editorial";
import { RevealEffects } from "@/components/landing-interactions";
import { DuctSection } from "@/components/system-diagrams";
import { EnergyDiagram } from "@/components/energy-diagram";
import { DESIGN } from "@/lib/spec";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore the Taraka X-1 concept's tilting duct geometry, hydrogen-electric system and flight-control architecture, with a clear view of the research still ahead.",
};

export default function TechnologyPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site editorial-page technology-page">
        <FlightHero
          eyebrow="Innovation / Engineering & systems"
          title={
            <>
              Engineering
              <br />
              the whole aircraft.
            </>
          }
          description="Lift, energy and control are connected decisions. Explore the systems behind the hydrogen-electric Taraka X-1 concept."
          image="/images/taraka-powertrain-cutaway-v1.webp"
          alt="Taraka X-1 hydrogen-electric powertrain concept illustration"
          href="#ducted-lift"
          action="Explore the systems"
          bell={false}
        />
        <section className="editorial-section container section-first" id="ducted-lift">
          <SectionLabel number="01" detail="Duct geometry / Propulsion">
            Twin tilting ducts
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              Lift and thrust.
              <br />
              <span>Inside the same duct.</span>
            </h2>
            <div>
              <p className="body-large">
                The two 2.80 m ducts are the defining propulsion feature of the research configuration.
              </p>
              <p>
                The inlet, barrel, rotor stations and diffuser form a single aerodynamic system. Its
                performance must be understood at the changing incidence angles encountered during transition.
              </p>
            </div>
          </div>
          <DuctSection />
          <div className="principle-grid" data-reveal>
            <div>
              <span>Inlet / Flow capture</span>
              <h3>A shaped inlet lip.</h3>
              <p>
                A superellipse lip is explored for oblique inflow. The nominal highlight-to-throat area ratio
                is {DESIGN.contraction}.
              </p>
            </div>
            <div>
              <span>Rotor / Acoustic design</span>
              <h3>A shrouded fan system.</h3>
              <p>
                The study uses two contra-rotating five-blade rotors and seven stator vanes. Blade–vane
                interaction and liners are acoustic research topics.
              </p>
            </div>
            <div>
              <span>Diffuser / Pressure recovery</span>
              <h3>An expanding outlet.</h3>
              <p>
                The nominal diffuser half-angle is {DESIGN.diffuser}, with an area ratio of {DESIGN.areaRatio}
                . Flow attachment requires validation.
              </p>
            </div>
          </div>
          <p className="data-note">
            The sideline noise objective is below 58 dBA at 100 m. It is a design target; the aircraft has no
            measured acoustic result.
          </p>
        </section>
        <section className="editorial-section section-sage" id="energy">
          <div className="container">
            <SectionLabel number="02" detail="Storage / Conversion / Distribution">
              Hydrogen-electric energy
            </SectionLabel>
            <div className="section-intro-grid" data-reveal>
              <h2>
                Sustained power.
                <br />
                <span>Supported at the peak.</span>
              </h2>
              <div>
                <p className="body-large">
                  The fuel cell is sized around cruise. The battery buffer supports the higher demand of
                  hover.
                </p>
                <p>
                  The concept pairs liquid-hydrogen storage with a high-temperature PEM fuel cell and
                  direct-drive electric duct motors. Power electronics and thermal management connect the
                  architecture.
                </p>
              </div>
            </div>
            <EnergyDiagram />
            <div className="specification-grid">
              <div>
                <h3>Nominal electrical study</h3>
                <dl>
                  <div>
                    <dt>Fuel-cell output</dt>
                    <dd>{DESIGN.fuelCell}</dd>
                  </div>
                  <div>
                    <dt>Hover demand</dt>
                    <dd>{DESIGN.hoverPower}</dd>
                  </div>
                  <div>
                    <dt>Battery buffer mass</dt>
                    <dd>{DESIGN.battery}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3>Storage & integration</h3>
                <dl>
                  <div>
                    <dt>Hydrogen fuel</dt>
                    <dd>{DESIGN.fuel}</dd>
                  </div>
                  <div>
                    <dt>Additional vessel estimate</dt>
                    <dd>{DESIGN.tank}</dd>
                  </div>
                  <div>
                    <dt>Current work</dt>
                    <dd>Integrated re-sizing</dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="data-note">
              The original sizing counted the fuel but omitted the vessel. Tank gravimetric efficiency,
              insulation, plumbing, cooling and reserves need to be carried through the next integrated mass
              and energy model.
            </p>
          </div>
        </section>
        <section className="editorial-section container" id="flight-control">
          <SectionLabel number="03" detail="Hover / Transition / Cruise">
            Integrated flight control
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              A continuous
              <br />
              <span>change of state.</span>
            </h2>
            <div>
              <p>
                In hover, control authority comes from coordinated thrust and duct tilt. As the aircraft
                accelerates, the aerodynamic surfaces contribute increasingly to the flight response.
              </p>
              <p>
                The design must establish a conversion corridor, control allocation and fault response across
                the entire operating envelope.
              </p>
              <ActionLink href="/aircraft#explore">Explore the duct positions</ActionLink>
            </div>
          </div>
          <div className="flight-phase-grid" data-reveal>
            <div>
              <span>01 / Hover</span>
              <div className="phase-duct phase-hover" aria-hidden="true">
                <i />
                <i />
              </div>
              <h3>Vertical thrust</h3>
              <p>
                Active control must provide stability and attitude authority without relying on forward
                airspeed.
              </p>
            </div>
            <div>
              <span>02 / Transition</span>
              <div className="phase-duct phase-transition" aria-hidden="true">
                <i />
                <i />
              </div>
              <h3>Blended control</h3>
              <p>Duct tilt, thrust and aerodynamic forces interact through the conversion corridor.</p>
            </div>
            <div>
              <span>03 / Cruise</span>
              <div className="phase-duct phase-cruise" aria-hidden="true">
                <i />
                <i />
              </div>
              <h3>Forward flight</h3>
              <p>The ducts provide forward thrust while the airframe contributes lift and stability.</p>
            </div>
          </div>
          <p className="data-note">
            The current visual model uses an H-tail. The twin-duct architecture document also explores a
            V-tail; empennage selection and model reconciliation remain open.
          </p>
        </section>
        <section className="editorial-section section-sage" id="simulation">
          <div className="container">
            <SectionLabel number="04" detail="A design instrument">
              The aircraft studio
            </SectionLabel>
            <div className="section-intro-grid">
              <h2>
                Explore the geometry.
                <br />
                <span>Understand the model.</span>
              </h2>
              <div>
                <p>
                  The interactive studio combines the aircraft geometry with an analytic flow illustration:
                  inlet sinks, duct jets, swirl, trailing vortices and a ground interaction model.
                </p>
                <p>
                  The pathlines and surface colours help inspect a configuration. They are not a CFD solution
                  or a validated prediction of aircraft performance.
                </p>
                <ActionLink href="/aircraft/studio" solid>
                  Open the 3D studio
                </ActionLink>
              </div>
            </div>
          </div>
        </section>
        <RelatedPages current="/technology" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
