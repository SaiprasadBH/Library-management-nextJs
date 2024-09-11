import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import React from "react";
import { getMemberById, getUserDetails } from "@/lib/actions";
import { IBook } from "@/lib/definitions";
import BookEditForm from "@/components/ui/book-mangement/book-edit-form";
import MemberEditForm from "@/components/ui/member-management/member-edit-form";

const EditProfile = async () => {
  const user = await getUserDetails();
  const member = await getMemberById(Number(user?.id));

  return (
    <>
      <Card className="w-5/6 max-w-4xl mx-auto border-none shadow-none">
        <CardContent>
          {member ? (
            <MemberEditForm member={member}></MemberEditForm>
          ) : (
            <p>No such user found</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EditProfile;
