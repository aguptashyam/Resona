'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from '@/src/data/messages.json'
import { Mail } from "lucide-react";

const Home = () => {
  return (
    <>
      <main className="grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-sans">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg font-mono">
            Resona - Where your identity remains a secret.
          </p>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-sans">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="shrink-0" />
                    <div>
                      <p className="font-sans mb-2">{message.content}</p>
                      <p className="text-xs text-muted-foreground font-sans">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      <footer className="text-center font-sans text-sm p-4 md:p-6 bg-gray-900 text-white">
        © 2026 Resona. All rights reserved.
      </footer>
    </>
  );
}

export default Home