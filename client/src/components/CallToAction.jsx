import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm-flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="text-gray-500 my-2">Check out these resources with 100 Javascript projects</p>

        <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
          <a href="https://www.100jsprojects.com">100 Javascript Projects</a>
        </Button>
      </div>

      <div className="p-7">
        <img
          src="https://images.fineartamerica.com/images-medium-large-5/enormous-abstract-art-brilliant-colors-original-contemporary-painting-reaching-for-the-moon-madart-megan-duncanson.jpg"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  );
}
