export interface LabelHeaderHome {
  id: number;
  title: string;
  href: string;
}

const LABELS_HEADER_HOME: LabelHeaderHome[] = [
  {
    id: 1,
    title: "Home",
    href: "#home",
  },
  {
    id: 2,
    title: "Services",
    href: "#services",
  },
  {
    id: 3,
    title: "Pricing",
    href: "#pricing",
  },
];

export default LABELS_HEADER_HOME;
