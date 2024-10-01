import React from "react";
import {
  getMemberById,
  getUserDetails,
  fetchMemberSpecificBookRequestsWithStatus,
} from "@/lib/actions";
import MemberEditForm from "@/components/ui/member-management/member-edit-form";
import UserSpecificRequests from "@/components/ui/transaction-management/filter-user-requests";
import Image from "next/image";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const EditProfile = async () => {
  const user = await getUserDetails();
  const member = await getMemberById(Number(user?.id));
  const session = await auth();
  let profilePictureURL = session?.user.image;

  const userTransactions = await fetchMemberSpecificBookRequestsWithStatus(
    user?.id!
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Your Profile
          </h1>
          <p className="mt-2 text-xl text-gray-300">
            Manage your account details, view your transactions, and manage your
            wallet
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-3xl shadow-2xl border border-teal-400/20 p-8">
          <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-1/3 flex flex-col items-center space-y-4">
              {profilePictureURL ? (
                <Image
                  src={profilePictureURL}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-teal-400/50"
                  height={160}
                  width={160}
                />
              ) : (
                <div className="w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full flex items-center justify-center text-gray-900 text-5xl font-bold">
                  {member?.name[0]}
                </div>
              )}
              <h2 className="text-2xl font-semibold text-white">
                {member?.name}
              </h2>
              <p className="text-gray-400">{member?.email}</p>

              <Card className="w-full bg-gray-700 border-teal-400/20">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-teal-400">
                    Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">
                    ₹{member?.wallet.toFixed(2)}
                  </p>
                  <Link href={`/user/pay/${member?.id}`} passHref>
                    <Button className="mt-4 w-full bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 hover:from-teal-500 hover:to-cyan-400">
                      Add Money to Wallet
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            <div className="w-full lg:w-2/3 space-y-8">
              {member ? (
                <MemberEditForm member={member} />
              ) : (
                <p className="text-center text-red-400">No such user found</p>
              )}
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Your Transactions
                </h3>
                {userTransactions?.length ? (
                  <UserSpecificRequests books={userTransactions} />
                ) : (
                  <p className="text-gray-400">
                    No transactions present as of now
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
