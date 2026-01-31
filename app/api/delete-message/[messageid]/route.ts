import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User";
import { User } from "next-auth";

export async function DELETE(request: Request, {params}: {params: Promise<{messageid: string}>}){
    const resolvedParams = await params;
    const messageId = resolvedParams.messageid;
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User //error

    if(!session || !user){
        return Response.json({
            success: false,
            message: "User not authenticated"
        }, {status: 401})
    }

    try {
        const updatedResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull : {messages: {_id: messageId}}}
        )

        if(updatedResult.modifiedCount === 0){
            return Response.json({
                success: false,
                message: "Message not found or has been already deleted"
            }, {status: 404})
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully"
        }, {status: 200})
    } catch (error) {
        console.log("Error in deleting message: ", error);
        return Response.json({
            success: false,
            message: "Error deleting message"
        }, {status: 500})
    }
}