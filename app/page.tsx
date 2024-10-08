'use client'
import React, {FC, useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Course";
import Reviews from "./components/Route/Reviews";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ/FAQ";


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  
  return (
    <div>
      <Heading
        title="ELearning"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
    <Hero />
    <Courses />
    <Reviews />
    <FAQ />
    <Footer />
    </div>
  )
};

export default Page;
