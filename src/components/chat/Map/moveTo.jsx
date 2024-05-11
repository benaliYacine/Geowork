import React, { useState, useCallback, useEffect } from "react"; // Ensure useState is imported like this

import { easeInOutSine, easeInCubic, easeOutCubic } from "./easingFunctions";

export default function moveTo(
  initialZoom,
  targetZoom,
  setZoom,
  initialCenter,
  targetCenter,
  setCenter
) {

  const latDistance = Math.abs(targetCenter.lat - initialCenter.lat);
  const lngDistance = Math.abs(targetCenter.lng - initialCenter.lng);
  const maxDistance = Math.max(latDistance, lngDistance);
  let delay = 0;
  // Map maxDistance to control parameters
  let intermediaryZoom = mapRange(maxDistance, 0, 5, 12, 6); // Assuming 1 is the max possible distance change for simplicity
  // const intermediaryZoom = 8; // Assuming 1 is the max possible distance change for simplicity

  if (initialZoom < intermediaryZoom) {
    intermediaryZoom = targetZoom; // Directly set to targetZoom if initial is less than intermediary
  }
  if (12 - intermediaryZoom < 1) {
    intermediaryZoom = targetZoom; // Directly set to targetZoom if initial is less than intermediary
  }

  const durationGoing =
    Math.abs(intermediaryZoom - initialZoom) * 500 > 500 ||
    Math.abs(intermediaryZoom - initialZoom) * 500 == 0
      ? Math.abs(intermediaryZoom - initialZoom) * 500
      : 500;

  const durationBack =
    Math.abs(targetZoom - intermediaryZoom) * 500 > 500 ||
    Math.abs(targetZoom - intermediaryZoom) * 500 == 0
      ? Math.abs(targetZoom - intermediaryZoom) * 500
      : 500;

  // const duration = 2000;

  const totalDuration = durationGoing + delay + durationBack;
  // const delay = 0;

  function mapRange(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1) < high2
      ? high2
      : low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  const startTime = Date.now();

  const animate = () => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / totalDuration, 1);
    const easedProgress = easeInOutSine(progress);

    // Center Animation - continuous over total duration
    const newLat =
      initialCenter.lat +
      (targetCenter.lat - initialCenter.lat) * easedProgress;
    const newLng =
      initialCenter.lng +
      (targetCenter.lng - initialCenter.lng) * easedProgress;
    setCenter({ lat: newLat, lng: newLng });

    if (elapsedTime < durationGoing) {
      // First phase of zoom animation
      const zoomProgress = elapsedTime / durationGoing;
      const zoomEased = easeOutCubic(zoomProgress);
      const zoom = initialZoom + (intermediaryZoom - initialZoom) * zoomEased;
      setZoom(zoom);
    } else if (elapsedTime < durationGoing + delay) {
      // Delay period, maintain intermediary zoom
      // setZoom(intermediaryZoom);
    } else if (elapsedTime < totalDuration) {
      // Second phase of zoom animation
      const phaseProgress =
        (elapsedTime - durationGoing - delay) / durationBack;
      const zoomEased = easeInCubic(phaseProgress);
      const zoom =
        intermediaryZoom + (targetZoom - intermediaryZoom) * zoomEased;
      setZoom(zoom);
    }
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}
