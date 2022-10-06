import { useState } from "react";

export default function planHook() {
    const [Plans, setPlans] = useState<
        {
            title: string,
            url: string
        }[] | null>(null)

    const loadPlanData = () => {
        setPlans(
            [
                {
                    title: "Plan 1",
                    url: "https://www.youtube.com/watch?v=B2ixLPY2TR0"
                },
                {
                    title: "Plan 2",
                    url: "https://www.youtube.com/watch?v=B2ixLPY2TR0"
                },
                {
                    title: "Plan 3",
                    url: "https://www.youtube.com/watch?v=B2ixLPY2TR0"
                },
                {
                    title: "Plan 4",
                    url: "https://www.youtube.com/watch?v=B2ixLPY2TR0"
                },
                {
                    title: "Plan 5",
                    url: "https://www.youtube.com/watch?v=B2ixLPY2TR0"
                },
            ]
        )
    }
    return {
        Plans,
        loadPlanData
    }
}