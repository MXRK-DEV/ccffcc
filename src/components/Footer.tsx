import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-gray-800 p-1 shadow ">
    <div  className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span  className="text-sm text-white sm:text-center">Get connected with us on social networks:
    </span>
    <ul  className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0 gap-2">
        <li>
        <Link href=""> 
                <FontAwesomeIcon icon={faXTwitter} className="fa-xl fa-5x" width={24} height={24} />
                </Link>
        </li>
        <li>
        <Link href="">
                <FontAwesomeIcon icon={faEnvelope} className="fa-xl fa-5x" width={24} height={24} />
                </Link>
        </li>
        <li>
        <Link href="">
                <FontAwesomeIcon icon={faFacebook} className="fa-xl fa-5x"  width={24} height={24} />
                </Link>
        </li>
       
    </ul>
    </div>
</footer>
  )
}

export default Footer