/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFax } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

import CustomIcon from "@/components/ui/icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-primary grid place-items-center place-content-center text-center gap-3 min-h-[400px]">
        <h1 className="font-black text-5xl md:text-6xl text-yellow-400">
          Contact Us
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-white max-w-xl ">
          We're here to help! Contact us for questions, support, or anything
          else you need. Let's connect!
        </p>
      </div>
      <div className="m-10">
        <h2 className="font-black text-primary text-2xl md:text-4xl text-center my-5">
          Our Contact
        </h2>
        <div className="grid grid-cols-9 gap-5">
          <Card className="col-span-3 rounded-lg shadow-lg">
            <CardHeader className="bg-primary grid rounded-lg place-items-center min-h-[170px]">
              <CustomIcon
                icon={RiCustomerService2Fill}
                size="100px"
                color="text-white"
              />
            </CardHeader>
            <CardContent className="p-5">
              <h3 className="text-2xl text-center font-black text-primary">
                Customer Service
              </h3>
              <p className="text-justify">
                At Jumpstart Retail, we pride ourselves on exceptional customer
                service. Our friendly and knowledgeable team is ready to assist
                you during our operational hours: 9:00 AM - 6:00 PM (GMT)
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3 rounded-lg shadow-lg">
            <CardHeader className="bg-primary rounded-lg grid place-items-center min-h-[170px]">
              <CustomIcon
                icon={AiOutlineMail}
                size="100px"
                color="text-white"
              />
            </CardHeader>
            <CardContent className="p-5">
              <h3 className="text-2xl text-center font-black text-primary">
                Email Support
              </h3>
              <p className="text-justify">
                For any inquiries, support, or feedback, our team is just an
                email away. Reach out to us at support@jumpstartretail.com, and
                we'll respond promptly during our operational hours to assist
                you with anything you need.
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3 rounded-lg shadow-lg">
            <CardHeader className="bg-primary rounded-lg grid place-items-center min-h-[170px]">
              <CustomIcon icon={FaFax} size="100px" color="text-white" />
            </CardHeader>
            <CardContent className="p-5">
              <h3 className="text-2xl text-center font-black text-primary">
                FAX Support
              </h3>
              <p className="text-justify">
                Need to send us a document or have a specific request? You can
                reach us via fax at +1 (123) 456-7890. Whether it's important
                documents or special requests, we're here to assist you through
                this channel during our operational hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
