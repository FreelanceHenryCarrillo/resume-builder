import { IResumeBuilder } from "@/interfaces/SResume";

export const sampleResume: IResumeBuilder = {
  basics: {
    name: "John Doe",
    headline: "Creative and Innovative Web Developer",
    email: "john.doe@gmail.com",
    phone: "(555) 123-4567",
    location: "Pleasantville, CA 94588",
    url: {
      label: "",
      href: "https://johndoe.me/",
    },
    picture: {
      url: "https://i.imgur.com/HgwyOuJ.jpg",
      size: "",
      borderRadius: "",
    },
  },
  sections: {
    education: {
      name: "Education",
      visible: true,
      id: "education",
      items: [
        {
          id: "yo3p200zo45c6cdqc6a2vtt3",
          name: "University of California",
          institution: "University of California",
          studyType: "Bachelor's in Computer Science",
          area: "Berkeley, CA",
          score: "",
          date: "August 2012 to May 2016",
          summary: "<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>",
          url: {
            label: "",
            href: "",
          },
        },
      ],
    },
    experience: {
      name: "Experience",
      visible: true,
      id: "experience",
      items: [
        {
          id: "lhw25d7gf32wgdfpsktf6e0x",
          name: "Creative Solutions Inc.",
          company: "Creative Solutions Inc.",
          position: "Senior Web Developer",
          location: "San Francisco, CA",
          date: "January 2019 to Present",
          summary:
            "<ul><li><p>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</p></li><li><p>Developed and implemented a new responsive framework, improving cross-device compatibility.</p></li><li><p>Mentored a team of four junior developers, fostering a culture of technical excellence.</p></li></ul>",
          url: {
            label: "",
            href: "https://creativesolutions.inc/",
          },
        },
        {
          id: "r6543lil53ntrxmvel53gbtm",
          name: "TechAdvancers",
          company: "TechAdvancers",
          position: "Web Developer",
          location: "San Jose, CA",
          date: "June 2016 to December 2018",
          summary:
            "<ul><li><p>Collaborated in a team of 10 to develop high-quality web applications using React.js and Node.js.</p></li><li><p>Managed the integration of third-party services such as Stripe for payments and Twilio for SMS services.</p></li><li><p>Optimized application performance, achieving a 30% reduction in load times.</p></li></ul>",
          url: {
            label: "",
            href: "https://techadvancers.com/",
          },
        },
      ],
    },
    languages: {
      name: "Languages",
      visible: true,
      id: "languages",
      items: [],
    },
    skills: {
      name: "Skills",
      visible: true,
      id: "skills",
      items: [
        {
          id: "hn0keriukh6c0ojktl9gsgjm",
          name: "Web Technologies",
          description: "Advanced",
          level: 0,
        },
        {
          id: "r8c3y47vykausqrgmzwg5pur",
          name: "Web Frameworks",
          description: "Intermediate",
          level: 0,
        },
        {
          id: "b5l75aseexqv17quvqgh73fe",
          name: "Tools",
          description: "Intermediate",
          level: 0,
        },
      ],
    },
  },
  metadata: {
    template: "onyx",
    layout: [
      [
        ["experience", "education"],
        ["skills", "languages"],
      ],
    ],
    css: {
      value:
        ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
      visible: false,
    },
    page: {
      margin: 4,
      format: "a4",
    },
    theme: {
      background: "#CCCCCC",
      color: "#CCCCCC",
    },
    typography: {
      font: {
        family: "",
        subset: "",
        variants: [],
        size: 14,
      },
      lineHeight: 1.5,
    },
  },
};
