/** Research design point carried from the Taraka X-1 twin-duct study. */
export const DESIGN = {
  mtow: "1,537 kg",
  mtowNote: "Nominal OpenMDAO point",
  conservativeMtow: "1,850 kg",
  owe: "886 kg",
  payload: "600 kg",
  ducts: "2 × 2.80 m",
  diskArea: "12.32 m²",
  diskLoading: "1,224 Pa",
  diskLoadingImperial: "25.6 lb/ft²",
  hoverPower: "495 kW",
  cruisePower: "235 kW",
  cruiseSpeed: "450 km/h",
  range: "1,500 km",
  noise: "< 58 dBA",
  noiseNote: "100 m sideline, design target",
  fuel: "42 kg LH₂",
  tank: "~68 kg",
  fuelCell: "235 kW",
  battery: "123 kg",
  dihedral: "+7°",
  lip: "n = 2.50",
  contraction: "1.18",
  diffuser: "6.91°",
  areaRatio: "1.25",
  augmentation: "≈ 1.26",
  blades: "5 + 5 coaxial",
  vanes: "7 stator vanes",
  ld: "10",
};

export const CREW = [
  { role: "Pilot", mass: "80 kg" },
  { role: "Two EMTs", mass: "160 kg" },
  { role: "Trauma paramedic", mass: "80 kg" },
  { role: "Patient and litter", mass: "90 kg" },
  { role: "Critical-care kit", mass: "190 kg" },
];

export const CORRIDORS = [
  { from: "Delhi", to: "Agra", km: "180 km" },
  { from: "Mumbai", to: "Pune", km: "120 km" },
  { from: "Bengaluru", to: "Mysuru", km: "150 km" },
  { from: "Delhi", to: "Lucknow", km: "500 km" },
  { from: "Delhi", to: "Mumbai", km: "1,150 km" },
];
