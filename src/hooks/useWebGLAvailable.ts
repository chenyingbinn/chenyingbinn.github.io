import { useEffect, useState } from "react";

function canCreateWebGLContext() {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function useWebGLAvailable() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable(canCreateWebGLContext());
  }, []);

  return isAvailable;
}
