/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";

import { BiSolidMedal } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { RiCommunityFill } from "react-icons/ri";
import { BsLightbulbFill } from "react-icons/bs";
import CustomIcon from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="w-full h-[400px] relative bg-blue-700 text-center flex flex-col justify-center items-center">
        <h1 className="text-6xl font-black text-yellow-400 mb-4">About Us</h1>
        <p className="text-white text-3xl max-w-2xl font-medium">
          Welcome to <b>Jumpstart Retail</b>
        </p>
        <p className="text-white text-3xl max-w-2xl font-medium">
          The Gate of New Technology
        </p>
      </div>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center"></div>
        <div className="mt-12 space-y-6">
          <section className="grid grid-cols-12 gap-5">
            <div className="col-span-6 relative w-full h-[300px] ">
              <Image
                src={
                  "https://res.cloudinary.com/drqn4yupq/image/upload/v1694019602/jumpstart-product/national-intern-day-blog_bjocta.jpg"
                }
                alt="about us"
                fill
                className="object-cover object-center rounded-lg"
              />
            </div>
            <div className="col-span-6 flex flex-col justify-center">
              <h2 className="text-4xl font-black text-primary">Our Story</h2>
              <p className="text-gray-700 mt-4">
                Our story is one of passion and dedication. Established in 1998,
                we embarked on this adventure with a simple yet profound belief
                - that every home deserves products that inspire and delight.
                Over the years, our team of experts and curators has scoured the
                globe to bring you a collection that's as diverse as it is
                exceptional.
              </p>
            </div>
          </section>
          <section className="grid grid-rows-2 gap-5">
            <div className="row-span-1   grid grid-cols-12 ">
              <div className="col-span-6 bg-primary h-[300px] relative rounded-s-lg">
                <Image
                  src={
                    "https://res.cloudinary.com/drqn4yupq/image/upload/v1694020273/jumpstart-product/Screenshot_2023-09-07_011058_k0uqnh.png"
                  }
                  alt="about us"
                  fill
                  className="object-cover object-center rounded-s-lg"
                />
              </div>
              <div className="col-span-6  bg-blue-700 p-5 rounded-e-lg flex flex-col justify-center">
                <h2 className="text-4xl font-black text-white">
                  Our Commitment
                </h2>
                <p className="text-white mt-4">
                  At Jumpstart Retail, quality isn't just a word; it's a
                  promise. We're committed to sourcing products that meet the
                  highest standards of craftsmanship and durability. Our
                  rigorous quality control ensures that every item that finds
                  its way to your home is a testament to our dedication to
                  excellence.
                </p>
              </div>
            </div>
            <div className="row-span-1 grid grid-cols-12 gap-5">
              <div className="col-span-6 bg-primary h-[300px] rounded-lg flex flex-col justify-center p-5">
                <h2 className="text-4xl font-black text-white">Our Mission</h2>
                <p className="text-white mt-4">
                  At Jumpstart, our mission is to empower individuals and
                  businesses with cutting-edge technology and exceptional
                  service. We're dedicated to providing high-quality electronics
                  that enrich lives and simplify the way we connect, work, and
                  play. Through our commitment to innovation, reliability, and
                  customer satisfaction, we aim to be the foremost destination
                  for electronic shopping, continually exceeding expectations
                  and setting new standards in the industry.
                </p>
              </div>
              <div className="col-span-6 bg-yellow-500 h-[300px] rounded-lg flex flex-col justify-center p-5">
                <h2 className="text-4xl font-black text-white">Our Vision</h2>
                <p className="text-white mt-4">
                  Our vision at Jumpstart is to be at the forefront of the
                  electronic retail industry, recognized globally for our
                  unwavering dedication to quality, innovation, and
                  customer-centricity. We aspire to create a future where
                  everyone can access and enjoy the latest technology
                  seamlessly, while fostering a sustainable and inclusive
                  digital ecosystem. we aim to shape a world where electronic
                  enriches lives and drives progress.
                </p>
              </div>
            </div>
          </section>
          <section className="w-full text-white bg-primary grid grid-cols-12 rounded-lg">
            <div className="col-span-6 rounded-s-lg p-5 flex flex-col justify-center">
              <h2 className="text-4xl font-black">The Jumpstart Experience</h2>
              <p className="text-white mt-4">
                Shopping at Jumpstart Retail is more than just a transaction;
                it's an experience. Our stores are designed to ignite your
                creativity, whether you're seeking to revamp your living space,
                find the perfect gift, or simply indulge in something unique.
                Our friendly and knowledgeable staff are here to assist you
                every step of the way.
              </p>
            </div>
            <div className="col-span-6 h-[300px] relative">
              <Image
                src={
                  "https://res.cloudinary.com/drqn4yupq/image/upload/v1694061585/jumpstart-product/egor-litvinov-ncKxCn5SI3A-unsplash_naixs0.jpg"
                }
                alt="about us"
                fill
                className="object-cover object-center rounded-e-lg"
              />
            </div>
          </section>
          <section className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-primary text-center">
              Our Values
            </h2>
            <Separator className="my-3 " />
            <div className="grid grid-rows-2 gap-5">
              <div className="grid grid-cols-2 row-span-1 gap-5">
                <div className="col-span-1 rounded-lg h-[200px] bg-primary grid grid-cols-2">
                  <div className="col-span-1 grid place-items-center">
                    <CustomIcon
                      icon={BiSolidMedal}
                      size="8rem"
                      color="text-white"
                    />
                  </div>
                  <div className="col-span-1 text-white flex flex-col justify-center p-3">
                    <h3 className="font-bold text-2xl">Quality</h3>
                    <p className="text-base">
                      We believe in products that stand the test of time.
                    </p>
                  </div>
                </div>
                <div className="col-span-1 rounded-lg h-[200px] bg-yellow-500 grid grid-cols-2">
                  <div className="col-span-1 grid place-items-center">
                    <CustomIcon
                      icon={BsLightbulbFill}
                      size="8rem"
                      color="text-white"
                    />
                  </div>
                  <div className="col-span-1 text-white flex flex-col justify-center   p-3">
                    <h3 className="font-bold text-2xl">Creativity</h3>
                    <p className="text-base">
                      We believe in products that stand the test of time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 row-span-1 gap-5">
                <div className="col-span-1 rounded-lg h-[200px] bg-yellow-500 grid grid-cols-2">
                  <div className="col-span-1 grid place-items-center">
                    <CustomIcon
                      icon={HiUserGroup}
                      size="8rem"
                      color="text-white"
                    />
                  </div>
                  <div className="col-span-1 text-white flex flex-col justify-center p-3">
                    <h3 className="font-bold text-2xl">Customer Centric</h3>
                    <p className="text-base">
                      Your satisfaction is at the heart of everything we do.
                    </p>
                  </div>
                </div>
                <div className="col-span-1 rounded-lg h-[200px] bg-primary grid grid-cols-2">
                  <div className="col-span-1 grid place-items-center">
                    <CustomIcon
                      icon={RiCommunityFill}
                      size="8rem"
                      color="text-white"
                    />
                  </div>
                  <div className="col-span-1 text-white flex flex-col justify-center p-3">
                    <h3 className="font-bold text-2xl">Community</h3>
                    <p className="text-base">
                      We're proud to be part of the communities we serve.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section className="w-full flex flex-col justify-center items-center bg-primary mt-10 p-5">
        <h2 className="text-4xl font-black text-yellow-400">
          Join the Jumpstart Journey
        </h2>
        <p className="text-white mt-4  text-lg text-justify max-w-2xl">
          We invite you to explore our stores, discover unique products, and
          become a part of the Jumpstart Retail family. Thank you for choosing
          us as your partner in creating beautiful, inspiring spaces.
        </p>
        <p className="text-white mt-4 text-lg text-justify max-w-2xl">
          At Jumpstart Retail, we don't just sell products, we craft experiences
          that enrich lives. Welcome to a world where quality meets creativity.
          Welcome to Jumpstart Retail.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
