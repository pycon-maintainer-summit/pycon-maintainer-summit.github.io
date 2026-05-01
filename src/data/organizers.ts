/*
 * Past and present summit organizers.
 *
 * `years` lists every year the person helped organize the summit. The About
 * page sorts so that this year's organizers appear first, then past
 * organizers by most-recent year.
 *
 * `role` is optional — leave blank for plain organizers. Use for
 * differentiated roles like "Assistant".
 *
 * `affiliation` reflects the most recent / most representative affiliation
 * for that person across their organizing years.
 */
export type Organizer = {
  name: string;
  /** Years organized, in any order — sort happens at render time. */
  years: number[];
  role?: string;
  affiliation?: string;
  bio?: string;
  links?: { label: string; href: string }[];
};

export const organizers: Organizer[] = [
  {
    name: "Inessa Pawson",
    years: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
    affiliation: "NumPy, OpenTeams",
  },
  {
    name: "Leah Wasser",
    years: [2024, 2025, 2026],
    affiliation: "pyOpenSci, all-contributors, stravalib",
  },
  {
    name: "Mariatta Wijaya",
    years: [2025, 2026],
    affiliation: "PyLadies, CPython",
  },
  {
    name: "Kara Sowles",
    years: [2023, 2024],
    affiliation: "GitHub",
  },
  {
    name: "Chris Rose",
    years: [2024],
    affiliation: "PyHamcrest, GitHub",
  },
  {
    name: "Abigail Cabunoc Mayes",
    years: [2023],
    affiliation: "GitHub, SustainOSS, OpenJS",
  },
  {
    name: "Alexandre de Siqueira",
    years: [2021, 2022, 2023],
    affiliation: "Berkeley Institute for Data Science, scikit-image",
  },
  {
    name: "David Charboneau",
    years: [2021],
    affiliation: "Open Teams",
  },
  {
    name: "Caroline Dantas",
    years: [2020],
    affiliation: "SciPy Latin America, PyLadies Brazil",
  },
  {
    name: "Cooper Lees",
    years: [2020],
    affiliation: "Facebook, PyPA, Bandersnatch",
  },
  {
    name: "Jackie Kazil",
    years: [2019],
  },
  {
    name: "Shauna Gordon-McKeon",
    years: [2019],
  },
  {
    name: "Mel Chua",
    years: [2019],
    role: "Assistant",
  },
];

/** The year of the upcoming/current summit — used to flag "this year" organizers. */
export const currentYear = 2026;
