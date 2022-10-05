import { useState } from "react";
import { VIDEOSTATUS } from "./VIDEOSTATUS";

export default function usePIP() {
    const [PipEnabled, setPipEnabled] = useState<Number>(VIDEOSTATUS.SHOWN)
    return {
        PipEnabled,
        setPipEnabled,
    };
}