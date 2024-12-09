"use client";

import { useState } from "react";
import Footer from "@/components/ui/footer";
import styles from "./pricing.module.css";

const Pricing: React.FC = () => {
  const checkpoints = [100000, 200000, 300000, 1000000, 5000000]; 
  const [sliderValue, setSliderValue] = useState<number>(0); 
  const costPerLine = 0.01;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseFloat(e.target.value));
  };

  const formatNumber = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  };

  const interpolateValue = (value: number): number => {
    if (value <= 0) return checkpoints[0]; 
    if (value >= checkpoints.length - 1) return checkpoints[checkpoints.length - 1]; 

    const lowerIndex = Math.floor(value);
    const upperIndex = Math.ceil(value);
    const fraction = value - lowerIndex;

    return sendUpdatedCheckpointValue(
      checkpoints[lowerIndex] +
      fraction * (checkpoints[upperIndex] - checkpoints[lowerIndex])
    );
  };

  const sendUpdatedCheckpointValue = (value: number):number => {
    // Send updated value to the server
    var updatedCheckPointValue:number=100000
    if(value >100000 && value <= 200000){
        updatedCheckPointValue = 200000;
    } else if(value >200000 && value <= 300000){
        updatedCheckPointValue = 300000;
    } else if(value >300000 && value <= 1000000){
        updatedCheckPointValue = 1000000;
    } else{
        updatedCheckPointValue = 5000000;
    }
    return updatedCheckPointValue;
  }

  const currentCheckpoint = interpolateValue(sliderValue); // Interpolate value for smooth movement
  const totalPrice = currentCheckpoint * costPerLine;

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Transparent Pricing for Every Team Size</h1>
          <p>
            Easily calculate your costs based on your lines of code and get a tailored plan for
            your needs.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
        <div className={styles.card}>
          <h2 className={styles["card-title"]}>Pricing Calculator</h2>
          <div className="relative w-full">
            <div className="absolute w-full flex justify-between text-xs text-gray-500 -top-6">
              {checkpoints.map((point, index) => (
                <span
                  key={index}
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${(index / (checkpoints.length - 1)) * 100}%`,
                  }}
                >
                  {formatNumber(point)}
                </span>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max={checkpoints.length - 1}
              step="0.01"
              value={sliderValue}
              onChange={handleSliderChange}
              className={styles.slider}
            />
          </div>
          <div className="mt-8 text-center">
            <p className={styles["card-text"]}>
              Total Price (based on{" "}
              <span className="font-bold text-gray-700">{formatNumber(currentCheckpoint)}</span>{" "}
              lines):
            </p>
            <p className="text-2xl font-bold text-orange-500 mt-2">${totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className="text-center">
            <p className={styles["card-text"]}>
              If your lines of code exceed{" "}
              <span className="font-semibold">5 million</span>, we’d love to help with a custom
              pricing plan!
            </p>
            <a href="mailto:hello@keploy.io" className={styles.button}>
              Let’s Talk
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;