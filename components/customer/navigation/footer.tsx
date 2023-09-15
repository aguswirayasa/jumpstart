import CustomIcon from "@/components/ui/icons";
import Image from "next/image";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <Image src={"/logo.png"} width={200} height={75} alt="Jumstart" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Company
              </h2>
              <ul className="text-gray-500 font-medium">
                <Link href={"/company/about-us"}>
                  <li className="mb-4">
                    <p className="hover:text-primary">About us</p>
                  </li>
                </Link>
                <li>
                  <a className="hover:text-primary">Contact us</a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/company/privacy-policy">
                    <p className="hover:text-primary">Privacy Policy</p>
                  </Link>
                </li>
                <li>
                  <Link href="/company/terms-and-conditions">
                    <p className="hover:text-primary">Terms &amp; Conditions</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Follow Us
              </h2>
              <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                <CustomIcon
                  icon={AiFillInstagram}
                  size="30px"
                  className="hover:text-primary transition-colors duration-200"
                />
                <CustomIcon
                  icon={BsTwitter}
                  size="30px"
                  className="hover:text-primary transition-colors duration-200"
                />
                <CustomIcon
                  icon={BsYoutube}
                  size="30px"
                  className="hover:text-primary transition-colors duration-200"
                />
                <CustomIcon
                  icon={FaTiktok}
                  size="30px"
                  className="hover:text-primary transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:text-primary">
              Jumpstart Retail
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
