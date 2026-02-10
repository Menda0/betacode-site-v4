import Hero from "./components/hero";
import { Services } from "./components/services";
import { Feature } from "./components/feature";
import { CTA } from "./components/cta";
import { TraditionalBusinessIcon, TechCocampaniesIcon, StartupsIcon } from "./components/icons";
import { Clients } from "./components/clients";
import { Footer } from "./components/footer";
import { Testimonials } from "./components/testimonials";

const services = {
  "external-tech-team": {
    name: "External Tech Team",
    description: "A complete dedicated team with 100% time allocated to your business. From developers to project managers—everything you need to create your custom software.",
  },
  "tech-consulting": {
    name: "Tech Consulting",
    description: "We help bring your software to life. Share your idea with us, and we'll guide you toward the best technology and infrastructure to host it.",
  },
  "tech-support": {
    name: "Tech Support",
    description: "Small, punctual jobs to create custom scripts, develop integrations with third-party services, perform bugfixes and debugging, and provide overall technical support and maintenance for existing software systems.",
  },
  "tech-training": {
    name: "Tech Training",
    description: "We provide training programs that help your team learn and adapt to new technologies. From one-on-one sessions to larger audiences, we can help your team understand programming languages, technologies, best practices, and more.",
  },
  "team-augmentation": {
    name: "Team Augmentation",
    description: "Outsourcing services tailored to your needs—from Python to JavaScript or from developer to product owner—we can provide the professionals to help you grow your team.",
  },
  "internalization": {
    name: "Internalization",
    description: "We help you hire the best people for your company. Start by outsourcing our professionals, and if you want, you can hire them directly to your team—making trials easier and ensuring the best professionals are on your team.",
  },
  "mvp-development": {
    name: "MVP Development",
    description: "Let's create a plan to bring your project to life. We believe startups should be fast-paced, evolving companies. Let's make a 3-month plan to bring your software to life.",
  },
}

const features = [
  {
    id: "traditional-business",
    title: "Traditional Business",
    subtitle: "Solutions for Traditional Businesses",
    description: "For traditional businesses with no technical expertise, you need the right technology partner to drive your digital transformation without disrupting your core operations—bringing your software to life.",
    icon: <TraditionalBusinessIcon />,
    color: "orange",
    side: "left",
    services: [
      services["external-tech-team"],
      services["tech-consulting"],
      services["tech-support"],
      services["tech-training"],
    ],
    benefits:[
      "Full-time dedicated team that understands your industry",
      "Seamless integration with your existing business processes",
      "Flexible engagement models to fit your needs",
      "Scalable solutions that grow with your business",
      "Partner that understands your business and your goals, not just your technology needs",
    ]
  },
  {
    id: "tech-companies",
    title: "Tech Companies",
    subtitle: "Solutions for Tech Companies",
    description: "Your organization has a solid business foundation with established teams. What you need is the right technology partner to drive your digital transformation without disrupting your core operations.",
    icon: <TechCocampaniesIcon />,
    color: "indigo",
    side: "right",
    services: [
      services["team-augmentation"],
      services["internalization"],
      services["tech-consulting"],
      services["tech-training"],
    ],
    benefits:[
      "Full-time dedicated team that understands your industry",
      "Seamless integration with your existing business processes",
      "Flexible engagement models to fit your needs",
      "Scalable solutions that grow with your business",
      "Partner that understands your business and your goals, not just your technology needs",
    ]
  },

  {
    id: "startups",
    title: "Startups",
    subtitle: "Solutions for Startups",
    description: "Your organization has a solid business foundation with established teams. What you need is the right technology partner to drive your digital transformation without disrupting your core operations.",
    icon: <StartupsIcon />,
    color: "green",
    side: "left",
    services: [
      services["external-tech-team"],
      services["internalization"],
      services["tech-consulting"],
      services["mvp-development"],
    ],
    benefits:[
      "Full-time dedicated team that understands your industry",
      "Seamless integration with your existing business processes",
      "Flexible engagement models to fit your needs",
      "Scalable solutions that grow with your business",
      "Partner that understands your business and your goals, not just your technology needs",
    ]
  },
]
export default function Home() {
  return (
    <>
      <Hero />
      <Services /> 
      {features.map((feature) => (
        <Feature key={feature.title} feature={feature} />
      ))}
      {/* <Testimonials /> */}
      <Clients />
      
      <CTA />
      <Footer />
    </>
  );
}
