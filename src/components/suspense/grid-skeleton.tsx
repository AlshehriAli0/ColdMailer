import React from "react";

const Skeleton = () => {
  const generateRowClass = (index: number) => `skeleton-row-${index}`;

  return (
    <section
      className="grid md:w-[95%] grid-cols-5 gap-4 border-b border-white/10 px-4 md:px-12 py-3"
      style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 0.1fr" }}
    >
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={`h-6 ${
            index % 2 === 0 ? "md:w-[70%]" : "md:w-[60%]" 
          } animate-pulse rounded bg-gray-300/10 ${
            generateRowClass(index)
          }`}
          style={{
            animationDuration: `${(index * 0.2 + 0.5).toFixed(1)}s`, 
            animationDelay: `${(index * 0.1).toFixed(1)}s`,
          }}
        ></div>
      ))}
    </section>
  );
};

export default Skeleton;
