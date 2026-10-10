# Taraka X-1 — public design basis

Edition: 7 October 2026. Stage: concept development.

MALUS is the Modular Aerial Lift Utility System, the research program under which electric and hybrid VTOL aircraft are developed. Taraka X-1 is its first aircraft concept, created for the medical ambulance mission. The public website presents a twin tilting-duct medical transport configuration.

## Selected source and configuration

The public values are carried from `docs/07_TWIN_DUCT_AMBULANCE_ARCHITECTURE.md` in the Taraka X-1 research repository, dated September 2026. Its primary point uses two 2.80 m ducts with a total disk area of approximately 12.315 m².

The aircraft has not flown. The website artwork is illustrative. The interactive geometry and analytic flow field are exploratory design tools, not evidence of completed hardware or a validated aerodynamic solution.

## Nominal study point

| Parameter | Reported value | Interpretation |
|---|---|---|
| Takeoff mass | 1,537 kg | Original convergence; tank vessel omitted |
| Operational empty mass | 886 kg | Original nominal result |
| Mission load | 600 kg | Target allocation including pilot |
| Duct diameter | 2 × 2.80 m | Twin-duct configuration |
| Total disk area | 12.315 m² | Geometric area of both ducts |
| Corrected disk loading | 1,224 Pa | Nominal weight / total disk area |
| Hover power | 495 kW | Original sizing output |
| Cruise / fuel-cell power | 235 kW | Original sizing output |
| Battery mass | 123 kg | Original sizing output |
| Hydrogen fuel | 42 kg | Original usable-fuel allocation |
| Additional tank vessel | ~68 kg at 38% gravimetric efficiency | Absent from original convergence |
| Cruise speed | 450 km/h | Research target |
| Design range | 1,500 km | Research target |
| Sideline noise | Below 58 dBA at 100 m | Research objective, unmeasured |

## What needs correction

The original budget carried hydrogen fuel but omitted the cryogenic vessel, insulation and associated tank hardware. At 38% gravimetric efficiency, 42 kg of fuel corresponds to about 110 kg for fuel plus tank, adding approximately 68 kg of tank hardware. At 30%, the omitted hardware estimate rises to approximately 98 kg.

These are mass-budget estimates. They are not a completed tank design. The original hover power, battery mass and range cannot be claimed to remain valid after adding that mass without an integrated re-convergence.

The nominal structural fraction is 0.26, which is optimistic. The document also discusses a conservative point near 1,850 kg using a fraction around 0.32. That estimate is a sensitivity case rather than an independently validated aircraft specification.

## Other project runs

The repository includes a separate `x22_nextgen/sizing_and_synthesis/twin_duct_ambulance_sizing.json` case, whose primary point starts from 4,000 kg and reports a calculated mass of approximately 3,361 kg. Its mass residual is about -639 kg; it is not the same converged baseline as the 1,537 kg document point. Other reports investigate different duct counts and energy architectures.

The public website does not merge those results. A consistent configuration, provenance and integrated sizing baseline need to be established before performance values become firm program specifications.

## Geometry reconciliation

The visual model and concept artwork present an H-tail. The twin-duct architecture document describes a V-tail. Empennage selection, its aerodynamic behaviour and the geometry baseline remain open work.

The current model is an illustrative parametric configuration. Its cabin and exterior details are not a released production drawing or a dimensional interface definition.

## Priorities for the next engineering phase

1. Re-converge mass, power and mission energy with the tank vessel and thermal systems included.
2. Validate structural mass, duct containment, tilt mechanisms and occupant provisions.
3. Establish aerodynamic interactions, control allocation and fault response through transition.
4. Define usable hydrogen, reserves, battery duty cycle and cooling requirements.
5. Measure acoustics and ground-flow interaction; establish practical operating limits.
6. Specify structural attachments, electrical services, cabin restraint and module mass properties.

## Duct-diameter dataset

`taraka-x1-duct-trade.csv` contains the five reported diameter cases from the same architecture document. Disk loading was corrected in the source; power and battery values remain from the original sizing runs. The source limitations apply to every row.
