/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaLocationDot, FaBoxesStacked } from "react-icons/fa6";
import { BsFillSuitHeartFill } from "react-icons/bs";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CustomIcon from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { PenSquareIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { UpdateProfileModal } from "@/components/modal/update-profile-modal";
import { getProfile, getShippingAddress } from "@/lib/server-utils";
import { Address, Profile } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { AddressModal } from "@/components/modal/add-address-modal";
import Link from "next/link";
import { AddImageModal } from "@/components/modal/add-image-modal";
import { DeleteAddressModal } from "@/components/modal/delete-address-modal";

const page = async () => {
  const session = await getServerSession();
  const email = session?.user.email;
  if (!session) {
    redirect("/sign-in");
  }
  const res = await getProfile(email!);
  const shippingAddress: Address[] = await getShippingAddress(res?.id!);
  const profile: Profile = {
    avatar: res?.avatarUrl!,
    birthDay: res?.birthday!,
    firstName: res?.firstName!,
    gender: res?.gender!,
    lastName: res?.lastName!,
    uid: res?.id!,
  };

  return (
    <div className="container mx-auto my-20 ">
      <div className="grid grid-cols-12 gap-10">
        <div className="hidden md:flex flex-col col-span-3 ">
          <Card className="flex flex-col p-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={"/default-avatar.jpg"} about="avatar" />
              </Avatar>
              <p className="text-lg font-semibold">Kingz</p>
            </div>
            <Separator className="my-3" />
            <div>
              <h3 className="font-semibold">Activity</h3>
              <ul className="p-3 space-y-3">
                <Link href={"/user/wishlist"}>
                  <li className="flex gap-3">
                    <CustomIcon
                      icon={BsFillSuitHeartFill}
                      color="text-red-500"
                    />
                    My Wishlist
                  </li>
                </Link>
                <Link href={"/user/orders-history"}>
                  <li className="flex gap-3">
                    <CustomIcon icon={FaBoxesStacked} color="text-primary" />
                    My Order
                  </li>
                </Link>
              </ul>
            </div>
          </Card>
        </div>
        <Card className="col-span-12 md:col-span-9 grid grid-cols-12 p-3 gap-3">
          <div className="col-span-12 md:col-span-4 flex flex-col justify-start items-center gap-3 p-3">
            <div className="relative w-[300px] h-[300px] bg-gray-400 ">
              <AddImageModal uid={profile.uid || ""} />
              <Image
                src={profile.avatar || "/default-avatar.jpg"}
                fill
                className="object-cover object-center "
                alt="avatar"
              />
            </div>
            <UpdateProfileModal
              birthDay={profile.birthDay}
              firstName={profile.firstName}
              gender={profile.gender}
              lastName={profile.lastName}
              uid={profile.uid}
            />
            <AddressModal
              buttonText="Save Address"
              buttonTextLoading="Saving address..."
              modalTitle="Add Address"
              modalButton={
                <Button className="w-full flex gap-3">
                  <Plus />
                  Add New Address
                </Button>
              }
              uid={profile.uid}
              className="w-full"
            />
          </div>
          <div className="col-span-12 md:col-span-8 space-y-5">
            <div>
              <h1 className="text-2xl font-black text-primary">
                Personal Information
              </h1>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Full Name</TableCell>
                    <TableCell>
                      {profile.firstName + " " + profile.lastName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Email</TableCell>
                    <TableCell>{session.user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Date of Birth</TableCell>
                    <TableCell>
                      {profile.birthDay
                        ? format(profile.birthDay, "MMMM do, yyyy")
                        : "No data available"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gender</TableCell>
                    <TableCell>
                      {profile.gender || "No data available"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-black text-primary">
                Shipping Address
              </h1>
              {shippingAddress.length > 0 ? (
                shippingAddress.map((address, index) => (
                  <Card className="max-w-lg p-3 shadow-md" key={index}>
                    <CardContent className="grid grid-cols-12 place-content-center p-0">
                      <div className="col-span-2 flex items-center justify-center">
                        <CustomIcon
                          icon={FaLocationDot}
                          color="text-primary"
                          size="50px"
                        />
                      </div>
                      <div className="col-span-8 font-medium">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state}, {address.country}
                        </p>
                        <p>{address.postalCode}</p>
                      </div>
                      <div className="col-span-2  flex place-content-center gap-1 p-0">
                        <div className="">
                          <AddressModal
                            buttonText="Save changes"
                            buttonTextLoading="Saving changes..."
                            modalTitle="Edit Address"
                            address={address}
                            className="text-primary"
                            uid={address.id}
                            modalButton={<PenSquareIcon />}
                          />
                        </div>
                        <DeleteAddressModal addressId={address.id!} />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-2xl font-bold">No Shipping Addresses</h2>
                  <p className="text-gray-500 text-base max-w-sm">
                    You don't have any shipping addresses yet. Add an address by
                    clicking the button below.
                  </p>
                  <AddressModal
                    buttonText="Save Address"
                    buttonTextLoading="Saving address..."
                    modalTitle="Add Address"
                    modalButton={
                      <Button className="flex gap-3">
                        <Plus />
                        Add New Address
                      </Button>
                    }
                    uid={profile.uid}
                    className="w-full mt-3 flex justify-center"
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
