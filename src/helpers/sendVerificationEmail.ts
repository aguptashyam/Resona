import { resend } from "@/src/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerficationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: 'shyam.anubhav10@gmail.com',
            subject: 'Resona | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
            });
        return {success: true, message: 'Verification Email send successfully'}

    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {success: false, message: 'Failed to send verification email'}
    }
}