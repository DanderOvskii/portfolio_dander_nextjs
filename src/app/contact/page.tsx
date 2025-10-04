"use client";
export default function ContactPage() {
  return (
    <>
   

      <div className="right-0 w-2/5 pt-8 pl-8 h-screen text-just-white flex">
        <div className="flex flex-col justify-center ">
          <p className="mr-1/10 text-title text-header-color font-jose">Contact Me</p>
          <p className="font-play text-text">Email, call, or reach out using the details below.</p>
          <div className="w-3/4 h-2 bg-header-color mt-2 mb-2 rounded-[20px]"></div>

          <div className="flex flex-col gap-2 font-play text-text">
            <div>
              <span className="text-just-white/80">Email:</span>
              <div className="break-all">dander@roelsieg.nl</div>
            </div>
            <div>
              <span className="text-just-white/80">Phone:</span>
              <div>+31 6 489 603 53</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


