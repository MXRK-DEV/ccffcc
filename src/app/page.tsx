"use client"

import React from 'react'
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react";
import Link from "next/link";
// import Footer from '@/components/Footer';


// import DiagramPage from '@/components/Diagram'

// import St from '../components/St'

const items = [
  {
    id: 1,
    color: "bg-white",
    title: "ARE YOU OF HEAVEN OR EARTH?",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://lama.dev",
  },
  {
    id: 2,
    color: "bg-white",
    title: "THE KEY TO THE KINGDOM",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://lama.dev",
  },
  {
    id: 3,
    color: "bg-white",
    title: "TO WHOM DO YOU TITHE?",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://lama.dev",
  },
];



const Homepage = () => {

  const ref = useRef<HTMLDivElement>(null);

  const {scrollYProgress} = useScroll({ target:ref })
  const x = useTransform(scrollYProgress,[0, 1],["0%", "-80%"])

  const skillRef = useRef<HTMLDivElement>(null);
  const isSkillRefInView = useInView(skillRef)

  return (

    <>
    <motion.div 
    className="h-full" 
    initial={{y:"-200vh"}} 
    animate={{y:"0%"}} 
    transition={{ duration: 1 }}>

    <div className=" h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 space-x-6 no-scrollbar  mt-0 ">
      {/* IMAGE CONTAINER */}
      <div className="h-1/2 lg:w-1/2 lg:h-full relative mt-40">
        <Image src="/bible.jpg"alt="bible" className="object-contain" priority={true} width="500" height="300"/>
      </div>
       {/* TEXT CONTAINER */}
       <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-10 items-center justify-center transform mt-2">
        {/* TITLE */}
        <h1 className="text-4xl md:text-4xl font-bold text-black mt-10">Crafting Digital Experiences, Designing Tomorrow.</h1>
        {/* DESC */}
        <p className="md:text-xl lg:text-md text-black ">Welcome to my digital canvas, where innovation and creativity
            converge. With a keen eye for aesthetics and a mastery of code, my
            portfolio showcases a diverse collection of projects that reflect my
            commitment to excellence.</p>  
       </div>
       </div>

    
<div className="h-[200vh]  relative " ref={skillRef}>
<motion.div  initial={{x:"-800px"}} 
            animate={isSkillRefInView ? {x:0} : {}}
            transition={{ delay:0.2 }} className=" flex items-center justify-center text-6xl text-center w-screen h-screen text-black ">A Tour</motion.div>

<Image src="/graph.png"alt="bible"  className="object-contain mx-auto" priority={true} width="1100" height="1100"/>

<h1 className="md:text-xl lg:text-md text-black text-center mt-12">Welcome to my digital canvas, where innovation and creativity converge. With a keen eye for aesthetics and a mastery of code, my portfolio showcases a diverse collection of projects that reflect my commitment to excellence.</h1>  



<div className="h-[200vh]  relative " ref={skillRef}>
<motion.div  initial={{x:"-800px"}} 
            animate={isSkillRefInView ? {x:0} : {}}
            transition={{ delay:0.5 }} className=" flex items-center justify-center text-6xl text-center w-screen h-screen text-black ">A Tour</motion.div>

{/* CARDS */}
<div className=" w-screen  flex flex-wrap justify-center gap-6 p-4"> 
  {items.map((item) => ( <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={item.id}> 
    <Image className="w-full" src={item.img} alt={item.title} width={400} height={250} objectFit="cover" /> 
    <div className="px-6 py-4"> 
      <div className="font-bold text-xl mb-2">{item.title}</div> 
      <p className="text-gray-700 text-base">{item.desc}</p> </div> 
      <div className="px-6 pt-4 pb-2"> 
        <Link href={item.link} passHref> 
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Read More</button> 
      </Link> 
      </div> 
      </div> 
    ))} 
    </div>

    <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center text-center bg-white ">
  <h1 className="text-5xl text-black">Do you have any further questions?</h1>
  <div className="relative ">
  <motion.svg
   animate={{rotate:360}}
   transition={{duration:8, ease:"linear", repeat:Infinity}}
            viewBox="0 0 300 300" className="w-64 h-64  md:w-[500px] md:h-[500px]">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000000">
              <textPath xlinkHref="#circlePath" className="text-xl text-blue">Cross Fold Chapel</textPath>
            </text>
            </motion.svg>
            <Link href="/contact" className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center">Contact Us</Link>

  
  </div>
</div>
    
</div>




</div>

    </motion.div>


    
    </>
       
   
   
  )
}

export default Homepage




// -translate-y-24 mt-[-16px]