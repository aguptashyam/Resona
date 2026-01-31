'use client'

import MessageCard from "@/src/components/MessageCard"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { Switch } from "@/src/components/ui/switch"
import { Message } from "@/src/model/User"
import { acceptMessageSchema } from "@/src/schemas/acceptMessageSchema"
import { ApiResponse } from "@/src/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id.toString() !== messageId))
  }

  const {data: session} = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const {register, watch, setValue} = form

  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error("Error", {description: axiosError.response?.data.message || "Failed to fetch message settings"})
    } finally {
      setIsSwitchLoading(false)
    }

  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)

    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages(response.data.messages || []);
      if (refresh) {
        toast.success("Refreshed Messages", {
          description: "Showing latest messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message",
      });
    } finally {
      setIsLoading(false)
      setIsSwitchLoading(false);
    }

  }, [setIsLoading, setMessages])

  useEffect(() => {
    if(!session || !session.user) return
    fetchMessages()
    fetchAcceptMessage()

  }, [session, setValue, fetchAcceptMessage, fetchMessages])

  // handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast.success(response.data.message)

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ||
          "Failed to update message settings",
      });
    }
  }

  if(!session || !session.user){
    return <div></div>
  }

  const {username} = session.user as User
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success("URL Copied", {description: "Profile URL has been copied to clipboard"})
  }
  
  return (
    <>
      <div className="flex min-h-screen bg-gray-800">
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-8 bg-white rounded w-full max-w-6xl">
          <h1 className="text-4xl font-bold font-sans mb-10 text-black">
            User Dashboard
          </h1>

          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-2 text-black font-sans">
              Copy Your Unique Link
            </h2>{" "}
            <div className="flex items-center text-black">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="input input-bordered w-full p-2 mr-2 bg-gray-100 rounded-lg font-mono"
              />
              <Button className="font-sans" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </div>

          <div className="mb-6 text-black font-sans">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className="ml-2">
              Accept Messages: {acceptMessages ? "On" : "Off"}
            </span>
          </div>
          <Separator />

          <Button
            className="mt-6"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-black font-sans">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <MessageCard
                  key={message._id.toString()}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <p>No messages to display.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center font-sans text-sm p-4 md:p-6 bg-gray-900 text-white">
        © 2026 Resona. All rights reserved.
      </footer>
    </>
  );
}

export default page