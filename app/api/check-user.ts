import getServerSession from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";
import getUserByEmail from "@/lib/adapter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, auth);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const email = session.user.email;
  const user = await getUserByEmail(email);

  if (user) {
    return res.status(200).json({ userExists: true });
  } else {
    return res.status(200).json({ userExists: false });
  }
}
