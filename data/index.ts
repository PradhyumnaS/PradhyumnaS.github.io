export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Skills", link: "#skills" },
    { name: "Experience", link: "#experience" },
    { name: "Resume", link: "#resume" },
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: [
        { label: "Degree:", value: "Bachelor of Engineering" },
        { label: "Major:", value: "Information Science and Engineering" },
        { label: "City:", value: "Bangalore, India" },
        { label: "Languages:", value: "English, Hindi" }
      ],
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full opacity-10",
      titleClassName: "justify-end",
      img: "/grid3.jpg",
      spareImg: "",
    },
    {
      id: 2,
      title: [
        { label: "IBM", value: "Cybersecurity Analyst Professional Certificate" },
        { label: "Google", value: "Data Analytics Professional Certificate" },
      ],
      description: "My Certifications",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "w-full h-full opacity-5",
      titleClassName: "justify-end", 
      img: "/grid2.jpg",
      spareImg: "",
    },
    {
      id: 3,
      title: "Currently working on a building a specialized LLM",
      description: "The Inside Scoop",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "/grid.svg",
      spareImg: "",
    },
    {
      id: 4,
      title: [
        { label: "ML Engineer", value: "" },
        { label: "Full Stack Developer", value: "" },
      ],
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "My Tech Stack",
      description: "",
      className: "md:col-span-3 md:row-span-1",
      imgClassName: "w-96 h-64 opacity-10",
      titleClassName: "justify-center md:justify-start lg:justify-center font-semibold",
      img: "/b5.svg",
      spareImg: "",
    },
    
  ];
  
  export const projects = [
    {
      id: 1,
      title: "Pneumonia Detection using CNN",
      des: "Engineered a deep convolutional architecture for automated pneumonia diagnosis from radiographic imagery with high precision, seamlessly integrated into a scalable web deployment.",
      img: "/pdcnn.png",
      iconLists: ["/python.svg", "/keras.png", "/tensor.png", "/flask.png", "/ngrok.svg"],
      link: "",
    },
    {
      id: 2,
      title: "Retinal Disease Classification using EfficientNetB0",
      des: "Designed a transfer learning-based system leveraging EfficientNet-B0 to perform multi-class retinal disease classification with advanced diagnostic capabilities.",
      img: "/retinal.jpg",
      iconLists: ["/python.svg", "/pytorch.png", "/PIL.png", "/flask.png", "/ngrok.svg"],
      link: "",
    },
    {
      id: 3,
      title: "Contextual Email Synthesizer",
      des: "Developed a transformer-driven system for generating contextually adaptive, high-fidelity email compositions tailored to dynamic user inputs.",
      img: "/email.png",
      iconLists: ["/python.svg", "/streamlit.png", "/langchain.png", "/clarifai.png"],
      link: "",
    },
    {
      id: 4,
      title: "ChronoSphere",
      des: "Built with Next.js, Firebase, and Tailwind CSS, ChronoSphere blends cutting-edge web tech to create personalized time capsules unlocked by celestial events.",
      img: "/fullstack.png",
      iconLists: ["/nextjs.jpg", "/tail.svg", "/ts.svg", "/firebase.png", "/shadcn.png"],
      link: "",
    },
  ];
  
  export const testimonials = [
    {
      quote:
        "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
      name: "Michael Johnson",
      title: "Director of AlphaStream Technologies",
    },
    {
      quote:
        "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
      name: "Michael Johnson",
      title: "Director of AlphaStream Technologies",
    },
    {
      quote:
        "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
      name: "Michael Johnson",
      title: "Director of AlphaStream Technologies",
    },
    {
      quote:
        "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
      name: "Michael Johnson",
      title: "Director of AlphaStream Technologies",
    },
    {
      quote:
        "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
      name: "Michael Johnson",
      title: "Director of AlphaStream Technologies",
    },
  ];
  
  export const companies = [
    {
      id: 1,
      name: "cloudinary",
      img: "/cloud.svg",
      nameImg: "/cloudName.svg",
    },
    {
      id: 2,
      name: "appwrite",
      img: "/app.svg",
      nameImg: "/appName.svg",
    },
    {
      id: 3,
      name: "HOSTINGER",
      img: "/host.svg",
      nameImg: "/hostName.svg",
    },
    {
      id: 4,
      name: "stream",
      img: "/s.svg",
      nameImg: "/streamName.svg",
    },
    {
      id: 5,
      name: "docker.",
      img: "/dock.svg",
      nameImg: "/dockerName.svg",
    },
  ];
  
  export const workExperience = [
    {
      id: 1,
      title: "RootsGoods - AI Intern",
      desc: "Building an ML pipeline with OpenCV, YOLO, and sklearn for data analysis and quality assessment, while developing domain-specific LLMs using Transformers and LoRA for specialized solutions.",
      className: "md:col-span-2",
      thumbnail: "null",
    },
    {
      id: 2,
      title: "Noesys Software - Data Analyst",
      desc: "Developed an LLM-driven email system with Hugging Face's LLaMA for context-aware communication, and built a web scraper Chrome extension with automated workflows and data analytics for optimized decision-making.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp2.svg",
    },
    {
      id: 3,
      title: "SkillDzire - Intern",
      desc: "Executed offensive operations with tools like Metasploit, Wireshark, and Nmap, and gained expertise in defensive techniques, including SIEM threat correlation, log analysis, and incident response.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "/exp3.svg",
    },
    {
      id: 4,
      title: "OctaNet Services - Developer Intern",
      desc: "Engineered scalable Python applications using OOP principles and advanced libraries like NumPy and Pandas to automate data processing and enhance computational workflows.",
      className: "md:col-span-2",
      thumbnail: "/exp4.svg",
    },
  ];
  
  export const socialMedia = [
    {
      id: 1,
      link: "https://github.com/PradhyumnaS",
      img: "/git.svg",
    },
    {
      id: 2,
      link:"www.linkedin.com/in/pradhyumna-s-62956425b",
      img: "/link.svg",
    },
  ];