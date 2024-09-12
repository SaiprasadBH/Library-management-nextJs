import { Card, CardContent } from "@/components/ui/card";

import React from "react";
import { getMemberById, getUserDetails } from "@/lib/actions";
import MemberEditForm from "@/components/ui/member-management/member-edit-form";
import Image from "next/image";
import { auth } from "@/auth";

const EditProfile = async () => {
  const user = await getUserDetails();
  const member = await getMemberById(Number(user?.id));
  const session = await auth();
  let profilePictureURL = session?.user.image;

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto border-none shadow-none">
        <CardContent className="flex flex-col items-center space-y-6">
          {/* Profile picture section */}
          <div className="flex flex-col items-center space-y-3">
            {profilePictureURL ? (
              <Image
                src={profilePictureURL}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                height={128}
                width={128}
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-3xl sm:text-4xl">
                  {member?.name[0]}
                </span>
              </div>
            )}
            <p className="text-center text-xl font-medium">{user?.name}</p>
          </div>

          {/* Member edit form */}
          <div className="w-full">
            {member ? (
              <MemberEditForm member={member}></MemberEditForm>
            ) : (
              <p>No such user found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EditProfile;
